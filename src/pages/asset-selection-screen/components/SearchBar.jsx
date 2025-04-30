import React, { useState, useEffect, useRef } from "react";
import Icon from "components/AppIcon";

const SearchBar = ({ onSearch, recentSearches, assets }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    // Handle clicks outside of the search component
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      // Filter assets based on search term
      const filtered = assets.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, assets]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    onSearch(suggestion.name);
    setShowSuggestions(false);
  };

  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon name="Search" size={18} className="text-text-tertiary" />
          </div>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search assets, markets..." className="bg-gray-50 border border-border text-text-primary text-sm rounded-lg focus:ring-primary focus:ring-2 focus:outline-none block w-full pl-10 p-2.5"
          />
          {searchTerm && (
            <button 
              type="button"
              onClick={() => {
                setSearchTerm("");
                onSearch("");
              }}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <Icon name="X" size={16} className="text-text-tertiary hover:text-text-primary" />
            </button>
          )}
        </div>
      </form>
      
      {showSuggestions && (
        <div className="absolute z-10 mt-1 w-full bg-surface rounded-lg shadow-lg border border-border">
          {suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion) => (
                <li 
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                >
                  <Icon 
                    name={
                      suggestion.category === "Forex" ? "RefreshCw" : suggestion.category ==="Commodities"? "Diamond" : suggestion.category ==="Stocks"? "TrendingUp" : suggestion.category ==="Synthetic" ? "BarChart2" : "Bitcoin"
                    } 
                    size={16} 
                    className="text-primary mr-2" 
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary">{suggestion.name}</div>
                    <div className="text-xs text-text-tertiary">{suggestion.category}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : searchTerm.length > 1 ? (
            <div className="px-4 py-3 text-sm text-text-secondary">No results found</div>
          ) : recentSearches.length > 0 ? (
            <div>
              <div className="px-4 py-2 text-xs font-medium text-text-tertiary">Recent Searches</div>
              <ul>
                {recentSearches.map((term, index) => (
                  <li 
                    key={index}
                    onClick={() => handleRecentSearchClick(term)}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                  >
                    <Icon name="Clock" size={14} className="text-text-tertiary mr-2" />
                    <span className="text-sm text-text-secondary">{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;