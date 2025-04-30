import React from "react";
import Icon from "components/AppIcon";

const ActiveIndicators = ({ activeIndicators, onRemoveIndicator, onEditIndicator }) => {
  if (activeIndicators.length === 0) return null;

  return (
    <div className="absolute top-4 right-4 z-10 bg-surface bg-opacity-90 backdrop-blur-sm border border-border rounded-lg shadow-sm p-2">
      <h3 className="text-xs font-medium text-text-secondary mb-2 px-2">Active Indicators</h3>
      <div className="space-y-1">
        {activeIndicators.map((indicator) => (
          <div 
            key={indicator.id} 
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
          >
            <div className="flex items-center">
              <Icon name={indicator.icon} size={14} className="text-primary mr-2" />
              <span className="text-xs font-medium text-text-primary">{indicator.name}</span>
              {indicator.params && (
                <span className="text-xs text-text-tertiary ml-1">
                  ({indicator.params})
                </span>
              )}
            </div>
            <div className="flex space-x-1">
              <button 
                className="text-text-tertiary hover:text-primary"
                onClick={() => onEditIndicator(indicator)}
              >
                <Icon name="Edit" size={12} />
              </button>
              <button 
                className="text-text-tertiary hover:text-danger"
                onClick={() => onRemoveIndicator(indicator.id)}
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveIndicators;