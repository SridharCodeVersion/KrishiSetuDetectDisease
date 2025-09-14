
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  Leaf,
  Cloud,
  Bug,
  Droplets,
  Calendar,
  MapPin,
  Clock
} from "lucide-react";

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

interface NotificationsProps {
  isOpen: boolean;
  onToggle: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
}

const getNotificationIcon = (category: string) => {
  switch (category) {
    case "disease": return <Bug className="h-4 w-4" />;
    case "weather": return <Cloud className="h-4 w-4" />;
    case "irrigation": return <Droplets className="h-4 w-4" />;
    case "pest": return <AlertTriangle className="h-4 w-4" />;
    default: return <Info className="h-4 w-4" />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "warning": return "border-yellow-200 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/50";
    case "success": return "border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/50";
    case "error": return "border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/50";
    default: return "border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/50";
  }
};

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case "high": return <Badge variant="destructive" className="text-xs">High</Badge>;
    case "medium": return <Badge className="bg-yellow-500 text-white text-xs">Medium</Badge>;
    default: return <Badge variant="outline" className="text-xs">Low</Badge>;
  }
};

export default function Notifications({
  isOpen,
  onToggle,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification
}: NotificationsProps) {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-white dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-700/40 rounded-full transition-all duration-300"
          data-testid="button-notifications"
        >
          <Bell className="h-5 w-5" />
        </Button>
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800">
        <CardHeader className="pb-3 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMarkAllAsRead}
                  className="text-xs h-7 dark:text-gray-300 dark:hover:text-white"
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="h-8 w-8 dark:text-gray-300 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-96">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground dark:text-gray-400">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
                <p className="text-sm">You'll see farm alerts and updates here</p>
              </div>
            ) : (
              <div className="divide-y dark:divide-gray-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                      !notification.isRead ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400' :
                        notification.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' :
                        notification.type === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' :
                        'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                      }`}>
                        {getNotificationIcon(notification.category)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className={`font-medium text-sm ${
                            !notification.isRead ? "text-foreground dark:text-white" : "text-muted-foreground dark:text-gray-300"
                          }`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            {getSeverityBadge(notification.severity)}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDeleteNotification(notification.id)}
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-2 dark:text-gray-400">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-gray-500">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {notification.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                            {notification.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {notification.location}
                              </div>
                            )}
                          </div>
                          
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onMarkAsRead(notification.id)}
                              className="h-6 text-xs text-primary hover:text-primary/80 dark:text-blue-400"
                            >
                              Mark read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
