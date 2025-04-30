import React, { useState, useEffect } from "react";


// Import components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChartHeader from "./components/ChartHeader";
import ChartToolbox from "./components/ChartToolbox";
import AssetSidebar from "./components/AssetSidebar";
import ActiveIndicators from "./components/ActiveIndicators";
import ChartContainer from "./components/ChartContainer";
import TimelineNavigator from "./components/TimelineNavigator";
import TradingPanel from "./components/TradingPanel";

const ChartAnalysisScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState({
    id: 1,
    name: "EUR/USD",
    category: "Forex"
  });
  const [timeframe, setTimeframe] = useState("1h");
  const [chartType, setChartType] = useState("candlestick");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeIndicators, setActiveIndicators] = useState([]);
  const [chartData, setChartData] = useState([]);
  
  // Generate mock chart data
  useEffect(() => {
    const generateMockData = () => {
      const data = [];
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      
      let basePrice = 1.0850;
      let baseVolume = 1000;
      
      for (let i = 0; i < 200; i++) {
        const time = new Date(now);
        time.setHours(0, 0, 0, 0);
        time.setDate(time.getDate() - 200 + i);
        
        const volatility = 0.002;
        const randomChange = (Math.random() * 2 - 1) * volatility;
        
        basePrice = basePrice + randomChange;
        baseVolume = baseVolume + (Math.random() * 500 - 250);
        
        const open = basePrice;
        const high = basePrice + Math.random() * 0.001;
        const low = basePrice - Math.random() * 0.001;
        const close = basePrice + (Math.random() * 0.002 - 0.001);
        
        if (chartType === 'candlestick') {
          data.push({
            time: time.getTime() / 1000,
            open: open,
            high: high,
            low: low,
            close: close,
            volume: baseVolume,
          });
        } else {
          data.push({
            time: time.getTime() / 1000,
            value: close,
          });
        }
      }
      
      return data;
    };
    
    setChartData(generateMockData());
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [chartType, selectedAsset, timeframe]);
  
  const handleAddIndicator = (indicator) => {
    // Add a random parameter to simulate configuration
    const params = indicator.id === 'ma' ? '20' : indicator.id ==='rsi'? '14' : indicator.id ==='macd' ? '12,26,9' : '';
    
    setActiveIndicators([
      ...activeIndicators, 
      { ...indicator, params }
    ]);
  };
  
  const handleRemoveIndicator = (id) => {
    setActiveIndicators(activeIndicators.filter(indicator => indicator.id !== id));
  };
  
  const handleEditIndicator = (indicator) => {
    // In a real app, this would open a configuration modal
    alert(`Edit indicator: ${indicator.name}`);
  };
  
  const handleSelectDrawingTool = (tool) => {
    // In a real app, this would activate the drawing tool
    alert(`Selected drawing tool: ${tool.name}`);
  };

  // Skeleton loading component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-96 bg-gray-200 rounded mb-4"></div>
      <div className="h-16 bg-gray-200 rounded"></div>
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
        
        {/* Chart Analysis Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary mb-1">Chart Analysis</h1>
            <p className="text-text-secondary">Analyze market trends and patterns with advanced charting tools.</p>
          </div>
          
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {/* Chart Header */}
              <ChartHeader 
                selectedAsset={selectedAsset}
                setSelectedAsset={setSelectedAsset}
                timeframe={timeframe}
                setTimeframe={setTimeframe}
                chartType={chartType}
                setChartType={setChartType}
              />
              
              {/* Chart Container */}
              <div className="bg-surface border border-border rounded-lg p-4 relative" style={{ height: "600px" }}>
                {/* Chart Toolbox */}
                <ChartToolbox 
                  onAddIndicator={handleAddIndicator}
                  onSelectDrawingTool={handleSelectDrawingTool}
                />
                
                {/* Active Indicators */}
                <ActiveIndicators 
                  activeIndicators={activeIndicators}
                  onRemoveIndicator={handleRemoveIndicator}
                  onEditIndicator={handleEditIndicator}
                />
                
                {/* Chart */}
                <div className="w-full h-full">
                  <ChartContainer 
                    chartType={chartType}
                    data={chartData}
                    activeIndicators={activeIndicators}
                  />
                </div>
              </div>
              
              {/* Timeline Navigator */}
              <TimelineNavigator />
              
              {/* Asset Sidebar */}
              <AssetSidebar 
                asset={selectedAsset}
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
              
              {/* Trading Panel */}
              <TradingPanel asset={selectedAsset} />
            </>
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

export default ChartAnalysisScreen;