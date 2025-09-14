import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Info,
  Eye,
  Download
} from "lucide-react";
import diseaseImage from "@assets/generated_images/Crop_disease_detection_interface_eaf541e0.png";

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  description: string;
  treatment: string[];
  prevention: string[];
}

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock detection results - todo: remove mock functionality
  const mockResults: DetectionResult[] = [
    {
      disease: "Late Blight",
      confidence: 94,
      severity: "high",
      description: "Late blight is a serious fungal disease that affects tomatoes and potatoes, causing dark spots on leaves and fruit rot.",
      treatment: [
        "Apply copper-based fungicides immediately",
        "Remove affected plant parts and dispose properly", 
        "Improve air circulation around plants",
        "Reduce watering frequency to prevent moisture buildup"
      ],
      prevention: [
        "Plant resistant varieties when available",
        "Ensure proper spacing between plants",
        "Water at soil level, not on leaves",
        "Apply preventive fungicide sprays in humid conditions"
      ]
    },
    {
      disease: "Healthy Plant",
      confidence: 98,
      severity: "low",
      description: "Your plant appears healthy with no signs of disease or pest damage.",
      treatment: ["Continue current care routine", "Monitor regularly for any changes"],
      prevention: [
        "Maintain proper watering schedule",
        "Ensure adequate nutrition",
        "Regular inspection for early detection",
        "Proper sanitation practices"
      ]
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDetectionResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          // Mock result selection - todo: remove mock functionality
          setDetectionResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleCameraCapture = () => {
    // Mock camera functionality - todo: implement real camera capture
    console.log("Camera capture triggered");
    setSelectedImage(diseaseImage);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-50 text-red-700 border-red-200";
      case "medium": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default: return "bg-green-50 text-green-700 border-green-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertCircle className="h-4 w-4" />;
      case "medium": return <Info className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Disease Detection</h1>
        <p className="text-muted-foreground text-lg">Upload or capture crop images for instant AI-powered disease identification</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Image Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Upload Area */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              {selectedImage ? (
                <div className="space-y-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected crop" 
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <div className="flex gap-2 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                      data-testid="button-change-image"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Change Image
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleCameraCapture}
                      data-testid="button-camera-capture"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Camera
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium mb-2">Upload Crop Image</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose a clear image of the affected plant part for best results
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      data-testid="button-upload-image"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleCameraCapture}
                      data-testid="button-use-camera"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Use Camera
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Analysis Button */}
            {selectedImage && (
              <div className="space-y-4">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing}
                  className="w-full"
                  size="lg"
                  data-testid="button-analyze"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Analyze Image
                    </>
                  )}
                </Button>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <Progress value={analysisProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground text-center">
                      AI is analyzing your image... {analysisProgress}%
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Detection Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {detectionResult ? (
              <div className="space-y-6">
                {/* Disease Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{detectionResult.disease}</h3>
                    <Badge 
                      variant="outline" 
                      className={getSeverityColor(detectionResult.severity)}
                    >
                      {getSeverityIcon(detectionResult.severity)}
                      {detectionResult.severity.charAt(0).toUpperCase() + detectionResult.severity.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-primary mb-1">
                      Confidence: {detectionResult.confidence}%
                    </p>
                    <Progress value={detectionResult.confidence} className="h-2" />
                  </div>
                  
                  <p className="text-muted-foreground">{detectionResult.description}</p>
                </div>

                {/* Treatment and Prevention Tabs */}
                <Tabs defaultValue="treatment">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="treatment">Treatment</TabsTrigger>
                    <TabsTrigger value="prevention">Prevention</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="treatment" className="space-y-3">
                    <h4 className="font-medium">Recommended Treatment:</h4>
                    <ul className="space-y-2">
                      {detectionResult.treatment.map((step, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="prevention" className="space-y-3">
                    <h4 className="font-medium">Prevention Measures:</h4>
                    <ul className="space-y-2">
                      {detectionResult.prevention.map((step, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" data-testid="button-download-report">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" size="sm" data-testid="button-consult-expert">
                    Consult Expert
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Eye className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Upload and analyze an image to see results</p>
                <p className="text-sm">Our AI will identify diseases with 95%+ accuracy</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}