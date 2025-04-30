import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "components/AppIcon";

// Import components
import Sidebar from "../dashboard/components/Sidebar";
import Header from "../dashboard/components/Header";
import FilterPanel from "./components/FilterPanel";
import AssetGrid from "./components/AssetGrid";
import SearchBar from "./components/SearchBar";

const AssetSelectionScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState(["EUR/USD", "Gold", "Bitcoin"]);
  const [activeView, setActiveView] = useState("all"); // all, favorites
  const [filters, setFilters] = useState({
    categories: [],
    volatility: [],
    tradingHours: [],
  });

  // Mock data for assets
  useEffect(() => {
    const mockAssets = [
      {
        id: 1,
        name: "EUR/USD",
        category: "Forex",
        subcategory: "Major Pairs",
        price: "1.0892",
        change: "+0.05%",
        isPositive: true,
        volatility: "Low",
        tradingHours: "24/7",
        isFavorite: true,
        sparkline: "M0,15 L10,10 L20,18 L30,12 L40,15 L50,8 L60,14 L70,10 L80,16 L90,12 L100,15",
      },
      {
        id: 2,
        name: "GBP/JPY",
        category: "Forex",
        subcategory: "Major Pairs",
        price: "186.42",
        change: "-0.18%",
        isPositive: false,
        volatility: "Medium",
        tradingHours: "24/7",
        isFavorite: false,
        sparkline: "M0,15 L10,18 L20,14 L30,20 L40,16 L50,22 L60,18 L70,22 L80,18 L90,20 L100,15",
      },
      {
        id: 3,
        name: "USD/CAD",
        category: "Forex",
        subcategory: "Major Pairs",
        price: "1.3642",
        change: "+0.12%",
        isPositive: true,
        volatility: "Low",
        tradingHours: "24/7",
        isFavorite: false,
        sparkline: "M0,15 L10,12 L20,14 L30,10 L40,13 L50,9 L60,12 L70,8 L80,11 L90,7 L100,10",
      },
      {
        id: 4,
        name: "AUD/NZD",
        category: "Forex",
        subcategory: "Minor Pairs",
        price: "1.0856",
        change: "-0.03%",
        isPositive: false,
        volatility: "Low",
        tradingHours: "24/7",
        isFavorite: false,
        sparkline: "M0,15 L10,16 L20,14 L30,15 L40,13 L50,14 L60,12 L70,13 L80,11 L90,12 L100,10",
      },
      {
        id: 5,
        name: "Volatility 75 Index",
        category: "Synthetic",
        subcategory: "Volatility Indices",
        price: "12,456.89",
        change: "+1.23%",
        isPositive: true,
        volatility: "High",
        tradingHours: "24/7",
        isFavorite: true,
        sparkline: "M0,20 L10,10 L20,25 L30,5 L40,22 L50,8 L60,24 L70,6 L80,20 L90,10 L100,15",
      },
      {
        id: 6,
        name: "Crash 1000 Index",
        category: "Synthetic",
        subcategory: "Crash/Boom",
        price: "8,765.32",
        change: "-2.45%",
        isPositive: false,
        volatility: "High",
        tradingHours: "24/7",
        isFavorite: false,
        sparkline: "M0,10 L10,15 L20,8 L30,20 L40,5 L50,25 L60,10 L70,22 L80,8 L90,18 L100,5",
      },
      {
        id: 7,
        name: "Gold",
        category: "Commodities",
        subcategory: "Metals",
        price: "2,032.45",
        change: "+0.72%",
        isPositive: true,
        volatility: "Medium",
        tradingHours: "Extended Hours",
        isFavorite: true,
        sparkline: "M0,15 L10,12 L20,14 L30,10 L40,13 L50,9 L60,12 L70,8 L80,11 L90,7 L100,5",
      },
      {
        id: 8,
        name: "Crude Oil",
        category: "Commodities",
        subcategory: "Energy",
        price: "78.35",
        change: "-0.54%",
        isPositive: false,
        volatility: "Medium",
        tradingHours: "Extended Hours",
        isFavorite: false,
        sparkline: "M0,10 L10,12 L20,9 L30,14 L40,10 L50,15 L60,11 L70,16 L80,12 L90,17 L100,15",
      },
      {
        id: 9,
        name: "Apple Inc.",
        category: "Stocks",
        subcategory: "US",
        price: "187.68",
        change: "-0.34%",
        isPositive: false,
        volatility: "Medium",
        tradingHours: "Weekdays Only",
        isFavorite: false,
        sparkline: "M0,15 L10,14 L20,16 L30,13 L40,17 L50,12 L60,18 L70,14 L80,19 L90,15 L100,20",
      },
      {
        id: 10,
        name: "Tesla Inc.",
        category: "Stocks",
        subcategory: "US",
        price: "245.92",
        change: "+1.87%",
        isPositive: true,
        volatility: "High",
        tradingHours: "Weekdays Only",
        isFavorite: false,
        sparkline: "M0,20 L10,15 L20,22 L30,18 L40,25 L50,20 L60,28 L70,22 L80,30 L90,25 L100,32",
      },
      {
        id: 11,
        name: "BTC/USD",
        category: "Crypto",
        subcategory: "Major Crypto",
        price: "42,356.78",
        change: "+1.23%",
        isPositive: true,
        volatility: "High",
        tradingHours: "24/7",
        isFavorite: true,
        sparkline: "M0,15 L10,10 L20,18 L30,12 L40,20 L50,15 L60,22 L70,18 L80,25 L90,20 L100,28",
      },
      {
        id: 12,
        name: "ETH/USD",
        category: "Crypto",
        subcategory: "Major Crypto",
        price: "2,245.67",
        change: "+0.89%",
        isPositive: true,
        volatility: "High",
        tradingHours: "24/7",
        isFavorite: false,
        sparkline: "M0,15 L10,12 L20,18 L30,14 L40,20 L50,16 L60,22 L70,18 L80,24 L90,20 L100,26",
      },
    ];

    // Simulate API call
    setTimeout(() => {
      setAssets(mockAssets);
      setFilteredAssets(mockAssets);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...assets];
    
    // Apply view filter (all or favorites)
    if (activeView === "favorites") {
      result = result.filter(asset => asset.isFavorite);
    }
    
    // Apply search term
    if (searchTerm) {
      result = result.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filters
    if (filters.categories.length > 0) {
      result = result.filter(asset => 
        filters.categories.includes(asset.subcategory)
      );
    }
    
    // Apply volatility filters
    if (filters.volatility.length > 0) {
      result = result.filter(asset => 
        filters.volatility.includes(asset.volatility)
      );
    }
    
    // Apply trading hours filters
    if (filters.tradingHours.length > 0) {
      result = result.filter(asset => 
        filters.tradingHours.includes(asset.tradingHours)
      );
    }
    
    setFilteredAssets(result);
  }, [assets, searchTerm, filters, activeView]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    
    // Add to recent searches if not empty and not already in the list
    if (term && !recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev].slice(0, 5));
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Toggle favorite status
  const handleFavoriteToggle = (assetId) => {
    setAssets(prevAssets => 
      prevAssets.map(asset => 
        asset.id === assetId 
          ? { ...asset, isFavorite: !asset.isFavorite } 
          : asset
      )
    );
  };

  // Simulate WebSocket price updates
  useEffect(() => {
    if (assets.length === 0) return;
    
    const interval = setInterval(() => {
      const randomAssetIndex = Math.floor(Math.random() * assets.length);
      const randomPriceChange = (Math.random() * 0.1).toFixed(4);
      const isPositive = Math.random() > 0.5;
      
      setAssets(prevAssets => {
        const newAssets = [...prevAssets];
        const asset = {...newAssets[randomAssetIndex]};
        
        // Calculate new price
        let currentPrice = parseFloat(asset.price.replace(',', ''));
        const change = isPositive ? parseFloat(randomPriceChange) : -parseFloat(randomPriceChange);
        let newPrice = (currentPrice + change).toFixed(
          asset.category === "Crypto" || asset.category === "Synthetic" ? 2 : asset.category ==="Commodities" ? 2 : 4
        );
        
        // Format price with commas
        newPrice = newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        // Calculate percentage change
        const percentChange = ((change / currentPrice) * 100).toFixed(2);
        
        asset.price = newPrice;
        asset.change = `${isPositive ? '+' : '-'}${Math.abs(percentChange)}%`;
        asset.isPositive = isPositive;
        
        newAssets[randomAssetIndex] = asset;
        return newAssets;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [assets]);

  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header />
        
        {/* Asset Selection Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary mb-1">Asset Selection</h1>
            <p className="text-text-secondary">Browse and select assets for trading</p>
          </div>
          
          {/* Search and View Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <SearchBar 
                onSearch={handleSearch} 
                recentSearches={recentSearches}
                assets={assets}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setActiveView("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeView === "all" ?"bg-primary text-white" :"bg-surface text-text-secondary hover:bg-gray-100"
                }`}
              >
                All Assets
              </button>
              <button 
                onClick={() => setActiveView("favorites")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeView === "favorites" ?"bg-primary text-white" :"bg-surface text-text-secondary hover:bg-gray-100"
                }`}
              >
                <Icon name="Star" size={16} className="inline-block mr-1" />
                Favorites
              </button>
            </div>
          </div>
          
          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Filter Panel */}
            <div className="col-span-12 lg:col-span-3">
              <FilterPanel onFilterChange={handleFilterChange} />
            </div>
            
            {/* Asset Grid */}
            <div className="col-span-12 lg:col-span-9">
              <AssetGrid 
                assets={filteredAssets} 
                onFavoriteToggle={handleFavoriteToggle}
                isLoading={isLoading}
              />
              
              {/* Floating Action Button (Mobile) */}
              <div className="fixed bottom-6 right-6 lg:hidden">
                <Link
                  to="/trading-interface" className="bg-primary hover:bg-primary-hover text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
                >
                  <Icon name="TrendingUp" size={24} />
                </Link>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="p-6 border-t border-border mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-text-tertiary">
                &copy; {new Date().getFullYear()} Deriv Trader. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-text-secondary hover:text-primary">Terms of Service</a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary">Contact Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AssetSelectionScreen;