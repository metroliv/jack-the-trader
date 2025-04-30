import React, { useState } from "react";
import Icon from "components/AppIcon";

const FilterPanel = ({ onFilterChange }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    forex: true,
    synthetic: false,
    commodities: false,
    stocks: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    volatility: [],
    tradingHours: [],
  });

  const toggleCategory = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  };

  const handleFilterChange = (type, value) => {
    const newFilters = { ...selectedFilters };
    
    if (newFilters[type].includes(value)) {
      newFilters[type] = newFilters[type].filter(item => item !== value);
    } else {
      newFilters[type] = [...newFilters[type], value];
    }
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      categories: [],
      volatility: [],
      tradingHours: [],
    };
    setSelectedFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        {(selectedFilters.categories.length > 0 || 
          selectedFilters.volatility.length > 0 || 
          selectedFilters.tradingHours.length > 0) && (
          <button 
            onClick={clearFilters}
            className="text-primary text-sm font-medium flex items-center"
          >
            <span>Clear All</span>
          </button>
        )}
      </div>
      
      {/* Asset Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-text-secondary mb-3">Asset Categories</h3>
        
        {/* Forex */}
        <div className="mb-2">
          <button 
            onClick={() => toggleCategory("forex")}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <div className="flex items-center">
              <Icon 
                name="RefreshCw" 
                size={16} 
                className="text-primary mr-2" 
              />
              <span className="text-sm font-medium text-text-primary">Forex Pairs</span>
            </div>
            <Icon 
              name={expandedCategories.forex ? "ChevronDown" : "ChevronRight"} 
              size={16} 
              className="text-text-tertiary" 
            />
          </button>
          
          {expandedCategories.forex && (
            <div className="ml-6 space-y-2 mt-2">
              {["Major Pairs", "Minor Pairs", "Exotic Pairs"].map((subcategory) => (
                <div key={subcategory} className="flex items-center">
                  <input
                    type="checkbox"
                    id={subcategory.replace(/\s+/g, '-').toLowerCase()}
                    checked={selectedFilters.categories.includes(subcategory)}
                    onChange={() => handleFilterChange("categories", subcategory)}
                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2 focus:outline-none"
                  />
                  <label 
                    htmlFor={subcategory.replace(/\s+/g, '-').toLowerCase()}
                    className="ml-2 text-sm text-text-secondary"
                  >
                    {subcategory}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Synthetic Indices */}
        <div className="mb-2">
          <button 
            onClick={() => toggleCategory("synthetic")}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <div className="flex items-center">
              <Icon 
                name="BarChart2" 
                size={16} 
                className="text-primary mr-2" 
              />
              <span className="text-sm font-medium text-text-primary">Synthetic Indices</span>
            </div>
            <Icon 
              name={expandedCategories.synthetic ? "ChevronDown" : "ChevronRight"} 
              size={16} 
              className="text-text-tertiary" 
            />
          </button>
          
          {expandedCategories.synthetic && (
            <div className="ml-6 space-y-2 mt-2">
              {["Volatility Indices", "Crash/Boom", "Step Indices"].map((subcategory) => (
                <div key={subcategory} className="flex items-center">
                  <input
                    type="checkbox"
                    id={subcategory.replace(/\s+/g, '-').toLowerCase()}
                    checked={selectedFilters.categories.includes(subcategory)}
                    onChange={() => handleFilterChange("categories", subcategory)}
                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2 focus:outline-none"
                  />
                  <label 
                    htmlFor={subcategory.replace(/\s+/g, '-').toLowerCase()}
                    className="ml-2 text-sm text-text-secondary"
                  >
                    {subcategory}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Commodities */}
        <div className="mb-2">
          <button 
            onClick={() => toggleCategory("commodities")}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <div className="flex items-center">
              <Icon 
                name="Diamond" 
                size={16} 
                className="text-primary mr-2" 
              />
              <span className="text-sm font-medium text-text-primary">Commodities</span>
            </div>
            <Icon 
              name={expandedCategories.commodities ? "ChevronDown" : "ChevronRight"} 
              size={16} 
              className="text-text-tertiary" 
            />
          </button>
          
          {expandedCategories.commodities && (
            <div className="ml-6 space-y-2 mt-2">
              {["Metals", "Energy", "Agricultural"].map((subcategory) => (
                <div key={subcategory} className="flex items-center">
                  <input
                    type="checkbox"
                    id={subcategory.replace(/\s+/g, '-').toLowerCase()}
                    checked={selectedFilters.categories.includes(subcategory)}
                    onChange={() => handleFilterChange("categories", subcategory)}
                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2 focus:outline-none"
                  />
                  <label 
                    htmlFor={subcategory.replace(/\s+/g, '-').toLowerCase()}
                    className="ml-2 text-sm text-text-secondary"
                  >
                    {subcategory}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Stocks */}
        <div className="mb-2">
          <button 
            onClick={() => toggleCategory("stocks")}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <div className="flex items-center">
              <Icon 
                name="TrendingUp" 
                size={16} 
                className="text-primary mr-2" 
              />
              <span className="text-sm font-medium text-text-primary">Stocks</span>
            </div>
            <Icon 
              name={expandedCategories.stocks ? "ChevronDown" : "ChevronRight"} 
              size={16} 
              className="text-text-tertiary" 
            />
          </button>
          
          {expandedCategories.stocks && (
            <div className="ml-6 space-y-2 mt-2">
              {["US", "European", "Asian"].map((subcategory) => (
                <div key={subcategory} className="flex items-center">
                  <input
                    type="checkbox"
                    id={subcategory.replace(/\s+/g, '-').toLowerCase()}
                    checked={selectedFilters.categories.includes(subcategory)}
                    onChange={() => handleFilterChange("categories", subcategory)}
                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2 focus:outline-none"
                  />
                  <label 
                    htmlFor={subcategory.replace(/\s+/g, '-').toLowerCase()}
                    className="ml-2 text-sm text-text-secondary"
                  >
                    {subcategory}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Volatility Level */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-text-secondary mb-3">Volatility Level</h3>
        <div className="space-y-2">
          {["Low", "Medium", "High"].map((level) => (
            <div key={level} className="flex items-center">
              <input
                type="checkbox"
                id={`volatility-${level.toLowerCase()}`}
                checked={selectedFilters.volatility.includes(level)}
                onChange={() => handleFilterChange("volatility", level)}
                className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2 focus:outline-none"
              />
              <label 
                htmlFor={`volatility-${level.toLowerCase()}`}
                className="ml-2 text-sm text-text-secondary"
              >
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Trading Hours */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-3">Trading Hours</h3>
        <div className="space-y-2">
          {["24/7", "Weekdays Only", "Extended Hours"].map((hours) => (
            <div key={hours} className="flex items-center">
              <input
                type="checkbox"
                id={`hours-${hours.replace(/\s+/g, '-').replace(/\//g, '-').toLowerCase()}`}
                checked={selectedFilters.tradingHours.includes(hours)}
                onChange={() => handleFilterChange("tradingHours", hours)}
                className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2 focus:outline-none"
              />
              <label 
                htmlFor={`hours-${hours.replace(/\s+/g, '-').replace(/\//g, '-').toLowerCase()}`}
                className="ml-2 text-sm text-text-secondary"
              >
                {hours}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;