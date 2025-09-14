import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Camera, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Sparkles,
  Shield,
  Zap,
  Globe,
  Star,
  Award,
  Target,
  Brain
} from "lucide-react";
import heroImage from "@assets/generated_images/Agricultural_dashboard_background_de8a8708.png";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({ farmers: 0, diseases: 0, accuracy: 0 });

  useEffect(() => {
    // Animate stats
    const targetStats = { farmers: 50000, diseases: 200, accuracy: 97 };
    let currentStats = { farmers: 0, diseases: 0, accuracy: 0 };
    
    const increment = {
      farmers: targetStats.farmers / 100,
      diseases: targetStats.diseases / 100,
      accuracy: targetStats.accuracy / 100
    };

    const timer = setInterval(() => {
      currentStats.farmers += increment.farmers;
      currentStats.diseases += increment.diseases;
      currentStats.accuracy += increment.accuracy;

      if (currentStats.farmers >= targetStats.farmers) {
        currentStats = targetStats;
        clearInterval(timer);
      }

      setStats({
        farmers: Math.round(currentStats.farmers),
        diseases: Math.round(currentStats.diseases),
        accuracy: Math.round(currentStats.accuracy)
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Disease Detection",
      description: "Advanced neural networks identify crop diseases instantly with 97% accuracy",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: MessageCircle,
      title: "Multilingual AI Assistant", 
      description: "Voice-enabled chatbot supports 10+ Indian languages for every farmer",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Real-time crop health monitoring with predictive insights and alerts",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Globe,
      title: "Global Expert Network",
      description: "Connect with 1000+ agricultural experts and successful farmers worldwide",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const achievements = [
    { icon: Award, label: "Most Innovative AgriTech", year: "2024" },
    { icon: Star, label: "5-Star Farmer Rating", score: "4.9/5" },
    { icon: Target, label: "Disease Detection Leader", metric: "97%" },
    { icon: Shield, label: "Trusted by Experts", count: "1000+" }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-20000"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          animation: 'float 20s ease-in-out infinite'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <Sparkles className="h-2 w-2 text-gold/30" />
          </div>
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 py-32 flex items-center min-h-screen">
        <div className="w-full">
          {/* Hero Content */}
          <div className="text-center mb-16">
            {/* Badge */}
            <Badge className="mb-6 bg-gradient-to-r from-gold/20 to-primary/20 text-white border-gold/30 px-6 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Revolutionizing Indian Agriculture with AI
            </Badge>

            {/* Main Heading with Gradient Text */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gold to-primary bg-clip-text text-transparent">
                KRISHI
              </span>
              <span className="text-gold">-</span>
              <span className="bg-gradient-to-r from-primary via-green-400 to-emerald-500 bg-clip-text text-transparent">
                SETU
              </span>
            </h1>

            <div className="space-y-4 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-white/90">
                AI-Powered Smart Farming Revolution
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Transform your farming with advanced AI disease detection, multilingual support, 
                real-time analytics, and expert guidance. Join <span className="text-gold font-bold">{stats.farmers.toLocaleString()}+</span> farmers 
                already growing smarter crops.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white text-lg px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={onGetStarted}
                data-testid="button-get-started"
              >
                <span className="relative z-10 flex items-center">
                  Start Free Journey
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group text-lg px-12 py-6 rounded-full border-2 border-white/30 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                data-testid="button-watch-demo"
              >
                <Zap className="mr-3 h-5 w-5 group-hover:text-gold transition-colors duration-300" />
                Watch Live Demo
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                  {stats.farmers.toLocaleString()}+
                </div>
                <div className="text-white/70 text-sm font-medium">Happy Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
                  {stats.diseases}+
                </div>
                <div className="text-white/70 text-sm font-medium">Diseases Detected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {stats.accuracy}%
                </div>
                <div className="text-white/70 text-sm font-medium">AI Accuracy</div>
              </div>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`group relative overflow-hidden p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-gold/50 shadow-2xl scale-105' : ''
                }`}
                onClick={() => setActiveFeature(index)}
                data-testid={`feature-${index}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-gold transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} transform ${
                  activeFeature === index ? 'scale-x-100' : 'scale-x-0'
                } transition-transform duration-500 origin-left`} />
              </Card>
            ))}
          </div>

          {/* Awards & Recognition */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300 group"
              >
                <achievement.icon className="w-8 h-8 text-gold mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-white font-semibold text-sm mb-1">{achievement.label}</h4>
                <p className="text-white/60 text-xs">
                  {achievement.year || achievement.score || achievement.metric || achievement.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: scale(1.1) translateY(0px); }
          50% { transform: scale(1.15) translateY(-20px); }
        }
      `}</style>
    </section>
  );
}