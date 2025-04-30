import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "components/AppIcon";

// Import components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MarketOverview from "./components/MarketOverview";
import Watchlist from "./components/Watchlist";
import AccountSummary from "./components/AccountSummary";
import RecentActivity from "./components/RecentActivity";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Simulate loading state and check if token is present
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    // Check for token in localStorage or sessionStorage
    const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login-screen"); // Redirect to login if no token
    }

    return () => clearTimeout(timer);
  }, [navigate]);

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
        
        {/* Dashboard Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary mb-1">Dashboard</h1>
            <p className="text-text-secondary">Welcome back, Alex. Here's your trading overview.</p>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Link 
              to="/trading-interface" className="bg-surface rounded-lg shadow-sm border border-border p-4 flex items-center hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
                <Icon name="TrendingUp" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-primary">New Trade</h3>
                <p className="text-xs text-text-tertiary">Place a new position</p>
              </div>
            </Link>
            
            <Link 
              to="/asset-selection-screen" className="bg-surface rounded-lg shadow-sm border border-border p-4 flex items-center hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
                <Icon name="Search" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-primary">Explore Markets</h3>
                <p className="text-xs text-text-tertiary">Discover trading assets</p>
              </div>
            </Link>
            
            <Link 
              to="/chart-analysis-screen" className="bg-surface rounded-lg shadow-sm border border-border p-4 flex items-center hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
                <Icon name="BarChart2" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-primary">Chart Analysis</h3>
                <p className="text-xs text-text-tertiary">Technical indicators</p>
              </div>
            </Link>
            
            <Link 
              to="/portfolio-history-screen" className="bg-surface rounded-lg shadow-sm border border-border p-4 flex items-center hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
                <Icon name="PieChart" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-primary">Portfolio</h3>
                <p className="text-xs text-text-tertiary">View your positions</p>
              </div>
            </Link>
          </div>
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Market Overview */}
            <div className="col-span-12 lg:col-span-4">
              {isLoading ? <SkeletonLoader /> : <MarketOverview />}
            </div>
            
            {/* Watchlist */}
            <div className="col-span-12 lg:col-span-8">
              {isLoading ? <SkeletonLoader /> : <Watchlist />}
            </div>
            
            {/* Account Summary */}
            <div className="col-span-12 lg:col-span-6">
              {isLoading ? <SkeletonLoader /> : <AccountSummary />}
            </div>
            
            {/* Recent Activity */}
            <div className="col-span-12 lg:col-span-6">
              {isLoading ? <SkeletonLoader /> : <RecentActivity />}
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

export default Dashboard;
