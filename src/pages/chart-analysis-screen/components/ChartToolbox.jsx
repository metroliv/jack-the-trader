import React, { useState } from "react";
import Icon from "components/AppIcon";

const ChartToolbox = ({ onAddIndicator, onSelectDrawingTool }) => {
  const [showIndicators, setShowIndicators] = useState(false);
  const [showDrawingTools, setShowDrawingTools] = useState(false);
  
  const indicators = [
    { id: 'ma', name: 'Moving Average', icon: 'LineChart' },
    { id: 'ema', name: 'Exponential MA', icon: 'LineChart' },
    { id: 'rsi', name: 'RSI', icon: 'Activity' },
    { id: 'macd', name: 'MACD', icon: 'BarChart' },
    { id: 'bollinger', name: 'Bollinger Bands', icon: 'Layers' },
    { id: 'stochastic', name: 'Stochastic', icon: 'TrendingUp' },
  ];
  
  const drawingTools = [
    { id: 'line', name: 'Trend Line', icon: 'Minus' },
    { id: 'horizontal', name: 'Horizontal Line', icon: 'Minus' },
    { id: 'vertical', name: 'Vertical Line', icon: 'Minus' },
    { id: 'fibonacci', name: 'Fibonacci', icon: 'GitBranch' },
    { id: 'rectangle', name: 'Rectangle', icon: 'Square' },
    { id: 'ellipse', name: 'Ellipse', icon: 'Circle' },
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-2 flex flex-col space-y-2 absolute left-4 top-20 z-10">
      <div className="relative">
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
          onClick={() => {
            setShowIndicators(!showIndicators);
            setShowDrawingTools(false);
          }}
          title="Indicators"
        >
          <Icon name="Activity" size={20} className="text-text-primary" />
        </button>
        
        {showIndicators && (
          <div className="absolute left-12 top-0 bg-surface border border-border rounded-lg shadow-md p-2 w-48">
            <h3 className="text-sm font-medium text-text-secondary mb-2 px-2">Indicators</h3>
            {indicators.map((indicator) => (
              <button
                key={indicator.id}
                className="flex items-center w-full p-2 text-sm text-text-primary hover:bg-gray-50 rounded-md"
                onClick={() => {
                  onAddIndicator(indicator);
                  setShowIndicators(false);
                }}
              >
                <Icon name={indicator.icon} size={16} className="mr-2 text-primary" />
                <span>{indicator.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="relative">
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
          onClick={() => {
            setShowDrawingTools(!showDrawingTools);
            setShowIndicators(false);
          }}
          title="Drawing Tools"
        >
          <Icon name="Pencil" size={20} className="text-text-primary" />
        </button>
        
        {showDrawingTools && (
          <div className="absolute left-12 top-0 bg-surface border border-border rounded-lg shadow-md p-2 w-48">
            <h3 className="text-sm font-medium text-text-secondary mb-2 px-2">Drawing Tools</h3>
            {drawingTools.map((tool) => (
              <button
                key={tool.id}
                className="flex items-center w-full p-2 text-sm text-text-primary hover:bg-gray-50 rounded-md"
                onClick={() => {
                  onSelectDrawingTool(tool);
                  setShowDrawingTools(false);
                }}
              >
                <Icon name={tool.icon} size={16} className="mr-2 text-primary" />
                <span>{tool.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <button 
        className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
        title="Zoom In"
      >
        <Icon name="ZoomIn" size={20} className="text-text-primary" />
      </button>
      
      <button 
        className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
        title="Zoom Out"
      >
        <Icon name="ZoomOut" size={20} className="text-text-primary" />
      </button>
      
      <button 
        className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
        title="Reset View"
      >
        <Icon name="Maximize" size={20} className="text-text-primary" />
      </button>
      
      <div className="border-t border-border pt-2">
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100"
          title="Settings"
        >
          <Icon name="Settings" size={20} className="text-text-primary" />
        </button>
      </div>
    </div>
  );
};

export default ChartToolbox;