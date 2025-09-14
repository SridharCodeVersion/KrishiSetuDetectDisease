import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer,
  Eye,
  ArrowUp,
  ArrowDown,
  Activity,
  TrendingUp,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Zap,
  Leaf,
  ArrowLeft
} from "lucide-react";

interface WeatherInsightsProps {
  onBack?: () => void;
}

export default function WeatherInsights({ onBack }: WeatherInsightsProps) {
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 28.5,
    humidity: 67,
    windSpeed: 12.3,
    rainfall: 0,
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    condition: "Partly Cloudy"
  });

  const [forecast] = useState([
    { day: "Today", high: 32, low: 24, condition: "Partly Cloudy", icon: Sun, precipitation: 10 },
    { day: "Tomorrow", high: 29, low: 22, condition: "Rainy", icon: CloudRain, precipitation: 85 },
    { day: "Wednesday", high: 27, low: 20, condition: "Cloudy", icon: Cloud, precipitation: 60 },
    { day: "Thursday", high: 31, low: 23, condition: "Sunny", icon: Sun, precipitation: 5 },
    { day: "Friday", high: 33, low: 25, condition: "Hot", icon: Sun, precipitation: 0 },
  ]);

  const [soilData] = useState({
    moisture: 65,
    ph: 6.8,
    nitrogen: 78,
    phosphorus: 82,
    potassium: 74,
    organicMatter: 3.2
  });

  const [alerts] = useState([
    {
      type: "warning",
      title: "Heavy Rain Expected",
      message: "85% chance of rain tomorrow. Consider delaying fertilizer application.",
      time: "2 hours ago"
    },
    {
      type: "info",
      title: "Optimal Irrigation Time",
      message: "Soil moisture at 65%. Perfect conditions for evening irrigation.",
      time: "4 hours ago"
    },
    {
      type: "success",
      title: "Weather Conditions Ideal",
      message: "Perfect conditions for crop spraying today between 6-8 AM.",
      time: "6 hours ago"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background p-6">
      {/* Header */}
      <div className="mb-8 py-4 px-6 rounded-lg shadow-lg border-t-4 border-gradient-to-r from-blue-500 to-purple-600 bg-gradient-to-br from-card to-background">
        {onBack && (
          <Button 
            variant="outline" 
            onClick={onBack}
            className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-primary/5"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}

        <div className="text-center py-4">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-gradient-pulse">
            AI Disease Detection and Treatment recommender
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leveraging AI for accurate disease diagnosis and personalized treatment plans.
          </p>
        </div>
      </div>

      {/* Current Weather Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2 border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <Thermometer className="h-5 w-5 text-white" />
              </div>
              Current Conditions
              <Badge className="ml-auto bg-green-500 text-white">Live</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{currentWeather.temperature}°C</div>
                <div className="text-sm text-muted-foreground">Temperature</div>
              </div>
              <div className="text-center">
                <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{currentWeather.humidity}%</div>
                <div className="text-sm text-muted-foreground">Humidity</div>
              </div>
              <div className="text-center">
                <Wind className="h-8 w-8 text-cyan-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-600">{currentWeather.windSpeed} km/h</div>
                <div className="text-sm text-muted-foreground">Wind Speed</div>
              </div>
              <div className="text-center">
                <Eye className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{currentWeather.visibility} km</div>
                <div className="text-sm text-muted-foreground">Visibility</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disease Alerts */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              Disease Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 border-l-${alert.type === "warning" ? "yellow" : alert.type === "info" ? "blue" : "green"}-500 bg-${alert.type === "warning" ? "yellow" : alert.type === "info" ? "blue" : "green"}-50`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className={`font-semibold text-sm text-${alert.type === "warning" ? "yellow" : alert.type === "info" ? "blue" : "green"}-800`}>{alert.title}</h4>
                    <p className={`text-sm text-${alert.type === "warning" ? "yellow" : alert.type === "info" ? "blue" : "green"}-600 mt-1`}>{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                  </div>
                  {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                  {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {alert.type === "info" && <Activity className="h-4 w-4 text-blue-500" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Treatment Recommendations */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-sky-50 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500">
              <Zap className="h-5 w-5 text-white" />
            </div>
            Treatment Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 transition-all duration-300">
                <div className="font-semibold text-sky-800 mb-2">{day.day}</div>
                <day.icon className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                <div className="text-sm text-sky-700 mb-2">{day.condition}</div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-sky-800">{day.high}°</span>
                  <span className="text-sky-600">{day.low}°</span>
                </div>
                <div className="text-xs text-sky-600 mt-1">{day.precipitation}% chance of recommendation change</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Soil Health Analysis */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            Soil Health Analysis
            <Badge className="ml-auto bg-green-500 text-white">Real-time</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-green-800">Soil Moisture</span>
                  <span className="text-lg font-bold text-green-600">{soilData.moisture}%</span>
                </div>
                <Progress value={soilData.moisture} className="h-3 bg-green-100" />
                <div className="text-sm text-green-600 mt-1">Optimal for irrigation</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-blue-800">pH Level</span>
                  <span className="text-lg font-bold text-blue-600">{soilData.ph}</span>
                </div>
                <Progress value={(soilData.ph / 14) * 100} className="h-3 bg-blue-100" />
                <div className="text-sm text-blue-600 mt-1">Slightly acidic - Good</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-purple-800">Nitrogen (N)</span>
                  <span className="text-lg font-bold text-purple-600">{soilData.nitrogen}%</span>
                </div>
                <Progress value={soilData.nitrogen} className="h-3 bg-purple-100" />
                <div className="text-sm text-purple-600 mt-1">Good levels</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-orange-800">Phosphorus (P)</span>
                  <span className="text-lg font-bold text-orange-600">{soilData.phosphorus}%</span>
                </div>
                <Progress value={soilData.phosphorus} className="h-3 bg-orange-100" />
                <div className="text-sm text-orange-600 mt-1">Excellent levels</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-cyan-800">Potassium (K)</span>
                  <span className="text-lg font-bold text-cyan-600">{soilData.potassium}%</span>
                </div>
                <Progress value={soilData.potassium} className="h-3 bg-cyan-100" />
                <div className="text-sm text-cyan-600 mt-1">Good levels</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-emerald-800">Organic Matter</span>
                  <span className="text-lg font-bold text-emerald-600">{soilData.organicMatter}%</span>
                </div>
                <Progress value={(soilData.organicMatter / 5) * 100} className="h-3 bg-emerald-100" />
                <div className="text-sm text-emerald-600 mt-1">Healthy levels</div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <Droplets className="mr-2 h-4 w-4" />
              Schedule Irrigation
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <Leaf className="mr-2 h-4 w-4" />
              Fertilizer Recommendation
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <TrendingUp className="mr-2 h-4 w-4" />
              Detailed Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}