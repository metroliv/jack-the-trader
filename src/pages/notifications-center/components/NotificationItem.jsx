import React from "react";
import Icon from "components/AppIcon";
import { Link } from "react-router-dom";

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case "trade":
        return notification.outcome === "win" ? "TrendingUp" : "TrendingDown";
      case "alert":
        return "Bell";
      case "system":
        return "Info";
      case "account":
        return "User";
      default:
        return "MessageSquare";
    }
  };

  const getIconColor = () => {
    switch (notification.type) {
      case "trade":
        return notification.outcome === "win" ? "text-success" : "text-danger";
      case "alert":
        return "text-warning";
      case "system":
        return "text-info";
      case "account":
        return "text-primary";
      default:
        return "text-text-secondary";
    }
  };

  const getIconBackground = () => {
    switch (notification.type) {
      case "trade":
        return notification.outcome === "win" ? "bg-success-light" : "bg-danger-light";
      case "alert":
        return "bg-warning bg-opacity-10";
      case "system":
        return "bg-info bg-opacity-10";
      case "account":
        return "bg-primary-light";
      default:
        return "bg-gray-100";
    }
  };

  const getActionButtons = () => {
    switch (notification.type) {
      case "trade":
        return (
          <>
            <Link 
              to="/portfolio-history-screen" className="text-xs text-primary font-medium hover:underline"
            >
              View Details
            </Link>
            <Link 
              to="/trading-interface" className="text-xs text-primary font-medium hover:underline ml-4"
            >
              Trade Again
            </Link>
          </>
        );
      case "alert":
        return (
          <Link 
            to="/chart-analysis-screen" className="text-xs text-primary font-medium hover:underline"
          >
            View Chart
          </Link>
        );
      case "system":
        return notification.actionLink ? (
          <Link 
            to={notification.actionLink} 
            className="text-xs text-primary font-medium hover:underline"
          >
            {notification.actionText || "Learn More"}
          </Link>
        ) : null;
      case "account":
        return (
          <Link 
            to="/account-settings-screen" className="text-xs text-primary font-medium hover:underline"
          >
            Account Settings
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 border-b border-border ${notification.isUnread ? 'bg-primary-light bg-opacity-20' : ''}`}>
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-full ${getIconBackground()} flex items-center justify-center mr-3`}>
          <Icon name={getNotificationIcon()} size={18} className={getIconColor()} />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`text-sm font-medium ${notification.isUnread ? 'text-text-primary' : 'text-text-secondary'}`}>
              {notification.title}
            </h3>
            <span className="text-xs text-text-tertiary">{notification.time}</span>
          </div>
          
          <p className="text-sm text-text-secondary mt-1 mb-2">
            {notification.message}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex">
              {getActionButtons()}
            </div>
            
            <div className="flex space-x-2">
              {notification.isUnread && (
                <button 
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs text-text-tertiary hover:text-primary flex items-center"
                >
                  <Icon name="CheckCircle" size={14} className="mr-1" />
                  <span>Mark as read</span>
                </button>
              )}
              <button 
                onClick={() => onDelete(notification.id)}
                className="text-xs text-text-tertiary hover:text-danger flex items-center"
              >
                <Icon name="Trash2" size={14} className="mr-1" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;