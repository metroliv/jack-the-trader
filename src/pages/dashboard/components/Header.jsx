import React, { useState } from "react";
import Icon from "components/AppIcon";
import { Link } from "react-router-dom";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const notifications = [
    {
      id: 1,
      type: "alert",
      message: "EUR/USD reached your price alert at 1.0890",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "system",
      message: "System maintenance scheduled for June 15, 2023",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "trade",
      message: "Your BTC/USD trade was executed successfully",
      time: "3 hours ago",
    },
  ];

  return (
    <header className="bg-surface border-b border-border h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <div className="mr-4 lg:hidden">
          <button className="text-text-secondary hover:text-text-primary">
            <Icon name="Menu" size={24} />
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon name="Search" size={18} className="text-text-tertiary" />
          </div>
          <input 
            type="text" placeholder="Search assets, markets..." className="bg-gray-50 border border-border text-text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-gray-100">
          <Icon name="Bell" size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
        </button>
        
        <Link to="/account-settings-screen" className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-gray-100">
          <Icon name="Settings" size={20} />
        </Link>
        
        <div className="relative">
          <button 
            className="flex items-center text-sm bg-primary-light text-primary px-3 py-1.5 rounded-lg font-medium"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Icon name="Wallet" size={16} className="mr-2" />
            <span>$5,842.75</span>
            <Icon name="ChevronDown" size={16} className="ml-1" />
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-surface rounded-lg shadow-lg border border-border z-20">
              <div className="p-3 border-b border-border">
                <h3 className="text-sm font-medium text-text-primary">Account Balance</h3>
              </div>
              <div className="p-3">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-text-secondary">Available:</span>
                  <span className="text-sm font-medium text-text-primary">$5,842.75</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-text-secondary">In Trade:</span>
                  <span className="text-sm font-medium text-text-primary">$1,250.50</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-primary hover:bg-primary-hover text-white text-sm py-2 rounded-lg transition-colors">
                    Deposit
                  </button>
                  <button className="border border-primary text-primary hover:bg-primary-light text-sm py-2 rounded-lg transition-colors">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;