
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import DiseaseDetectionNew from "@/components/DiseaseDetectionNew";
import WeatherInsights from "@/components/WeatherInsights";
import KnowledgeHub from "@/components/KnowledgeHub";
import Profile from "@/components/Profile";
import AIChatbot from "@/components/AIChatbot";
import Notifications from "@/components/Notifications";
import { useTheme } from "@/components/ThemeProvider";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "warning" | "success" | "info" | "error";
  category: "disease" | "weather" | "irrigation" | "pest" | "general";
  timestamp: Date;
  location?: string;
  isRead: boolean;
  severity: "low" | "medium" | "high";
}

export default function HomePage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string>("dashboard");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isChatbotMinimized, setIsChatbotMinimized] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Farmer Raj",
    image: ""
  });

  // Load profile data
  useEffect(() => {
    const savedProfile = localStorage.getItem('farmerProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfileData({
        name: parsedProfile.name || "Farmer Raj",
        image: parsedProfile.profileImage || ""
      });
    }
  }, []);

  // Mock notifications data - in a real app, this would come from an API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Late Blight Detected",
      message: "High risk of late blight detected in tomato plants in Field A-7. Immediate fungicide treatment recommended.",
      type: "warning",
      category: "disease",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      location: "Field A-7",
      isRead: false,
      severity: "high"
    },
    {
      id: "2",
      title: "Weather Alert",
      message: "Heavy rainfall predicted in the next 48 hours. Consider harvesting mature crops and protecting seedlings.",
      type: "info",
      category: "weather",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      location: "Farm Area",
      isRead: false,
      severity: "medium"
    },
    {
      id: "3",
      title: "Irrigation System Update",
      message: "Automated irrigation cycle completed successfully for Zone B. Soil moisture levels optimal.",
      type: "success",
      category: "irrigation",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      location: "Zone B",
      isRead: true,
      severity: "low"
    },
    {
      id: "4",
      title: "Pest Activity Alert",
      message: "Increased aphid activity detected in wheat field. Deploy beneficial insects or apply organic pesticides.",
      type: "warning",
      category: "pest",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      location: "Wheat Field C-2",
      isRead: false,
      severity: "medium"
    },
    {
      id: "5",
      title: "AI Analysis Complete",
      message: "Disease analysis completed for 15 uploaded images. 3 potential issues identified requiring attention.",
      type: "info",
      category: "general",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      isRead: true,
      severity: "low"
    }
  ]);

  const handleBackToDashboard = () => {
    setActiveFeature("dashboard");
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleProfileClick = () => {
    setActiveFeature("profile");
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderFeature = () => {
    switch (activeFeature) {
      case "disease-detection":
        return <DiseaseDetectionNew onBack={handleBackToDashboard} />;
      case "weather":
        return <WeatherInsights onBack={handleBackToDashboard} />;
      case "knowledge":
        return <KnowledgeHub onBack={handleBackToDashboard} />;
      case "profile":
        return <Profile onBack={handleBackToDashboard} />;
      default:
        return <Dashboard onFeatureSelect={setActiveFeature} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onBack={handleBackToDashboard}
        showBackButton={activeFeature !== "dashboard"}
        onNotificationsToggle={handleNotificationsToggle}
        unreadNotificationsCount={unreadCount}
        onProfileClick={handleProfileClick}
        profileName={profileData.name}
        profileImage={profileData.image}
      />
      
      <main className="pt-40">
        {renderFeature()}
      </main>
      
      <Notifications
        isOpen={isNotificationsOpen}
        onToggle={handleNotificationsToggle}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDeleteNotification={handleDeleteNotification}
      />
      
      <AIChatbot 
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        isMinimized={isChatbotMinimized}
        onMinimizeToggle={() => setIsChatbotMinimized(!isChatbotMinimized)}
      />
    </div>
  );
}
