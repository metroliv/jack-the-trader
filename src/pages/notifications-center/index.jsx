import React, { useState, useEffect } from "react";


// Import components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NotificationFilters from "./components/NotificationFilters";
import NotificationsList from "./components/NotificationsList";
import NotificationStats from "./components/NotificationStats";

const NotificationsCenter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    trades: 0,
    alerts: 0,
    unread: 0
  });

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: "trade",
        title: "Trade Executed: EUR/USD",
        message: "Your buy position for EUR/USD has been executed successfully at 1.0892.",
        time: "5 min ago",
        isUnread: true,
        outcome: "win",
      },
      {
        id: 2,
        type: "alert",
        title: "Price Alert: Gold",
        message: "Gold has reached your target price of $2,032.45. Consider reviewing your position.",
        time: "15 min ago",
        isUnread: true,
      },
      {
        id: 3,
        type: "system",
        title: "System Maintenance",
        message: "Scheduled maintenance will occur on June 15, 2023 from 2:00 AM to 4:00 AM UTC. Trading may be temporarily unavailable.",
        time: "1 hour ago",
        isUnread: true,
        actionLink: "/account-settings-screen",
        actionText: "View Schedule",
      },
      {
        id: 4,
        type: "trade",
        title: "Trade Closed: BTC/USD",
        message: "Your BTC/USD position has been closed with a profit of $127.50.",
        time: "2 hours ago",
        isUnread: false,
        outcome: "win",
      },
      {
        id: 5,
        type: "account",
        title: "Verification Successful",
        message: "Your account verification has been completed successfully. You now have access to all trading features.",
        time: "3 hours ago",
        isUnread: false,
      },
      {
        id: 6,
        type: "alert",
        title: "Volatility Alert: NASDAQ",
        message: "NASDAQ is experiencing high volatility. Consider adjusting your risk management strategy.",
        time: "5 hours ago",
        isUnread: false,
      },
      {
        id: 7,
        type: "trade",
        title: "Trade Closed: GBP/JPY",
        message: "Your GBP/JPY position has been closed with a loss of $45.20.",
        time: "Yesterday",
        isUnread: false,
        outcome: "loss",
      },
      {
        id: 8,
        type: "system",
        title: "New Feature Available",
        message: "We\'ve added advanced charting tools to help you analyze market trends more effectively.",
        time: "Yesterday",
        isUnread: false,
        actionLink: "/chart-analysis-screen",
        actionText: "Try Now",
      },
      {
        id: 9,
        type: "account",
        title: "Deposit Successful",
        message: "Your deposit of $500.00 has been successfully processed and added to your account.",
        time: "2 days ago",
        isUnread: false,
      },
      {
        id: 10,
        type: "alert",
        title: "Market Opening Soon",
        message: "The forex market will open in 30 minutes. Prepare your trading strategy.",
        time: "2 days ago",
        isUnread: false,
      },
    ];

    // Simulate loading
    setTimeout(() => {
      setNotifications(mockNotifications);
      
      // Calculate stats
      setStats({
        total: mockNotifications.length,
        trades: mockNotifications.filter(n => n.type === "trade").length,
        alerts: mockNotifications.filter(n => n.type === "alert").length,
        unread: mockNotifications.filter(n => n.isUnread).length
      });
      
      setIsLoading(false);
    }, 1500);
  }, []);

  // Handle mark as read
  const handleMarkAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, isUnread: false } : notification
      )
    );
    
    // Update unread count
    setStats(prevStats => ({
      ...prevStats,
      unread: prevStats.unread - 1
    }));
  };

  // Handle delete notification
  const handleDelete = (id) => {
    const notificationToDelete = notifications.find(n => n.id === id);
    const isUnread = notificationToDelete?.isUnread || false;
    
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    
    // Update stats
    setStats(prevStats => {
      const updatedStats = {
        total: prevStats.total - 1,
        unread: isUnread ? prevStats.unread - 1 : prevStats.unread
      };
      
      if (notificationToDelete?.type === "trade") {
        updatedStats.trades = prevStats.trades - 1;
      } else if (notificationToDelete?.type === "alert") {
        updatedStats.alerts = prevStats.alerts - 1;
      }
      
      return { ...prevStats, ...updatedStats };
    });
  };

  // Handle clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
    setStats({
      total: 0,
      trades: 0,
      alerts: 0,
      unread: 0
    });
  };

  // Handle load more notifications
  const handleLoadMore = () => {
    // In a real app, this would fetch more notifications from an API
    // For this mock, we'll just show a loading state briefly
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically append new notifications to the existing list
    }, 1000);
  };

  // Skeleton loading component
  const SkeletonLoader = () => (
    <div className="bg-surface rounded-lg shadow-sm border border-border p-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header />
        
        {/* Notifications Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary mb-1">Notifications</h1>
            <p className="text-text-secondary">Stay updated with your trading activity and system alerts.</p>
          </div>
          
          {/* Notification Stats */}
          {isLoading ? (
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-surface rounded-lg shadow-sm border border-border p-4 animate-pulse">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <NotificationStats stats={stats} />
          )}
          
          {/* Notification Filters */}
          {isLoading ? (
            <div className="bg-surface rounded-lg shadow-sm border border-border p-4 mb-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="h-10 bg-gray-200 rounded w-24"></div>
                ))}
              </div>
            </div>
          ) : (
            <NotificationFilters 
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter} 
              onClearAll={handleClearAll} 
            />
          )}
          
          {/* Notifications List */}
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <NotificationsList 
              notifications={notifications} 
              activeFilter={activeFilter}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
              onLoadMore={handleLoadMore}
            />
          )}
        </main>
        
        {/* Footer */}
        <footer className="p-6 border-t border-border mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-text-tertiary">
                &copy; {new Date().getFullYear()} Deriv Trader. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-text-secondary hover:text-primary">Terms of Service</a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary">Contact Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NotificationsCenter;