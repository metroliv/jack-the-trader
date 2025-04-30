import React, { useState } from "react";
import Icon from "components/AppIcon";

const AssetSelector = ({ selectedAsset, onAssetSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("forex");
  
  const assetCategories = [
    { id: "forex", name: "Forex", icon: "RefreshCw" },
    { id: "indices", name: "Indices", icon: "BarChart2" },
    { id: "commodities", name: "Commodities", icon: "Diamond" },
    { id: "crypto", name: "Crypto", icon: "Bitcoin" },
    { id: "stocks", name: "Stocks", icon: "TrendingUp" },
  ];
  
  const assets = {
    forex: [
      { id: "EUR_USD", name: "EUR/USD", price: "1.0892", change: "+0.05%" },
      { id: "GBP_USD", name: "GBP/USD", price: "1.2654", change: "-0.12%" },
      { id: "USD_JPY", name: "USD/JPY", price: "149.62", change: "+0.23%" },
      { id: "AUD_USD", name: "AUD/USD", price: "0.6543", change: "-0.08%" },
      { id: "USD_CAD", name: "USD/CAD", price: "1.3765", change: "+0.15%" },
      { id: "EUR_GBP", name: "EUR/GBP", price: "0.8607", change: "-0.03%" },
    ],
    indices: [
      { id: "US_30", name: "US 30", price: "37,306.02", change: "-0.17%" },
      { id: "US_500", name: "US 500", price: "4,782.82", change: "+0.41%" },
      { id: "US_TECH", name: "US Tech 100", price: "15,003.22", change: "+0.53%" },
      { id: "UK_100", name: "UK 100", price: "7,487.64", change: "+0.32%" },
      { id: "DE_30", name: "Germany 30", price: "16,752.23", change: "+0.21%" },
    ],
    commodities: [
      { id: "GOLD", name: "Gold", price: "2,032.45", change: "+0.72%" },
      { id: "SILVER", name: "Silver", price: "24.17", change: "+0.45%" },
      { id: "OIL", name: "Oil", price: "72.84", change: "-1.23%" },
      { id: "COPPER", name: "Copper", price: "3.89", change: "+0.18%" },
      { id: "NAT_GAS", name: "Natural Gas", price: "2.54", change: "-0.87%" },
    ],
    crypto: [
      { id: "BTC_USD", name: "BTC/USD", price: "42,356.78", change: "+1.23%" },
      { id: "ETH_USD", name: "ETH/USD", price: "2,245.67", change: "+0.95%" },
      { id: "LTC_USD", name: "LTC/USD", price: "68.42", change: "-0.56%" },
      { id: "XRP_USD", name: "XRP/USD", price: "0.5423", change: "+0.32%" },
    ],
    stocks: [
      { id: "AAPL", name: "Apple Inc.", price: "187.68", change: "-0.34%" },
      { id: "MSFT", name: "Microsoft", price: "338.47", change: "+0.56%" },
      { id: "AMZN", name: "Amazon", price: "145.24", change: "+0.78%" },
      { id: "GOOGL", name: "Alphabet", price: "134.99", change: "-0.12%" },
      { id: "META", name: "Meta", price: "334.92", change: "+1.05%" },
    ],
  };
  
  const filteredAssets = assets[activeCategory].filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-3">Select Asset</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon name="Search" size={16} className="text-text-tertiary" />
          </div>
          <input 
            type="text" placeholder="Search assets..." className="bg-gray-50 border border-border text-text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex border-b border-border overflow-x-auto">
        {assetCategories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
              activeCategory === category.id 
                ? "text-primary border-b-2 border-primary" :"text-text-secondary hover:text-text-primary hover:bg-gray-50"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <Icon 
              name={category.icon} 
              size={16} 
              className={`mr-2 ${activeCategory === category.id ? "text-primary" : "text-text-tertiary"}`} 
            />
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <button
                key={asset.id}
                className={`w-full flex justify-between items-center p-3 rounded-lg transition-colors ${
                  selectedAsset?.id === asset.id 
                    ? "bg-primary-light" :"hover:bg-gray-50"
                }`}
                onClick={() => onAssetSelect(asset)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center mr-3">
                    <Icon 
                      name={
                        activeCategory === "forex" ? "RefreshCw" :
                        activeCategory === "commodities"? "Diamond" : activeCategory ==="indices"? "BarChart2" : activeCategory ==="crypto" ? "Bitcoin" : "TrendingUp"
                      } 
                      size={16} 
                      className="text-primary" 
                    />
                  </div>
                  <span className="font-medium text-text-primary">{asset.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{asset.price}</span>
                  <span className={`text-xs ${asset.change.startsWith("+") ? "text-success" : "text-danger"}`}>
                    {asset.change}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-text-tertiary">
              <Icon name="Search" size={24} className="mb-2" />
              <p>No assets found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetSelector;