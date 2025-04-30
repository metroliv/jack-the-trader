import React, { useState } from "react";
import Icon from "components/AppIcon";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const TradeHistory = () => {
  const [dateRange, setDateRange] = useState("all");
  const [assetFilter, setAssetFilter] = useState("all");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const tradeHistory = [
    {
      id: 1,
      asset: "EUR/USD",
      type: "Rise",
      entryPrice: 1.0865,
      exitPrice: 1.0890,
      stake: 100,
      payout: 185.20,
      profit: 85.20,
      outcome: "win",
      date: "2023-06-10T10:45:00",
    },
    {
      id: 2,
      asset: "Gold",
      type: "Fall",
      entryPrice: 2040.25,
      exitPrice: 2032.45,
      stake: 75,
      payout: 138.75,
      profit: 63.75,
      outcome: "win",
      date: "2023-06-10T09:30:00",
    },
    {
      id: 3,
      asset: "BTC/USD",
      type: "Rise",
      entryPrice: 42150.25,
      exitPrice: 42050.75,
      stake: 150,
      payout: 0,
      profit: -150,
      outcome: "loss",
      date: "2023-06-09T14:15:00",
    },
    {
      id: 4,
      asset: "GBP/JPY",
      type: "Fall",
      entryPrice: 186.75,
      exitPrice: 187.20,
      stake: 50,
      payout: 0,
      profit: -50,
      outcome: "loss",
      date: "2023-06-09T11:30:00",
    },
    {
      id: 5,
      asset: "NASDAQ",
      type: "Rise",
      entryPrice: 15000.50,
      exitPrice: 15045.75,
      stake: 200,
      payout: 370.00,
      profit: 170.00,
      outcome: "win",
      date: "2023-06-08T16:45:00",
    },
    {
      id: 6,
      asset: "EUR/USD",
      type: "Fall",
      entryPrice: 1.0890,
      exitPrice: 1.0875,
      stake: 100,
      payout: 185.00,
      profit: 85.00,
      outcome: "win",
      date: "2023-06-08T13:20:00",
    },
    {
      id: 7,
      asset: "Apple Inc.",
      type: "Rise",
      entryPrice: 185.50,
      exitPrice: 184.75,
      stake: 125,
      payout: 0,
      profit: -125,
      outcome: "loss",
      date: "2023-06-07T15:30:00",
    },
  ];
  
  // Filter trades based on selected filters
  const filteredTrades = tradeHistory.filter(trade => {
    // Date filter
    if (dateRange === "today") {
      const today = new Date().toISOString().split("T")[0];
      if (!trade.date.startsWith(today)) return false;
    } else if (dateRange === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      if (new Date(trade.date) < weekAgo) return false;
    } else if (dateRange === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      if (new Date(trade.date) < monthAgo) return false;
    }
    
    // Asset filter
    if (assetFilter !== "all" && trade.asset !== assetFilter) return false;
    
    // Outcome filter
    if (outcomeFilter !== "all" && trade.outcome !== outcomeFilter) return false;
    
    // Search query
    if (searchQuery && !trade.asset.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  // Calculate statistics
  const totalTrades = filteredTrades.length;
  const winTrades = filteredTrades.filter(trade => trade.outcome === "win").length;
  const lossTrades = filteredTrades.filter(trade => trade.outcome === "loss").length;
  const winRate = totalTrades > 0 ? (winTrades / totalTrades * 100).toFixed(1) : 0;
  
  const totalProfit = filteredTrades.reduce((sum, trade) => sum + trade.profit, 0);
  const totalStake = filteredTrades.reduce((sum, trade) => sum + trade.stake, 0);
  const roi = totalStake > 0 ? (totalProfit / totalStake * 100).toFixed(1) : 0;
  
  // Prepare data for pie chart
  const outcomeData = [
    { name: "Win", value: winTrades, color: "#10B981" },
    { name: "Loss", value: lossTrades, color: "#EF4444" },
  ];
  
  // Group by asset for asset breakdown
  const assetBreakdown = {};
  filteredTrades.forEach(trade => {
    if (!assetBreakdown[trade.asset]) {
      assetBreakdown[trade.asset] = {
        total: 0,
        win: 0,
        loss: 0,
        profit: 0,
      };
    }
    
    assetBreakdown[trade.asset].total += 1;
    assetBreakdown[trade.asset][trade.outcome] += 1;
    assetBreakdown[trade.asset].profit += trade.profit;
  });
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      {/* Filters */}
      <div className="bg-surface rounded-lg shadow-sm border border-border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Date Range</label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border border-border rounded-lg text-text-primary text-sm p-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Asset</label>
            <select 
              value={assetFilter}
              onChange={(e) => setAssetFilter(e.target.value)}
              className="w-full border border-border rounded-lg text-text-primary text-sm p-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Assets</option>
              <option value="EUR/USD">EUR/USD</option>
              <option value="Gold">Gold</option>
              <option value="BTC/USD">BTC/USD</option>
              <option value="GBP/JPY">GBP/JPY</option>
              <option value="NASDAQ">NASDAQ</option>
              <option value="Apple Inc.">Apple Inc.</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Outcome</label>
            <select 
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="w-full border border-border rounded-lg text-text-primary text-sm p-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Outcomes</option>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon name="Search" size={16} className="text-text-tertiary" />
              </div>
              <input 
                type="text" placeholder="Search assets..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-border rounded-lg text-text-primary text-sm pl-10 p-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
          <h3 className="text-sm font-medium text-text-secondary mb-3">Performance Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-text-tertiary text-xs mb-1">Total Trades</p>
              <p className="text-text-primary text-xl font-semibold">{totalTrades}</p>
            </div>
            <div>
              <p className="text-text-tertiary text-xs mb-1">Win Rate</p>
              <p className="text-text-primary text-xl font-semibold">{winRate}%</p>
            </div>
            <div>
              <p className="text-text-tertiary text-xs mb-1">Total Profit/Loss</p>
              <p className={`text-xl font-semibold ${totalProfit >= 0 ? "text-success" : "text-danger"}`}>
                {totalProfit >= 0 ? "+" : ""}${totalProfit.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-text-tertiary text-xs mb-1">ROI</p>
              <p className={`text-xl font-semibold ${parseFloat(roi) >= 0 ? "text-success" : "text-danger"}`}>
                {parseFloat(roi) >= 0 ? "+" : ""}{roi}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
          <h3 className="text-sm font-medium text-text-secondary mb-3">Outcome Distribution</h3>
          <div className="flex items-center h-40">
            {totalTrades > 0 ? (
              <React.Fragment>
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={outcomeData}
                        cx="50%" cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {outcomeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
                    <span className="text-sm text-text-secondary">Win: {winTrades} ({winRate}%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-danger mr-2"></div>
                    <span className="text-sm text-text-secondary">Loss: {lossTrades} ({(100 - parseFloat(winRate)).toFixed(1)}%)</span>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <div className="w-full flex items-center justify-center">
                <p className="text-text-tertiary">No data available</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
          <h3 className="text-sm font-medium text-text-secondary mb-3">Asset Breakdown</h3>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {Object.keys(assetBreakdown).length > 0 ? (
              Object.entries(assetBreakdown).map(([asset, data]) => (
                <div key={asset} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center mr-2">
                      <Icon 
                        name={
                          asset.includes("USD") || asset.includes("GBP") || asset.includes("EUR") ? "RefreshCw" : asset.includes("Gold") ? "Diamond" : asset.includes("BTC") ? "Bitcoin" : asset.includes("NASDAQ") || asset.includes("Apple") ? "TrendingUp" : "BarChart2"
                        } 
                        size={16} 
                        className="text-primary" 
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{asset}</p>
                      <p className="text-xs text-text-tertiary">
                        {data.win} win, {data.loss} loss
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${data.profit >= 0 ? "text-success" : "text-danger"}`}>
                      {data.profit >= 0 ? "+" : ""}${data.profit.toFixed(2)}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {((data.win / data.total) * 100).toFixed(0)}% win rate
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-32">
                <p className="text-text-tertiary">No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Trade History Table */}
      {filteredTrades.length === 0 ? (
        <div className="bg-surface rounded-lg shadow-sm border border-border p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No trades found</h3>
          <p className="text-text-secondary">Try adjusting your filters to see more results.</p>
        </div>
      ) : (
        <div className="bg-surface rounded-lg shadow-sm border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-text-secondary text-sm border-b border-border">
                <th className="p-4 font-medium">Date & Time</th>
                <th className="p-4 font-medium">Asset</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Entry Price</th>
                <th className="p-4 font-medium">Exit Price</th>
                <th className="p-4 font-medium">Stake</th>
                <th className="p-4 font-medium">Payout</th>
                <th className="p-4 font-medium">Profit/Loss</th>
                <th className="p-4 font-medium">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade) => (
                <tr key={trade.id} className="border-b border-border hover:bg-gray-50">
                  <td className="p-4">
                    <span className="text-text-secondary">{formatDate(trade.date)}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center mr-2">
                        <Icon 
                          name={
                            trade.asset.includes("USD") || trade.asset.includes("GBP") || trade.asset.includes("EUR") ? "RefreshCw" : trade.asset.includes("Gold") ? "Diamond" : trade.asset.includes("BTC") ? "Bitcoin" : trade.asset.includes("NASDAQ") || trade.asset.includes("Apple") ? "TrendingUp" : "BarChart2"
                          } 
                          size={16} 
                          className="text-primary" 
                        />
                      </div>
                      <span className="font-medium">{trade.asset}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trade.type === "Rise" ? "bg-success-light text-success" : "bg-danger-light text-danger"
                    }`}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono">{trade.entryPrice.toFixed(
                      trade.asset.includes("BTC") ? 2 : trade.asset.includes("Gold") ? 2 : 4
                    )}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono">{trade.exitPrice.toFixed(
                      trade.asset.includes("BTC") ? 2 : trade.asset.includes("Gold") ? 2 : 4
                    )}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">${trade.stake.toFixed(2)}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">${trade.payout.toFixed(2)}</span>
                  </td>
                  <td className="p-4">
                    <span className={`font-medium ${
                      trade.profit >= 0 ? "text-success" : "text-danger"
                    }`}>
                      {trade.profit >= 0 ? "+" : ""}${trade.profit.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trade.outcome === "win" ? "bg-success-light text-success" : "bg-danger-light text-danger"
                    }`}>
                      {trade.outcome === "win" ? "Win" : "Loss"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="p-4 border-t border-border flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {filteredTrades.length} of {tradeHistory.length} trades
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-border rounded-lg text-text-secondary hover:text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed">
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button className="p-2 border border-border rounded-lg text-text-secondary hover:text-primary hover:border-primary">
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeHistory;