import React from "react";
import Icon from "components/AppIcon";
import { Link } from "react-router-dom";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "trade",
      asset: "EUR/USD",
      direction: "buy",
      amount: 100,
      outcome: "win",
      profit: 85.20,
      time: "10:45 AM",
    },
    {
      id: 2,
      type: "trade",
      asset: "Gold",
      direction: "sell",
      amount: 75,
      outcome: "loss",
      profit: -75,
      time: "09:30 AM",
    },
    {
      id: 3,
      type: "deposit",
      amount: 500,
      method: "Credit Card",
      time: "Yesterday",
    },
    {
      id: 4,
      type: "trade",
      asset: "NASDAQ",
      direction: "buy",
      amount: 150,
      outcome: "win",
      profit: 127.50,
      time: "Yesterday",
    },
    {
      id: 5,
      type: "withdrawal",
      amount: 200,
      method: "Bank Transfer",
      status: "Pending",
      time: "2 days ago",
    },
  ];

  const getActivityIcon = (activity) => {
    if (activity.type === "trade") {
      if (activity.outcome === "win") {
        return <Icon name="TrendingUp" size={16} className="text-success" />;
      } else {
        return <Icon name="TrendingDown" size={16} className="text-danger" />;
      }
    } else if (activity.type === "deposit") {
      return <Icon name="ArrowDownCircle" size={16} className="text-primary" />;
    } else if (activity.type === "withdrawal") {
      return <Icon name="ArrowUpCircle" size={16} className="text-warning" />;
    }
  };

  const getActivityTitle = (activity) => {
    if (activity.type === "trade") {
      return `${activity.direction === "buy" ? "Buy" : "Sell"} ${activity.asset}`;
    } else if (activity.type === "deposit") {
      return `Deposit via ${activity.method}`;
    } else if (activity.type === "withdrawal") {
      return `Withdrawal to ${activity.method}`;
    }
  };

  const getActivityDescription = (activity) => {
    if (activity.type === "trade") {
      return `${activity.outcome === "win" ? "Won" : "Lost"} $${Math.abs(activity.profit).toFixed(2)}`;
    } else if (activity.type === "deposit" || activity.type === "withdrawal") {
      return `$${activity.amount.toFixed(2)} ${activity.status ? `• ${activity.status}` : ""}`;
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
        <Link 
          to="/portfolio-history-screen" className="text-primary text-sm font-medium flex items-center"
        >
          <span>View All</span>
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-1">
              {getActivityIcon(activity)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-text-primary">{getActivityTitle(activity)}</h3>
                <span className="text-xs text-text-tertiary">{activity.time}</span>
              </div>
              <p className={`text-xs ${
                activity.type === "trade" ? activity.outcome ==="win"? "text-success" : "text-danger" :"text-text-secondary"
              }`}>
                {getActivityDescription(activity)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex justify-between">
          <Link 
            to="/chart-analysis-screen" className="flex items-center text-sm text-primary font-medium"
          >
            <Icon name="LineChart" size={16} className="mr-2" />
            <span>Chart Analysis</span>
          </Link>
          <Link 
            to="/notifications-center" 
            className="flex items-center text-sm text-primary font-medium"
          >
            <Icon name="Bell" size={16} className="mr-2" />
            <span>Notifications</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;