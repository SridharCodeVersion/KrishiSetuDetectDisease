import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Shield,
  Activity,
  Cloud,
  BookOpen,
  TrendingUp,
  Droplets,
  Sun,
  Wind,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Target,
  Award,
  Zap,
  Leaf,
  Brain,
  Home,
  ArrowLeft,
  Users,
  BarChart3,
  Clock,
  Globe,
  ThermometerSun,
  CloudRain,
  Sprout,
  Bug,
  Microscope,
  Bell,
  Settings,
  Calendar,
  MapPin,
  Smartphone,
  Book,
  Lightbulb
} from "lucide-react";
import dashboardBg from "@assets/generated_images/Agricultural_dashboard_background_de8a8708.png";

interface DashboardProps {
  onFeatureSelect: (feature: string) => void;
}

export default function Dashboard({ onFeatureSelect }: DashboardProps) {
  const [animatedStats, setAnimatedStats] = useState({
    health: 0,
    scanned: 0,
    saved: 0,
    farmers: 0,
    diseases: 0,
    accuracy: 0,
    alerts: 0,
    yield: 0
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: 28,
    humidity: 65,
    rain: 15,
    wind: 12,
    condition: "Partly Cloudy"
  });

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock real-time data updates
  useEffect(() => {
    const dataTimer = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temp: 25 + Math.random() * 8,
        humidity: 60 + Math.random() * 20,
        wind: 8 + Math.random() * 8
      }));
    }, 5000);
    return () => clearInterval(dataTimer);
  }, []);

  // Enhanced mock data with more realistic farming scenarios
  const [recentActivity] = useState([
    {
      id: 1,
      action: "Early Blight detected in Tomato Field A",
      crop: "Tomato",
      time: "12 minutes ago",
      status: "warning",
      location: "Field A-7",
      severity: "Medium"
    },
    {
      id: 2,
      action: "Fungicide treatment completed successfully",
      crop: "Wheat",
      time: "2 hours ago",
      status: "success",
      location: "Field B-3",
      severity: "Resolved"
    },
    {
      id: 3,
      action: "Irrigation system activated - Soil moisture low",
      crop: "Rice",
      time: "4 hours ago",
      status: "info",
      location: "Field C-1",
      severity: "Normal"
    },
    {
      id: 4,
      action: "Pest activity increased - Deploy monitoring",
      crop: "Cotton",
      time: "6 hours ago",
      status: "warning",
      location: "Field D-5",
      severity: "High"
    },
    {
      id: 5,
      action: "Harvest readiness alert - Optimal timing",
      crop: "Corn",
      time: "8 hours ago",
      status: "success",
      location: "Field E-2",
      severity: "Ready"
    }
  ]);

  const [cropHealth] = useState({
    healthy: 78,
    warning: 18,
    critical: 4
  });

  // Animate stats on mount
  useEffect(() => {
    const targets = {
      health: 78,
      scanned: 2847,
      saved: 92,
      farmers: 15847,
      diseases: 247,
      accuracy: 97,
      alerts: 23,
      yield: 15.7
    };
    let current = {
      health: 0,
      scanned: 0,
      saved: 0,
      farmers: 0,
      diseases: 0,
      accuracy: 0,
      alerts: 0,
      yield: 0
    };

    const increment = {
      health: targets.health / 60,
      scanned: targets.scanned / 60,
      saved: targets.saved / 60,
      farmers: targets.farmers / 60,
      diseases: targets.diseases / 60,
      accuracy: targets.accuracy / 60,
      alerts: targets.alerts / 60,
      yield: targets.yield / 60
    };

    const timer = setInterval(() => {
      Object.keys(current).forEach(key => {
        current[key as keyof typeof current] += increment[key as keyof typeof increment];
      });

      if (current.health >= targets.health) {
        current = targets;
        clearInterval(timer);
      }

      setAnimatedStats({
        health: Math.round(current.health),
        scanned: Math.round(current.scanned),
        saved: Math.round(current.saved),
        farmers: Math.round(current.farmers),
        diseases: Math.round(current.diseases),
        accuracy: Math.round(current.accuracy),
        alerts: Math.round(current.alerts),
        yield: Number(current.yield.toFixed(1))
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const dashboardCards = [
    {
      title: "AI Disease Detection",
      icon: Brain,
      description: "Advanced neural networks identify crop diseases with 97% accuracy in real-time",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50",
      action: "Start Scanning",
      feature: "disease-detection",
      stats: `${animatedStats.scanned.toLocaleString()}+ scans today`,
      badge: "AI Powered"
    },
    {
      title: "Weather & Soil Intelligence",
      icon: Cloud,
      description: "Real-time weather forecasts, soil analysis, and precision agriculture insights",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50",
      action: "View Insights",
      feature: "weather",
      stats: "Live updates every 5 min",
      badge: "Real-time"
    },
    {
      title: "Knowledge & Expert Hub",
      icon: BookOpen,
      description: "Access expert articles, tutorials, and connect with agricultural specialists worldwide",
      gradient: "from-emerald-500 via-green-500 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
      action: "Explore Library",
      feature: "knowledge",
      stats: "500+ expert guides",
      badge: "Expert Verified"
    }
  ];

  const quickStats = [
    {
      icon: TrendingUp,
      label: "Overall Farm Health",
      value: `${animatedStats.health}%`,
      change: "+5% from last week",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      trend: "up"
    },
    {
      icon: Microscope,
      label: "Diseases Analyzed",
      value: animatedStats.scanned.toLocaleString(),
      change: "+347 today",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      trend: "up"
    },
    {
      icon: Award,
      label: "Treatment Success",
      value: `${animatedStats.saved}%`,
      change: "Industry leading",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      trend: "stable"
    },
    {
      icon: ThermometerSun,
      label: "Temperature",
      value: `${weather.temp.toFixed(1)}°C`,
      change: weather.condition,
      gradient: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      trend: "stable"
    },
    {
      icon: Users,
      label: "Active Farmers",
      value: animatedStats.farmers.toLocaleString(),
      change: "+1,247 this month",
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
      trend: "up"
    },
    {
      icon: Target,
      label: "AI Accuracy",
      value: `${animatedStats.accuracy}%`,
      change: "Constantly improving",
      gradient: "from-teal-500 to-cyan-500",
      bgColor: "from-teal-50 to-cyan-50",
      trend: "up"
    },
    {
      icon: Bell,
      label: "Active Alerts",
      value: animatedStats.alerts.toString(),
      change: "Needs attention",
      gradient: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      trend: "warning"
    },
    {
      icon: BarChart3,
      label: "Yield Increase",
      value: `+${animatedStats.yield}%`,
      change: "vs last season",
      gradient: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-50 to-green-50",
      trend: "up"
    }
  ];

  const quickActions = [
    { icon: Camera, label: "Quick Scan", action: () => onFeatureSelect("disease-detection"), color: "blue" },
    { icon: CloudRain, label: "Weather", action: () => onFeatureSelect("weather"), color: "cyan" },
    { icon: BookOpen, label: "Knowledge", action: () => onFeatureSelect("knowledge"), color: "green" },
    { icon: Settings, label: "Settings", action: () => console.log("Settings"), color: "gray" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-blue-950 dark:to-emerald-950">
      {/* Animated Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-3 dark:opacity-10"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-primary/10 rounded-full" />
          </div>
        ))}
      </div>

      <div className="relative z-10 p-4 lg:p-8 space-y-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-6 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full border-primary/20 hover:bg-primary/10" onClick={() => window.history.back()}>
                <ArrowLeft className="h-6 w-6 text-primary" />
              </Button>
              <div className="flex flex-col">
                <h1 className="text-2xl lg:text-4xl font-black bg-gradient-to-r from-gray-800 via-primary to-emerald-600 bg-clip-text text-transparent dark:from-gray-200 dark:via-primary dark:to-emerald-400">
                  AI Disease Detection and Treatment Recommender
                </h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Your intelligent farming companion</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-primary dark:text-cyan-400">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  Maharashtra, India
                </div>
              </div>
              <div className="text-sm text-muted-foreground dark:text-gray-400">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
              <Button size="icon" variant="outline" className="rounded-full border-primary/20 hover:bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              className={`group relative overflow-hidden bg-white dark:bg-gray-800 hover:bg-${action.color}-50 dark:hover:bg-${action.color}-700 border-2 border-${action.color}-200 dark:border-${action.color}-700 hover:border-${action.color}-300 dark:hover:border-${action.color}-600 text-${action.color}-700 dark:text-${action.color}-300 hover:text-${action.color}-800 dark:hover:text-${action.color}-200 transition-all duration-300`}
              variant="outline"
              size="lg"
            >
              <action.icon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 lg:gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-60 dark:opacity-40`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

              <CardContent className="relative z-10 p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 lg:p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                  </div>
                  {stat.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {stat.trend === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                  {stat.trend === "stable" && <Activity className="h-4 w-4 text-blue-500" />}
                </div>

                <div>
                  <p className="text-xs lg:text-sm font-medium text-muted-foreground mb-1 dark:text-gray-400">{stat.label}</p>
                  <p className="text-lg lg:text-2xl font-black text-foreground mb-1 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {dashboardCards.map((card, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 transform dark:bg-gray-800 dark:border-gray-700"
              onClick={() => onFeatureSelect(card.feature)}
              data-testid={`card-${card.feature}`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 ${card.bgColor} dark:opacity-50`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

              {/* Animated Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                   style={{
                     background: `linear-gradient(45deg, transparent, var(--primary), transparent)`,
                     backgroundSize: '200% 200%',
                     animation: 'shimmer 3s ease-in-out infinite'
                   }} />

              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="h-8 w-8 text-white" />
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary-foreground">
                    {card.badge}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-bold group-hover:text-primary dark:group-hover:text-primary-foreground transition-colors duration-300">
                  {card.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed dark:text-gray-300">{card.description}</p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-white/60 backdrop-blur-sm dark:bg-gray-700/50 dark:text-gray-300">
                      {card.stats}
                    </Badge>
                    <Zap className="h-4 w-4 text-gold group-hover:animate-pulse" />
                  </div>

                  <Button
                    className={`w-full bg-gradient-to-r ${card.gradient} hover:shadow-lg transform group-hover:scale-105 transition-all duration-300 text-white border-0`}
                    data-testid={`button-${card.feature}`}
                  >
                    {card.action}
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Activity & Health Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Activity */}
          <Card className="xl:col-span-2 border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                Real-time Farm Activity
                <Badge className="ml-auto bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="group flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-white to-gray-50 hover:from-primary/5 hover:to-emerald-500/5 transition-all duration-300 border border-transparent hover:border-primary/20 dark:from-gray-800 dark:to-gray-700">
                    <div className={`p-2 rounded-xl flex-shrink-0 ${
                      activity.status === 'warning' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                      activity.status === 'success' ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                      'bg-gradient-to-br from-blue-400 to-cyan-500'
                    }`}>
                      {activity.status === 'warning' && <AlertTriangle className="h-4 w-4 text-white" />}
                      {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-white" />}
                      {activity.status === 'info' && <Cloud className="h-4 w-4 text-white" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-300 dark:text-white">
                            {activity.action}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                            <span>{activity.crop}</span>
                            <span>•</span>
                            <span>{activity.location}</span>
                            <span>•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              activity.severity === 'High' ? 'border-red-200 text-red-700 bg-red-50 dark:border-red-700 dark:bg-red-900/50 dark:text-red-300' :
                              activity.severity === 'Medium' ? 'border-yellow-200 text-yellow-700 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
                              'border-green-200 text-green-700 bg-green-50 dark:border-green-700 dark:bg-green-900/50 dark:text-green-300'
                            }`}
                          >
                            {activity.severity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Crop Health Overview */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                Crop Health Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
                  {cropHealth.healthy}%
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Overall Farm Health Score</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Healthy Crops
                    </span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">{cropHealth.healthy}%</span>
                  </div>
                  <Progress value={cropHealth.healthy} className="h-3 bg-green-100 dark:bg-green-800/50" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      Need Attention
                    </span>
                    <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{cropHealth.warning}%</span>
                  </div>
                  <Progress value={cropHealth.warning} className="h-3 bg-yellow-100 dark:bg-yellow-800/50" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Critical
                    </span>
                    <span className="text-lg font-bold text-red-600 dark:text-red-400">{cropHealth.critical}%</span>
                  </div>
                  <Progress value={cropHealth.critical} className="h-3 bg-red-100 dark:bg-red-800/50" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Badge className="justify-center py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 dark:from-green-600 dark:to-emerald-600">
                  <Sprout className="w-4 h-4 mr-2" />
                  {cropHealth.healthy}% Thriving
                </Badge>
                <Badge className="justify-center py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 dark:from-yellow-600 dark:to-orange-600">
                  <Bug className="w-4 h-4 mr-2" />
                  {cropHealth.warning}% Monitoring
                </Badge>
                <Badge className="justify-center py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 dark:from-red-600 dark:to-pink-600">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {cropHealth.critical}% Urgent
                </Badge>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white dark:from-emerald-600 dark:to-green-600"
                onClick={() => onFeatureSelect("disease-detection")}
              >
                <Microscope className="mr-2 h-4 w-4" />
                Detailed Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}