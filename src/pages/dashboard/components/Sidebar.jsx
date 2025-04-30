import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "components/AppIcon";

const Sidebar = () => {
  const location = useLocation();
  
  const navigationItems = [
    {
      name: "Dashboard",
      icon: "LayoutDashboard",
      path: "/dashboard",
    },
    {
      name: "Trading",
      icon: "LineChart",
      path: "/trading-interface",
    },
    {
      name: "Assets",
      icon: "BarChart2",
      path: "/asset-selection-screen",
    },
    {
      name: "Portfolio",
      icon: "PieChart",
      path: "/portfolio-history-screen",
    },
    {
      name: "Analysis",
      icon: "TrendingUp",
      path: "/chart-analysis-screen",
    },
    {
      name: "Notifications",
      icon: "Bell",
      path: "/notifications-center",
    },
    {
      name: "Settings",
      icon: "Settings",
      path: "/account-settings-screen",
    },
  ];

  return (
    <div className="bg-surface h-screen border-r border-border w-64 fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mr-3">
            <Icon name="TrendingUp" size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-text-primary">Deriv Trader</h1>
        </div>
        
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-white" :"text-text-secondary hover:bg-gray-100"
              }`}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                className={location.pathname === item.path ? "mr-3" : "mr-3 text-text-tertiary"} 
              />
              <span className="font-medium">{item.name}</span>
              {item.name === "Notifications"&& ( <span className="ml-auto bg-danger text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                  3
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="User" className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary">Alex Morgan</h3>
            <p className="text-xs text-text-tertiary">Premium Account</p>
          </div>
          <button className="ml-auto text-text-tertiary hover:text-text-primary">
            <Icon name="LogOut" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;