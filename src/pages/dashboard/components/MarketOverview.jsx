import React from "react";
import Icon from "components/AppIcon";

const MarketOverview = () => {
  const marketIndices = [
    {
      id: 1,
      name: "S&P 500",
      value: "4,782.82",
      change: "+0.41%",
      isPositive: true,
    },
    {
      id: 2,
      name: "NASDAQ",
      value: "15,003.22",
      change: "+0.53%",
      isPositive: true,
    },
    {
      id: 3,
      name: "DOW JONES",
      value: "37,306.02",
      change: "-0.17%",
      isPositive: false,
    },
    {
      id: 4,
      name: "FTSE 100",
      value: "7,487.64",
      change: "+0.32%",
      isPositive: true,
    },
  ];

  const sentimentData = {
    bullish: 65,
    bearish: 35,
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Market Overview</h2>
      
      {/* Market Sentiment */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-text-secondary">Market Sentiment</h3>
          <div className="flex items-center">
            <span className="text-xs text-text-tertiary">Updated 5 min ago</span>
          </div>
        </div>
        <div className="flex items-center mb-1">
          <div className="h-2 rounded-full bg-gray-100 w-full overflow-hidden">
            <div 
              className="h-full bg-success rounded-full" 
              style={{ width: `${sentimentData.bullish}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-xs">
          <div className="flex items-center">
            <Icon name="TrendingUp" size={14} className="text-success mr-1" />
            <span className="font-medium">Bullish {sentimentData.bullish}%</span>
          </div>
          <div className="flex items-center">
            <Icon name="TrendingDown" size={14} className="text-danger mr-1" />
            <span className="font-medium">Bearish {sentimentData.bearish}%</span>
          </div>
        </div>
      </div>
      
      {/* Market Indices */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-3">Global Indices</h3>
        <div className="space-y-3">
          {marketIndices.map((index) => (
            <div key={index.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center mr-3">
                  <Icon name="BarChart2" size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium">{index.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{index.value}</span>
                <span className={`text-xs ${index.isPositive ? 'text-success' : 'text-danger'}`}>
                  {index.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;