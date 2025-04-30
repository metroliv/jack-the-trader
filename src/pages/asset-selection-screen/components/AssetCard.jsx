import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "components/AppIcon";

const AssetCard = ({ asset, onFavoriteToggle }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(asset.price);
  const [priceIncreased, setPriceIncreased] = useState(null);
  
  // Simulate price update when receiving new data
  useEffect(() => {
    if (asset.price !== currentPrice) {
      const newPriceIncreased = parseFloat(asset.price) > parseFloat(currentPrice);
      setPriceIncreased(newPriceIncreased);
      setIsUpdating(true);
      setCurrentPrice(asset.price);
      
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [asset.price, currentPrice]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Forex":
        return "RefreshCw";
      case "Synthetic":
        return "BarChart2";
      case "Commodities":
        return "Diamond";
      case "Stocks":
        return "TrendingUp";
      case "Crypto":
        return "Bitcoin";
      default:
        return "BarChart2";
    }
  };

  return (
    <div 
      className={`bg-surface rounded-lg shadow-sm border border-border p-4 transition-all duration-300 hover:border-primary ${
        isUpdating ? (priceIncreased ? 'bg-success-light bg-opacity-50' : 'bg-danger-light bg-opacity-50') : ''
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
            <Icon 
              name={getCategoryIcon(asset.category)} 
              size={18} 
              className="text-primary" 
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary">{asset.name}</h3>
            <span className="text-xs text-text-tertiary">{asset.category}</span>
          </div>
        </div>
        <button 
          onClick={() => onFavoriteToggle(asset.id)}
          className="text-text-tertiary hover:text-warning"
        >
          <Icon 
            name={asset.isFavorite ? "Star" : "StarOutline"} 
            size={18} 
            className={asset.isFavorite ? "text-warning" : ""} 
          />
        </button>
      </div>
      
      <div className="flex justify-between items-end mb-3">
        <div>
          <span className="text-xs text-text-tertiary">Current Price</span>
          <div className={`text-lg font-semibold ${isUpdating ? (priceIncreased ? 'text-success' : 'text-danger') : 'text-text-primary'}`}>
            {asset.price}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xs ${asset.isPositive ? 'text-success' : 'text-danger'}`}>
            {asset.change}
          </span>
          <span className="text-xs text-text-tertiary">24h</span>
        </div>
      </div>
      
      {/* Sparkline Chart */}
      <div className="h-10 w-full mb-3">
        <svg width="100%" height="100%" viewBox="0 0 100 30">
          <path
            d={asset.sparkline}
            fill="none" strokeWidth="2" stroke={asset.isPositive ?"#10B981" : "#EF4444"}
          />
        </svg>
      </div>
      
      <div className="flex justify-between">
        <Link
          to={`/chart-analysis-screen?asset=${asset.id}`}
          className="text-primary text-sm font-medium flex items-center"
        >
          <Icon name="LineChart" size={16} className="mr-1" />
          <span>Analysis</span>
        </Link>
        <Link
          to={`/trading-interface?asset=${asset.id}`}
          className="bg-primary hover:bg-primary-hover text-white text-sm py-1 px-3 rounded-lg transition-colors"
        >
          Trade
        </Link>
      </div>
    </div>
  );
};

export default AssetCard;