import React from "react";
import Icon from "components/AppIcon";
import { Link } from "react-router-dom";

const PortfolioHeader = ({ activeTab, setActiveTab, onExport }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Portfolio & History</h1>
          <p className="text-text-secondary">Track your trading activity and performance</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button 
            onClick={onExport}
            className="flex items-center text-sm text-primary border border-primary px-3 py-1.5 rounded-lg hover:bg-primary-light transition-colors"
          >
            <Icon name="Download" size={16} className="mr-2" />
            <span>Export</span>
          </button>
          <Link 
            to="/trading-interface" className="flex items-center text-sm bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <Icon name="TrendingUp" size={16} className="mr-2" />
            <span>New Trade</span>
          </Link>
        </div>
      </div>
      
      <div className="flex border-b border-border">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'positions' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
          }`}
          onClick={() => setActiveTab('positions')}
        >
          Open Positions
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'history' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
          }`}
          onClick={() => setActiveTab('history')}
        >
          Trade History
        </button>
      </div>
    </div>
  );
};

export default PortfolioHeader;