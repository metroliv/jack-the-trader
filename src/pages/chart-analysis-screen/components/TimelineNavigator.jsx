import React from "react";
import Icon from "components/AppIcon";

const TimelineNavigator = () => {
  return (
    <div className="bg-surface border border-border rounded-lg p-3 mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-text-secondary">Timeline Navigator</h3>
        <div className="flex space-x-2">
          <button className="text-text-tertiary hover:text-text-primary">
            <Icon name="ZoomOut" size={16} />
          </button>
          <button className="text-text-tertiary hover:text-text-primary">
            <Icon name="ZoomIn" size={16} />
          </button>
        </div>
      </div>
      
      <div className="h-16 bg-gray-50 rounded-md relative">
        {/* Mini chart visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-8 px-4">
            <svg width="100%" height="100%" viewBox="0 0 100 30">
              <path 
                d="M0,15 L10,10 L20,18 L30,12 L40,15 L50,8 L60,20 L70,15 L80,5 L90,10 L100,15" fill="none" stroke="#2563EB" strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
        
        {/* Selection handles */}
        <div className="absolute inset-y-0 left-1/4 w-1/2 border-2 border-primary bg-primary bg-opacity-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 left-1/4 w-1 bg-primary cursor-ew-resize"></div>
        <div className="absolute inset-y-0 right-1/4 w-1 bg-primary cursor-ew-resize"></div>
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-text-tertiary">
        <span>Jan 2023</span>
        <span>Apr 2023</span>
        <span>Jul 2023</span>
        <span>Oct 2023</span>
        <span>Jan 2024</span>
      </div>
    </div>
  );
};

export default TimelineNavigator;