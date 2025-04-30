import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";

// Import components
import Sidebar from "../dashboard/components/Sidebar";
import Header from "../dashboard/components/Header";
import PortfolioHeader from "./components/PortfolioHeader";
import OpenPositions from "./components/OpenPositions";
import TradeHistory from "./components/TradeHistory";
import PerformanceChart from "./components/PerformanceChart";

const PortfolioHistoryScreen = () => {
  const [activeTab, setActiveTab] = useState("positions");
  const [isLoading, setIsLoading] = useState(true);
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle export functionality
  const handleExport = () => {
    setShowExportOptions(!showExportOptions);
  };

  const handleExportFormat = (format) => {
    // In a real app, this would trigger an actual export
    console.log(`Exporting in ${format} format`);
    setShowExportOptions(false);
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
      <div className="mt-6 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="h-24 bg-gray-200 rounded"></div>
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
        
        {/* Portfolio Content */}
        <main className="p-6">
          <div className="relative">
            {/* Portfolio Header with Tabs */}
            <PortfolioHeader 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onExport={handleExport} 
            />
            
            {/* Export Options Dropdown */}
            {showExportOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-lg border border-border z-20">
                <div className="p-2">
                  <button 
                    onClick={() => handleExportFormat('csv')}
                    className="flex items-center w-full px-3 py-2 text-sm text-text-primary hover:bg-gray-50 rounded-md"
                  >
                    <Icon name="FileText" size={16} className="mr-2 text-text-tertiary" />
                    <span>Export as CSV</span>
                  </button>
                  <button 
                    onClick={() => handleExportFormat('pdf')}
                    className="flex items-center w-full px-3 py-2 text-sm text-text-primary hover:bg-gray-50 rounded-md"
                  >
                    <Icon name="FileText" size={16} className="mr-2 text-text-tertiary" />
                    <span>Export as PDF</span>
                  </button>
                  <button 
                    onClick={() => handleExportFormat('excel')}
                    className="flex items-center w-full px-3 py-2 text-sm text-text-primary hover:bg-gray-50 rounded-md"
                  >
                    <Icon name="FileText" size={16} className="mr-2 text-text-tertiary" />
                    <span>Export as Excel</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Performance Chart (visible in both tabs) */}
          {isLoading ? (
            <SkeletonLoader height="h-72" />
          ) : (
            <PerformanceChart />
          )}
          
          {/* Tab Content */}
          {isLoading ? (
            <SkeletonLoader height="h-96" />
          ) : (
            <div>
              {activeTab === "positions" ? (
                <OpenPositions />
              ) : (
                <TradeHistory />
              )}
            </div>
          )}
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

export default PortfolioHistoryScreen;