import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: "EUR/USD",
      category: "Forex",
      price: "1.0892",
      change: "+0.05%",
      isPositive: true,
      isUpdating: false,
    },
    {
      id: 2,
      name: "Gold",
      category: "Commodities",
      price: "2,032.45",
      change: "+0.72%",
      isPositive: true,
      isUpdating: false,
    },
    {
      id: 3,
      name: "Apple Inc.",
      category: "Stocks",
      price: "187.68",
      change: "-0.34%",
      isPositive: false,
      isUpdating: false,
    },
    {
      id: 4,
      name: "BTC/USD",
      category: "Crypto",
      price: "42,356.78",
      change: "+1.23%",
      isPositive: true,
      isUpdating: false,
    },
    {
      id: 5,
      name: "GBP/JPY",
      category: "Forex",
      price: "186.42",
      change: "-0.18%",
      isPositive: false,
      isUpdating: false,
    },
  ]);

  // Simulate WebSocket price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAssetIndex = Math.floor(Math.random() * assets.length);
      const randomPriceChange = (Math.random() * 0.1).toFixed(4);
      const isPositive = Math.random() > 0.5;
      
      setAssets(prevAssets => {
        const newAssets = [...prevAssets];
        const asset = {...newAssets[randomAssetIndex]};
        
        // Calculate new price
        const currentPrice = parseFloat(asset.price.replace(',', ''));
        const change = isPositive ? parseFloat(randomPriceChange) : -parseFloat(randomPriceChange);
        const newPrice = (currentPrice + change).toFixed(
          asset.category === "Crypto" ? 2 : asset.category ==="Commodities" ? 2 : 4
        );
        
        // Format price with commas
        const formattedPrice = newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        // Calculate percentage change
        const percentChange = ((change / currentPrice) * 100).toFixed(2);
        
        asset.price = formattedPrice;
        asset.change = `${isPositive ? '+' : '-'}${Math.abs(percentChange)}%`;
        asset.isPositive = isPositive;
        asset.isUpdating = true;
        
        newAssets[randomAssetIndex] = asset;
        return newAssets;
      });
      
      // Remove updating animation after a short delay
      setTimeout(() => {
        setAssets(prevAssets => {
          return prevAssets.map(asset => {
            if (asset.isUpdating) {
              return { ...asset, isUpdating: false };
            }
            return asset;
          });
        });
      }, 1000);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [assets]);

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Watchlist</h2>
        <Link 
          to="/asset-selection-screen" className="text-primary text-sm font-medium flex items-center"
        >
          <span>View All</span>
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {assets.map((asset) => (
          <div 
            key={asset.id} 
            className={`flex justify-between items-center p-3 rounded-lg transition-all duration-300 ${
              asset.isUpdating ? 'bg-primary-light bg-opacity-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
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
                <h3 className="text-sm font-medium text-text-primary">{asset.name}</h3>
                <span className="text-xs text-text-tertiary">{asset.category}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-sm font-medium ${asset.isUpdating ? 'animate-pulse' : ''}`}>
                {asset.price}
              </span>
              <span className={`text-xs ${asset.isPositive ? 'text-success' : 'text-danger'}`}>
                {asset.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <Link 
        to="/asset-selection-screen" className="mt-4 flex items-center justify-center text-sm text-primary font-medium p-2 border border-dashed border-primary-light rounded-lg hover:bg-primary-light transition-colors"
      >
        <Icon name="Plus" size={16} className="mr-2" />
        <span>Add Asset</span>
      </Link>
    </div>
  );
};

export default Watchlist;