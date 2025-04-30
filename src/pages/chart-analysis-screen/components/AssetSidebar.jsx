import React from "react";
import Icon from "components/AppIcon";

const AssetSidebar = ({ asset, isOpen, toggleSidebar }) => {
  const assetData = {
    price: "1.0892",
    change: "+0.05%",
    high: "1.0905",
    low: "1.0875",
    volume: "98,452",
    marketCap: "$1.2T",
    openInterest: "125,780",
    volatility: "Medium",
    sentiment: "Bullish",
    correlation: [
      { asset: "GBP/USD", value: "0.85" },
      { asset: "USD/JPY", value: "-0.72" },
      { asset: "Gold", value: "0.31" },
    ]
  };

  return (
    <div className={`fixed top-16 right-0 h-[calc(100vh-64px)] bg-surface border-l border-border transition-all duration-300 z-20 ${isOpen ? 'w-64' : 'w-0'}`}>
      <div className="relative h-full overflow-y-auto">
        <button 
          className="absolute -left-10 top-4 bg-surface border border-border rounded-l-lg p-2"
          onClick={toggleSidebar}
        >
          <Icon name={isOpen ? "ChevronRight" : "ChevronLeft"} size={16} className="text-text-tertiary" />
        </button>
        
        {isOpen && (
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
                <Icon 
                  name={
                    asset.category === "Forex" ? "RefreshCw" : asset.category ==="Commodities"? "Diamond" : asset.category ==="Stocks" ? "TrendingUp" : "Bitcoin"
                  } 
                  size={18} 
                  className="text-primary" 
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">{asset.name}</h2>
                <p className="text-xs text-text-tertiary">{asset.category}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-2xl font-bold text-text-primary">{assetData.price}</span>
                <span className="text-sm font-medium text-success">{assetData.change}</span>
              </div>
              <div className="flex space-x-4 text-xs text-text-secondary">
                <div>
                  <span className="mr-1">H:</span>
                  <span className="font-medium">{assetData.high}</span>
                </div>
                <div>
                  <span className="mr-1">L:</span>
                  <span className="font-medium">{assetData.low}</span>
                </div>
                <div>
                  <span className="mr-1">V:</span>
                  <span className="font-medium">{assetData.volume}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-2">Market Statistics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-text-tertiary">Market Cap</span>
                    <span className="text-xs font-medium text-text-primary">{assetData.marketCap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-text-tertiary">Open Interest</span>
                    <span className="text-xs font-medium text-text-primary">{assetData.openInterest}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-text-tertiary">Volatility</span>
                    <span className="text-xs font-medium text-text-primary">{assetData.volatility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-text-tertiary">Sentiment</span>
                    <span className="text-xs font-medium text-success">{assetData.sentiment}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-2">Correlations</h3>
                <div className="space-y-2">
                  {assetData.correlation.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-xs text-text-tertiary">{item.asset}</span>
                      <span className={`text-xs font-medium ${
                        parseFloat(item.value) > 0 ? 'text-success' : 'text-danger'
                      }`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <button className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  Trade Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetSidebar;