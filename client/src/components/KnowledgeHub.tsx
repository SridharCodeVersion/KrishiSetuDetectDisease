import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Users, 
  Play, 
  Clock, 
  Star,
  TrendingUp,
  Award,
  MessageCircle,
  Download,
  Eye,
  Heart,
  Share,
  Filter,
  ArrowLeft,
  Lightbulb,
  Video,
  FileText,
  Headphones
} from "lucide-react";

interface KnowledgeHubProps {
  onBack?: () => void;
}

export default function KnowledgeHub({ onBack }: KnowledgeHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredContent, setFilteredContent] = useState([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeColors = {
    light: {
      background: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
      titleBar: 'bg-gradient-to-right from-green-500 to-emerald-500 text-white',
      primaryText: 'text-green-700',
      secondaryText: 'text-muted-foreground',
      cardBackground: 'bg-white/80 backdrop-blur-sm',
      borderColor: 'border-green-200',
      hoverBg: 'hover:bg-green-50',
      badgeBg: 'bg-green-100 text-green-700',
      iconColor: 'text-green-600',
      buttonGradientStart: 'from-green-500',
      buttonGradientEnd: 'to-emerald-500',
      buttonHoverStart: 'hover:from-green-600',
      buttonHoverEnd: 'hover:to-emerald-600',
      expertiseBg: 'from-white to-green-50',
      tipBg: 'bg-yellow-50 border-l-4 border-yellow-400',
      tipTitle: 'text-yellow-800',
      tipText: 'text-yellow-700',
      bestPracticeBg: 'bg-green-50 border-l-4 border-green-400',
      bestPracticeTitle: 'text-green-800',
      bestPracticeText: 'text-green-700',
      weatherAlertBg: 'bg-blue-50 border-l-4 border-blue-400',
      weatherAlertTitle: 'text-blue-800',
      weatherAlertText: 'text-blue-700',
    },
    dark: {
      background: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      titleBar: 'bg-gradient-to-right from-purple-600 to-indigo-600 text-white',
      primaryText: 'text-purple-300',
      secondaryText: 'text-gray-400',
      cardBackground: 'bg-gray-800/80 backdrop-blur-sm border-purple-600/30',
      borderColor: 'border-purple-600/50',
      hoverBg: 'hover:bg-gray-700',
      badgeBg: 'bg-purple-900 text-purple-300',
      iconColor: 'text-purple-400',
      buttonGradientStart: 'from-purple-500',
      buttonGradientEnd: 'to-indigo-500',
      buttonHoverStart: 'hover:from-purple-600',
      buttonHoverEnd: 'hover:to-indigo-600',
      expertiseBg: 'from-gray-800 to-gray-700',
      tipBg: 'bg-yellow-900 border-l-4 border-yellow-700',
      tipTitle: 'text-yellow-300',
      tipText: 'text-yellow-200',
      bestPracticeBg: 'bg-green-900 border-l-4 border-green-700',
      bestPracticeTitle: 'text-green-300',
      bestPracticeText: 'text-green-200',
      weatherAlertBg: 'bg-blue-900 border-l-4 border-blue-700',
      weatherAlertTitle: 'text-blue-300',
      weatherAlertText: 'text-blue-200',
    }
  };

  const currentTheme = themeColors[theme];

  const categories = [
    { id: "all", name: "All Topics", count: 247 },
    { id: "disease", name: "Disease Management", count: 89 },
    { id: "soil", name: "Soil Health", count: 56 },
    { id: "irrigation", name: "Irrigation", count: 43 },
    { id: "pest", name: "Pest Control", count: 37 },
    { id: "harvest", name: "Harvesting", count: 22 }
  ];

  const expertContent = [
    {
      id: 1,
      title: "Advanced Tomato Disease Detection Techniques",
      author: "Dr. Priya Sharma",
      type: "article",
      duration: "8 min read",
      rating: 4.8,
      views: 12500,
      category: "disease",
      tags: ["Tomato", "Disease", "Prevention"],
      description: "Comprehensive guide to identifying and treating common tomato diseases using modern techniques.",
      thumbnail: "🍅",
      featured: true
    },
    {
      id: 2,
      title: "Soil pH Management for Optimal Crop Growth",
      author: "Prof. Rajesh Kumar",
      type: "video",
      duration: "15 min watch",
      rating: 4.9,
      views: 8900,
      category: "soil",
      tags: ["Soil", "pH", "Nutrients"],
      description: "Learn how to test and adjust soil pH levels for maximum crop productivity.",
      thumbnail: "🌱",
      featured: true
    },
    {
      id: 3,
      title: "Smart Irrigation Scheduling",
      author: "Dr. Anita Verma",
      type: "guide",
      duration: "12 min read",
      rating: 4.7,
      views: 15600,
      category: "irrigation",
      tags: ["Water", "Scheduling", "Efficiency"],
      description: "Master the art of timing your irrigation for water conservation and crop health.",
      thumbnail: "💧",
      featured: false
    },
    {
      id: 4,
      title: "Integrated Pest Management Strategies",
      author: "Dr. Suresh Patel",
      type: "webinar",
      duration: "45 min watch",
      rating: 4.6,
      views: 6700,
      category: "pest",
      tags: ["IPM", "Natural", "Sustainable"],
      description: "Comprehensive approach to managing pests without harmful chemicals.",
      thumbnail: "🐛",
      featured: false
    },
    {
      id: 5,
      title: "Post-Harvest Storage Best Practices",
      author: "Ms. Kavya Singh",
      type: "article",
      duration: "6 min read",
      rating: 4.8,
      views: 9800,
      category: "harvest",
      tags: ["Storage", "Quality", "Loss Prevention"],
      description: "Reduce post-harvest losses with proven storage techniques and technologies.",
      thumbnail: "📦",
      featured: false
    },
    {
      id: 6,
      title: "Organic Fertilizer Production Guide",
      author: "Dr. Meera Joshi",
      type: "tutorial",
      duration: "20 min watch",
      rating: 4.9,
      views: 11200,
      category: "soil",
      tags: ["Organic", "Compost", "Sustainable"],
      description: "Step-by-step guide to creating nutrient-rich organic fertilizers at home.",
      thumbnail: "🌿",
      featured: true
    }
  ];

  const experts = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Plant Pathology",
      experience: "15+ years",
      rating: 4.9,
      articles: 23,
      followers: 15600,
      avatar: "👩‍🔬"
    },
    {
      id: 2,
      name: "Prof. Rajesh Kumar",
      specialty: "Soil Science",
      experience: "20+ years",
      rating: 4.8,
      articles: 31,
      followers: 18900,
      avatar: "👨‍🌾"
    },
    {
      id: 3,
      name: "Dr. Anita Verma",
      specialty: "Water Management",
      experience: "12+ years",
      rating: 4.7,
      articles: 18,
      followers: 12400,
      avatar: "👩‍💼"
    }
  ];

  useEffect(() => {
    let filtered = expertContent;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(content => content.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(content => 
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredContent(filtered as any);
  }, [searchQuery, selectedCategory]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
      case "webinar":
      case "tutorial":
        return <Video className="h-4 w-4" />;
      case "article":
      case "guide":
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
      case "webinar":
      case "tutorial":
        return "bg-red-100 text-red-700";
      case "article":
      case "guide":
        return "bg-blue-100 text-blue-700";
      default:
        return currentTheme.badgeBg;
    }
  };

  return (
    <div className={`min-h-screen p-6 ${currentTheme.background}`}>
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        {onBack && (
          <Button 
            variant="outline" 
            onClick={onBack}
            className={`mb-4 mr-4 ${currentTheme.cardBackground} ${currentTheme.borderColor} hover:${currentTheme.hoverBg}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        )}

        <div className="flex-grow text-center">
          <div className={`inline-flex items-center gap-2 ${currentTheme.titleBar} rounded-full px-6 py-2 mb-4`}>
            <BookOpen className={`h-4 w-4 ${currentTheme.iconColor}`} />
            <span className={`text-sm font-medium ${currentTheme.primaryText}`}>AI Disease Detection & Treatment</span>
          </div>

          <h1 className={`text-4xl md:text-6xl font-black bg-gradient-to-r ${currentTheme.buttonGradientStart} ${currentTheme.buttonGradientEnd} bg-clip-text text-transparent mb-4`}>
            AI Disease Detection and Treatment recommender
          </h1>

          <p className={`text-xl ${currentTheme.secondaryText} max-w-3xl mx-auto`}>
            Access AI-powered insights for disease identification, treatment recommendations, and expert agricultural advice.
            <span className={`${currentTheme.primaryText} font-semibold`}> 500+ verified resources</span> at your fingertips.
          </p>
        </div>
        
        <Button onClick={toggleTheme} className={`ml-4 ${currentTheme.buttonGradientStart} ${currentTheme.buttonGradientEnd}`}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${currentTheme.secondaryText}`} />
            <Input
              placeholder="Search diseases, treatments, experts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${currentTheme.cardBackground} ${currentTheme.borderColor} focus:border-primary`}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id 
                    ? `${currentTheme.buttonGradientStart} ${currentTheme.buttonGradientEnd} text-white` 
                    : `${currentTheme.cardBackground} ${currentTheme.borderColor} ${currentTheme.hoverBg}`
                }`}
              >
                {category.name}
                <Badge variant="secondary" className={`ml-2 text-xs ${currentTheme.badgeBg}`}>
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-8">
          {/* Featured Content */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${currentTheme.primaryText}`}>
              <Award className="h-6 w-6 text-yellow-500" />
              Featured Insights
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {filteredContent.filter((content: any) => content.featured).map((content: any) => (
                <Card key={content.id} className={`group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden ${currentTheme.cardBackground}`}>
                  <div className={`absolute inset-0 ${currentTheme.buttonGradientStart} ${currentTheme.buttonGradientEnd} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-4xl">{content.thumbnail}</div>
                      <Badge className={`${getTypeColor(content.type)} flex items-center gap-1`}>
                        {getTypeIcon(content.type)}
                        {content.type}
                      </Badge>
                    </div>

                    <CardTitle className={`group-hover:text-green-600 transition-colors duration-300 line-clamp-2 ${currentTheme.primaryText}`}>
                      {content.title}
                    </CardTitle>

                    <div className={`flex items-center gap-4 text-sm ${currentTheme.secondaryText}`}>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {content.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {content.duration}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <p className={`mb-4 ${currentTheme.secondaryText} line-clamp-3`}>{content.description}</p>

                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-4 text-sm ${currentTheme.secondaryText}`}>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {content.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {content.views.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex gap-1">
                        {content.tags.slice(0, 2).map((tag: string) => (
                          <Badge key={tag} variant="outline" className={`text-xs ${currentTheme.borderColor}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className={`w-full mt-4 ${currentTheme.buttonGradientStart} ${currentTheme.buttonGradientEnd} ${currentTheme.buttonHoverStart} ${currentTheme.buttonHoverEnd}`}>
                      <Play className="mr-2 h-4 w-4" />
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Content */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${currentTheme.primaryText}`}>
              <BookOpen className={`h-6 w-6 ${currentTheme.iconColor}`} />
              All Resources ({filteredContent.length})
            </h2>

            <div className="space-y-4">
              {filteredContent.filter((content: any) => !content.featured).map((content: any) => (
                <Card key={content.id} className={`group border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${currentTheme.cardBackground}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl flex-shrink-0">{content.thumbnail}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-bold text-lg ${currentTheme.primaryText} group-hover:text-green-600 transition-colors duration-300 line-clamp-2`}>
                            {content.title}
                          </h3>
                          <Badge className={`${getTypeColor(content.type)} flex items-center gap-1 ml-4`}>
                            {getTypeIcon(content.type)}
                            {content.type}
                          </Badge>
                        </div>

                        <p className={`mb-3 ${currentTheme.secondaryText} line-clamp-2`}>{content.description}</p>

                        <div className="flex items-center justify-between">
                          <div className={`flex items-center gap-4 text-sm ${currentTheme.secondaryText}`}>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {content.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {content.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              {content.rating}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className={`${currentTheme.cardBackground} ${currentTheme.borderColor} ${currentTheme.hoverBg}`}>
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className={`${currentTheme.cardBackground} ${currentTheme.borderColor} ${currentTheme.hoverBg}`}>
                              <Share className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className={`${currentTheme.buttonGradientStart} ${currentTheme.buttonGradientEnd}`}>
                              Read More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Experts */}
          <Card className={`border-0 shadow-xl ${currentTheme.expertiseBg}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${currentTheme.buttonGradientStart} ${currentTheme.buttonGradientEnd}`}>
                  <Award className="h-5 w-5 text-white" />
                </div>
                Top Experts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {experts.map((expert) => (
                <div key={expert.id} className={`flex items-center gap-3 p-3 rounded-lg ${currentTheme.hoverBg} transition-colors duration-300 cursor-pointer`}>
                  <div className="text-2xl">{expert.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{expert.name}</h4>
                    <p className={`text-xs ${currentTheme.secondaryText}`}>{expert.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs">{expert.rating}</span>
                      <span className={`text-xs ${currentTheme.secondaryText}`}>• {expert.articles} articles</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className={`text-xs ${currentTheme.cardBackground} ${currentTheme.borderColor}`}>
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className={`border-0 shadow-xl ${currentTheme.expertiseBg}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${currentTheme.buttonGradientStart} ${currentTheme.buttonGradientEnd}`}>
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className={`${currentTheme.tipBg}`}>
                <h4 className={`font-semibold text-sm ${currentTheme.tipTitle} mb-1`}>Daily Tip</h4>
                <p className={`text-xs ${currentTheme.tipText}`}>Check soil moisture before 8 AM for accurate readings.</p>
              </div>
              <div className={`${currentTheme.bestPracticeBg}`}>
                <h4 className={`font-semibold text-sm ${currentTheme.bestPracticeTitle} mb-1`}>Best Practice</h4>
                <p className={`text-xs ${currentTheme.bestPracticeText}`}>Rotate crops every season to maintain soil health.</p>
              </div>
              <div className={`${currentTheme.weatherAlertBg}`}>
                <h4 className={`font-semibold text-sm ${currentTheme.weatherAlertTitle} mb-1`}>Weather Alert</h4>
                <p className={`text-xs ${currentTheme.weatherAlertText}`}>Strong winds expected. Secure young plants.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}