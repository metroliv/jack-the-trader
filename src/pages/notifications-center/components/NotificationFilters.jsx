import React from "react";
import Icon from "components/AppIcon";

const NotificationFilters = ({ activeFilter, setActiveFilter, onClearAll }) => {
  const filters = [
    { id: "all", label: "All", icon: "Bell" },
    { id: "trade", label: "Trades", icon: "BarChart2" },
    { id: "alert", label: "Alerts", icon: "AlertTriangle" },
    { id: "system", label: "System", icon: "Info" },
    { id: "account", label: "Account", icon: "User" },
  ];

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        <button 
          onClick={onClearAll}
          className="text-sm text-primary font-medium flex items-center"
        >
          <Icon name="Trash2" size={16} className="mr-1" />
          <span>Clear All</span>
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? "bg-primary text-white" :"bg-gray-100 text-text-secondary hover:bg-gray-200"
            }`}
          >
            <Icon 
              name={filter.icon} 
              size={16} 
              className="mr-2" 
            />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationFilters;