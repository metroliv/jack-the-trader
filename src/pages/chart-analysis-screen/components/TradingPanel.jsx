import React, { useState } from "react";
import Icon from "components/AppIcon";

const TradingPanel = ({ asset }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tradeType, setTradeType] = useState("buy");
  const [amount, setAmount] = useState(100);
  const [duration, setDuration] = useState("5m");
  
  const durationOptions = [
    { value: "1m", label: "1 Minute" },
    { value: "5m", label: "5 Minutes" },
    { value: "15m", label: "15 Minutes" },
    { value: "1h", label: "1 Hour" },
    { value: "1d", label: "1 Day" },
  ];
  
  const handleTrade = () => {
    alert(`Placed a ${tradeType} order for ${asset.name} with $${amount} for ${duration} duration`);
  };

  if (!isExpanded) {
    return (
      <button
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-hover text-white rounded-full p-4 shadow-lg z-20"
        onClick={() => setIsExpanded(true)}
      >
        <Icon name="TrendingUp" size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 bg-surface border border-border rounded-lg shadow-lg p-4 w-80 z-20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Quick Trade</h3>
        <button 
          className="text-text-tertiary hover:text-text-primary"
          onClick={() => setIsExpanded(false)}
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center mr-2">
            <Icon 
              name={
                asset.category === "Forex" ? "RefreshCw" : asset.category ==="Commodities"? "Diamond" : asset.category ==="Stocks" ? "TrendingUp" : "Bitcoin"
              } 
              size={16} 
              className="text-primary" 
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-text-primary">{asset.name}</h4>
            <p className="text-xs text-text-tertiary">{asset.category}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex bg-gray-50 rounded-lg p-1">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              tradeType === "buy" ?"bg-success text-white" :"text-text-secondary hover:bg-gray-100"
            }`}
            onClick={() => setTradeType("buy")}
          >
            Buy / Long
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              tradeType === "sell" ?"bg-danger text-white" :"text-text-secondary hover:bg-gray-100"
            }`}
            onClick={() => setTradeType("sell")}
          >
            Sell / Short
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Amount
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-text-tertiary">$</span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full pl-8 pr-12 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              className="h-full px-2 text-text-tertiary hover:text-primary"
              onClick={() => setAmount(Math.max(0, amount - 10))}
            >
              <Icon name="Minus" size={16} />
            </button>
            <div className="h-4/5 w-px bg-border"></div>
            <button
              className="h-full px-2 text-text-tertiary hover:text-primary"
              onClick={() => setAmount(amount + 10)}
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Duration
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="block w-full py-2 px-3 border border-border rounded-lg focus:ring-primary focus:border-primary"
        >
          {durationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex justify-between text-sm mb-4">
        <span className="text-text-secondary">Potential Payout:</span>
        <span className="font-medium text-text-primary">$175.50</span>
      </div>
      
      <button
        className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
          tradeType === "buy" ?"bg-success hover:bg-success-600" :"bg-danger hover:bg-danger-600"
        }`}
        onClick={handleTrade}
      >
        {tradeType === "buy" ? "Buy" : "Sell"} {asset.name}
      </button>
    </div>
  );
};

export default TradingPanel;