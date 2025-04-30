import React, { useState } from "react";
import Icon from "components/AppIcon";

const ChartHeader = ({ selectedAsset, setSelectedAsset, timeframe, setTimeframe, chartType, setChartType }) => {
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  
  const assets = [
    { id: 1, name: "EUR/USD", category: "Forex" },
    { id: 2, name: "Gold", category: "Commodities" },
    { id: 3, name: "Apple Inc.", category: "Stocks" },
    { id: 4, name: "BTC/USD", category: "Crypto" },
    { id: 5, name: "GBP/JPY", category: "Forex" },
  ];
  
  const timeframes = [
    { value: "1m", label: "1 Minute" },
    { value: "5m", label: "5 Minutes" },
    { value: "15m", label: "15 Minutes" },
    { value: "30m", label: "30 Minutes" },
    { value: "1h", label: "1 Hour" },
    { value: "4h", label: "4 Hours" },
    { value: "1d", label: "1 Day" },
  ];
  
  const chartTypes = [
    { value: "candlestick", label: "Candlestick", icon: "CandlestickChart" },
    { value: "line", label: "Line", icon: "LineChart" },
    { value: "area", label: "Area", icon: "AreaChart" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-3 md:space-y-0">
      <div className="relative">
        <button 
          className="flex items-center bg-surface border border-border rounded-lg px-4 py-2 text-text-primary font-medium"
          onClick={() => setShowAssetDropdown(!showAssetDropdown)}
        >
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center mr-3">
            <Icon 
              name={
                selectedAsset.category === "Forex" ? "RefreshCw" : selectedAsset.category ==="Commodities"? "Diamond" : selectedAsset.category ==="Stocks" ? "TrendingUp" : "Bitcoin"
              } 
              size={16} 
              className="text-primary" 
            />
          </div>
          <div className="mr-2">
            <div className="text-sm font-medium">{selectedAsset.name}</div>
            <div className="text-xs text-text-tertiary">{selectedAsset.category}</div>
          </div>
          <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
        </button>
        
        {showAssetDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-surface border border-border rounded-lg shadow-lg">
            <div className="p-2">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  className={`flex items-center w-full p-2 rounded-md text-left ${
                    selectedAsset.id === asset.id ? 'bg-primary-light' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedAsset(asset);
                    setShowAssetDropdown(false);
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary-light bg-opacity-70 flex items-center justify-center mr-3">
                    <Icon 
                      name={
                        asset.category === "Forex" ? "RefreshCw" : asset.category ==="Commodities"? "Diamond" : asset.category ==="Stocks" ? "TrendingUp" : "Bitcoin"
                      } 
                      size={16} 
                      className="text-primary" 
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{asset.name}</div>
                    <div className="text-xs text-text-tertiary">{asset.category}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex space-x-2">
        <div className="bg-surface border border-border rounded-lg flex">
          {chartTypes.map((type) => (
            <button
              key={type.value}
              className={`flex items-center px-3 py-2 ${
                chartType === type.value 
                  ? 'bg-primary text-white' :'text-text-secondary hover:bg-gray-50'
              }`}
              onClick={() => setChartType(type.value)}
              title={type.label}
            >
              <Icon name={type.icon} size={18} />
            </button>
          ))}
        </div>
        
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:ring-primary focus:border-primary"
        >
          {timeframes.map((tf) => (
            <option key={tf.value} value={tf.value}>
              {tf.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ChartHeader;