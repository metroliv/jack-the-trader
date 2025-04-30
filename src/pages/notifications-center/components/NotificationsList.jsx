import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";
import NotificationItem from "./NotificationItem";

const NotificationsList = ({ notifications, activeFilter, onMarkAsRead, onDelete, onLoadMore }) => {
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(notifications.filter(notification => notification.type === activeFilter));
    }
  }, [notifications, activeFilter]);

  if (filteredNotifications.length === 0) {
    return (
      <div className="bg-surface rounded-lg shadow-sm border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Icon name="Bell" size={24} className="text-text-tertiary" />
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">No notifications</h3>
        <p className="text-sm text-text-secondary">
          {activeFilter === "all" ?"You don't have any notifications yet." 
            : `You don't have any ${activeFilter} notifications.`}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-text-primary">
            {activeFilter === "all" ? "All Notifications" : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Notifications`}
          </h2>
          <div className="flex items-center text-sm text-text-secondary">
            <span>Showing {filteredNotifications.length} notifications</span>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-border">
        {filteredNotifications.map((notification) => (
          <NotificationItem 
            key={notification.id} 
            notification={notification} 
            onMarkAsRead={onMarkAsRead}
            onDelete={onDelete}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-border bg-gray-50">
        <button 
          onClick={onLoadMore}
          className="w-full py-2 text-sm text-primary font-medium hover:bg-primary-light rounded-lg transition-colors flex items-center justify-center"
        >
          <Icon name="RefreshCw" size={16} className="mr-2" />
          <span>Load More</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationsList;