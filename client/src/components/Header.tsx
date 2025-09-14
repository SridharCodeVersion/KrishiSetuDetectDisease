import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Menu, Sun, Moon, Bell, Search, Leaf, Trophy, Star, Zap, ArrowLeft, Brain, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import logoImage from "@assets/generated_images/KRISHI-SETU_agricultural_technology_logo_c2352383.png";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
];

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  onNotificationsToggle?: () => void;
  unreadNotificationsCount?: number;
  onProfileClick?: () => void;
  profileName?: string;
  profileImage?: string;
}

export default function Header({ 
  isDarkMode, 
  toggleDarkMode, 
  isSidebarOpen, 
  toggleSidebar, 
  onBack, 
  showBackButton = false,
  onNotificationsToggle,
  unreadNotificationsCount = 0,
  onProfileClick,
  profileName = "Farmer Raj",
  profileImage = ""
}: HeaderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [farmerLevel, setFarmerLevel] = useState(7);
  const [farmerXP, setFarmerXP] = useState(2450);
  const [healthScore, setHealthScore] = useState(85);

  // Animate health score on mount
  useEffect(() => {
    let currentScore = 0;
    const targetScore = healthScore;
    const increment = targetScore / 50;
    
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        currentScore = targetScore;
        clearInterval(timer);
      }
      setHealthScore(Math.round(currentScore));
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    console.log("Search triggered:", searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-800 dark:via-gray-900 dark:to-slate-900 backdrop-blur-xl border-b border-blue-200/20 dark:border-gray-700/30 shadow-2xl">
      {/* Top Achievement Bar */}
      <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 dark:from-gray-700/30 dark:to-slate-700/30 px-4 py-1 text-center">
        <div className="flex items-center justify-center gap-6 text-xs text-white/90 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <Trophy className="h-3 w-3 text-yellow-400 dark:text-yellow-300" />
            <span>Level {farmerLevel} Farmer</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 dark:text-yellow-300" />
            <span>{farmerXP.toLocaleString()} XP</span>
          </div>
          <div className="flex items-center gap-1">
            <Leaf className="h-3 w-3 text-green-400 dark:text-green-300" />
            <span>Crop Health: {healthScore}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-blue-400 dark:text-blue-300" />
            <span>AI Assistant: Active</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              data-testid="button-back"
              className="text-white hover:bg-white/10 rounded-full transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            data-testid="button-sidebar-toggle"
            className="md:hidden text-white hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={logoImage} 
                alt="KRISHI-SETU" 
                className="h-12 w-12 rounded-full shadow-lg ring-2 ring-white/30 dark:ring-gray-300/30" 
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div className="text-center">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="h-8 w-8 text-blue-400 dark:text-blue-300 animate-pulse" />
                <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-blue-200 to-indigo-200 dark:from-gray-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent tracking-tight">
                  AI Disease Detection
                </h1>
                <Sparkles className="h-8 w-8 text-purple-400 dark:text-purple-300 animate-pulse" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 dark:from-blue-200 dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
                & Treatment Recommender
              </h2>
              <p className="text-sm text-blue-200/80 dark:text-gray-400 font-medium mt-1">
                Powered by Advanced AI Technology
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 dark:from-gray-700/20 dark:to-gray-800/20 rounded-full blur-sm group-hover:blur-none transition-all duration-300" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-white/60 dark:text-gray-400" />
              <Input
                placeholder="Search diseases, crops, treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 bg-white/10 dark:bg-gray-800/30 border-white/20 dark:border-gray-600/30 text-white dark:text-gray-200 placeholder-white/50 dark:placeholder-gray-400 rounded-full focus:bg-white/20 dark:focus:bg-gray-700/40 focus:border-white/40 dark:focus:border-gray-500/50 transition-all duration-300"
                data-testid="input-search"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-24 bg-white/10 dark:bg-gray-800/30 border-white/20 dark:border-gray-600/30 text-white dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-700/40 transition-all duration-300" data-testid="select-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-card-border">
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            data-testid="button-theme-toggle"
            className="text-white dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-700/40 rounded-full transition-all duration-300"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 rotate-0 scale-100 transition-all text-blue-300" />
            )}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onNotificationsToggle && onNotificationsToggle()}
              data-testid="button-notifications"
              className="text-white dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-700/40 rounded-full transition-all duration-300"
            >
              <Bell className="h-5 w-5" />
            </Button>
            {unreadNotificationsCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
              </Badge>
            )}
          </div>

          {/* Profile */}
          <div 
            className="flex items-center gap-3 bg-white/10 dark:bg-gray-700/30 rounded-full pl-3 pr-1 py-1 hover:bg-white/20 dark:hover:bg-gray-600/40 transition-all duration-300 cursor-pointer"
            onClick={() => onProfileClick && onProfileClick()}
          >
            <div className="text-right">
              <p className="text-xs text-white dark:text-gray-200 font-medium">{profileName}</p>
              <p className="text-xs text-white/60 dark:text-gray-400">Level {farmerLevel}</p>
            </div>
            <Avatar className="h-9 w-9 border-2 border-white/20 dark:border-gray-500/30">
              <AvatarImage src={profileImage} alt="Farmer" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-600 dark:to-gray-700 text-white font-bold">
                {profileName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pb-3 max-w-7xl mx-auto">
        <div className="flex items-center justify-between text-xs text-white/70 dark:text-gray-400 mb-1">
          <span>Progress to Level {farmerLevel + 1}</span>
          <span>{farmerXP % 500}/500 XP</span>
        </div>
        <div className="w-full bg-white/10 dark:bg-gray-700/30 rounded-full h-1.5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300 dark:from-yellow-500 dark:via-yellow-400 dark:to-yellow-300 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(farmerXP % 500) / 5}%` }}
          />
        </div>
      </div>
    </header>
  );
}