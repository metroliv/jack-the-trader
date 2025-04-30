import React from "react";
import Icon from "components/AppIcon";

const NotificationStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center mr-2">
            <Icon name="Bell" size={16} className="text-primary" />
          </div>
          <span className="text-sm font-medium text-text-secondary">Total</span>
        </div>
        <div className="text-xl font-semibold text-text-primary">{stats.total}</div>
      </div>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-success-light flex items-center justify-center mr-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <span className="text-sm font-medium text-text-secondary">Trades</span>
        </div>
        <div className="text-xl font-semibold text-text-primary">{stats.trades}</div>
      </div>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-warning bg-opacity-10 flex items-center justify-center mr-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
          </div>
          <span className="text-sm font-medium text-text-secondary">Alerts</span>
        </div>
        <div className="text-xl font-semibold text-text-primary">{stats.alerts}</div>
      </div>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-info bg-opacity-10 flex items-center justify-center mr-2">
            <Icon name="Info" size={16} className="text-info" />
          </div>
          <span className="text-sm font-medium text-text-secondary">Unread</span>
        </div>
        <div className="text-xl font-semibold text-text-primary">{stats.unread}</div>
      </div>
    </div>
  );
};

export default NotificationStats;