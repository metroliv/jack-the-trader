import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "components/AppIcon";

// Import components
import Sidebar from "../dashboard/components/Sidebar";
import Header from "../dashboard/components/Header";
import AssetSelector from "./components/AssetSelector";
import PriceChart from "./components/PriceChart";
import TradeForm from "./components/TradeForm";
import OpenPositions from "./components/OpenPositions";

const TradingInterface = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Set default selected asset
      setSelectedAsset({
        id: "EUR_USD",
        name: "EUR/USD",
        price: "1.0892",
        change: "+0.05%",
      });
      
      // Set mock positions
      setPositions([
        {
          id: 1,
          asset: {
            id: "EUR_USD",
            name: "EUR/USD",
          },
          contractType: "rise_fall",
          direction: "rise",
          stake: 25,
          potentialPayout: 43.75,
          timestamp: new Date(),
          expiryTime: new Date(Date.now() + 5 * 60000), // 5 minutes from now
          closed: false,
        },
        {
          id: 2,
          asset: {
            id: "GOLD",
            name: "Gold",
          },
          contractType: "higher_lower",
          direction: "fall",
          stake: 50,
          potentialPayout: 87.50,
          timestamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
          expiryTime: new Date(Date.now() - 5 * 60000), // 5 minutes ago (expired)
          closed: true,
          outcome: "win",
          profit: 87.50,
        },
      ]);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
  };
  
  const handlePlaceTrade = (tradeData) => {
    const newPosition = {
      id: positions.length + 1,
      ...tradeData,
      expiryTime: new Date(Date.now() + getExpiryTimeInMs(tradeData.duration)),
      closed: false,
    };
    
    setPositions([newPosition, ...positions]);
  };
  
  const handlePositionClose = (positionId) => {
    setPositions(prevPositions => 
      prevPositions.map(position => {
        if (position.id === positionId) {
          const outcome = Math.random() > 0.5 ? "win" : "loss";
          return {
            ...position,
            closed: true,
            outcome,
            profit: outcome === "win" ? position.potentialPayout : 0,
          };
        }
        return position;
      })
    );
  };
  
  // Helper function to convert duration string to milliseconds
  const getExpiryTimeInMs = (duration) => {
    if (duration === "1m") return 60 * 1000;
    if (duration === "5m") return 5 * 60 * 1000;
    if (duration === "15m") return 15 * 60 * 1000;
    if (duration === "30m") return 30 * 60 * 1000;
    if (duration === "1h") return 60 * 60 * 1000;
    
    // Handle custom duration (assuming minutes)
    const value = parseInt(duration);
    if (!isNaN(value)) {
      return value * 60 * 1000;
    }
    
    return 60 * 1000; // Default to 1 minute
  };
  
  // Skeleton loading component
  const SkeletonLoader = ({ height = "h-64" }) => (
    <div className={`bg-surface rounded-lg shadow-sm border border-border p-4 ${height} animate-pulse`}>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header />
        
        {/* Trading Interface Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary mb-1">Trading Interface</h1>
            <p className="text-text-secondary">Configure and place trades on your favorite assets.</p>
          </div>
          
          {/* Quick Navigation */}
          <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            <Link 
              to="/dashboard" className="flex items-center px-4 py-2 bg-surface rounded-lg border border-border hover:border-primary transition-colors"
            >
              <Icon name="LayoutDashboard" size={16} className="text-primary mr-2" />
              <span className="text-sm font-medium whitespace-nowrap">Dashboard</span>
            </Link>
            <Link 
              to="/asset-selection-screen" className="flex items-center px-4 py-2 bg-surface rounded-lg border border-border hover:border-primary transition-colors"
            >
              <Icon name="Search" size={16} className="text-primary mr-2" />
              <span className="text-sm font-medium whitespace-nowrap">Asset Explorer</span>
            </Link>
            <Link 
              to="/chart-analysis-screen" className="flex items-center px-4 py-2 bg-surface rounded-lg border border-border hover:border-primary transition-colors"
            >
              <Icon name="LineChart" size={16} className="text-primary mr-2" />
              <span className="text-sm font-medium whitespace-nowrap">Advanced Charts</span>
            </Link>
            <Link 
              to="/portfolio-history-screen" className="flex items-center px-4 py-2 bg-surface rounded-lg border border-border hover:border-primary transition-colors"
            >
              <Icon name="History" size={16} className="text-primary mr-2" />
              <span className="text-sm font-medium whitespace-nowrap">Trade History</span>
            </Link>
          </div>
          
          {/* Trading Interface Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Asset Selector */}
            <div className="col-span-12 lg:col-span-3 h-[calc(100vh-240px)]">
              {isLoading ? (
                <SkeletonLoader height="h-full" />
              ) : (
                <AssetSelector 
                  selectedAsset={selectedAsset} 
                  onAssetSelect={handleAssetSelect} 
                />
              )}
            </div>
            
            {/* Price Chart */}
            <div className="col-span-12 lg:col-span-6 h-[calc(100vh-240px)]">
              {isLoading ? (
                <SkeletonLoader height="h-full" />
              ) : (
                <PriceChart selectedAsset={selectedAsset} />
              )}
            </div>
            
            {/* Right Panel - Trade Form and Open Positions */}
            <div className="col-span-12 lg:col-span-3 space-y-6">
              {/* Trade Form */}
              <div className="h-[calc(60vh-180px)]">
                {isLoading ? (
                  <SkeletonLoader height="h-full" />
                ) : (
                  <TradeForm 
                    selectedAsset={selectedAsset} 
                    onPlaceTrade={handlePlaceTrade} 
                  />
                )}
              </div>
              
              {/* Open Positions */}
              <div className="h-[calc(40vh-120px)]">
                {isLoading ? (
                  <SkeletonLoader height="h-full" />
                ) : (
                  <OpenPositions 
                    positions={positions} 
                    onPositionClose={handlePositionClose} 
                  />
                )}
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

export default TradingInterface;