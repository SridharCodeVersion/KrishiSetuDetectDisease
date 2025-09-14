import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  // Dev vs Production
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    // Only serve static if build exists
    const publicDir = path.join(__dirname, "public"); // matches Vite outDir
    if (fs.existsSync(publicDir) && fs.existsSync(path.join(publicDir, "index.html"))) {
      serveStatic(app);
      log("✅ Serving static files from " + publicDir);
    } else {
      log("⚠️  Build directory not found: " + publicDir);
    }
  }

  // Port handling
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.PORT ? "0.0.0.0" : "localhost"; // 0.0.0.0 for Render

  server.listen(port, host, () => {
    const displayHost = host === "0.0.0.0" ? "localhost" : host;
    log(`🚀 Server running at http://${displayHost}:${port}`);
  });
})();
