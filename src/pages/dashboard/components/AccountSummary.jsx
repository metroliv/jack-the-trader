import React from "react";
import Icon from "components/AppIcon";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AccountSummary = () => {
  const accountData = {
    balance: 5842.75,
    openPositions: 1250.50,
    dailyPL: 124.35,
    weeklyPL: -78.20,
  };

  const weeklyData = [
    { day: "Mon", profit: 45.20 },
    { day: "Tue", profit: -28.50 },
    { day: "Wed", profit: 67.30 },
    { day: "Thu", profit: 85.40 },
    { day: "Fri", profit: -45.10 },
    { day: "Sat", profit: 32.25 },
    { day: "Sun", profit: -32.20 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-2 border border-border rounded shadow-sm">
          <p className="text-xs font-medium">{`${payload[0].payload.day}: ${payload[0].value > 0 ? '+' : ''}$${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Account Summary</h2>
        <Link 
          to="/portfolio-history-screen" className="text-primary text-sm font-medium flex items-center"
        >
          <span>Details</span>
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-primary-light bg-opacity-30 rounded-lg">
          <div className="flex items-center mb-1">
            <Icon name="Wallet" size={16} className="text-primary mr-2" />
            <span className="text-xs text-text-secondary">Available Balance</span>
          </div>
          <div className="text-lg font-semibold text-text-primary">${accountData.balance.toFixed(2)}</div>
        </div>
        
        <div className="p-3 bg-primary-light bg-opacity-30 rounded-lg">
          <div className="flex items-center mb-1">
            <Icon name="Briefcase" size={16} className="text-primary mr-2" />
            <span className="text-xs text-text-secondary">Open Positions</span>
          </div>
          <div className="text-lg font-semibold text-text-primary">${accountData.openPositions.toFixed(2)}</div>
        </div>
        
        <div className="p-3 bg-success-light rounded-lg">
          <div className="flex items-center mb-1">
            <Icon name="TrendingUp" size={16} className="text-success mr-2" />
            <span className="text-xs text-text-secondary">Daily P&L</span>
          </div>
          <div className="text-lg font-semibold text-success">+${accountData.dailyPL.toFixed(2)}</div>
        </div>
        
        <div className="p-3 bg-danger-light rounded-lg">
          <div className="flex items-center mb-1">
            <Icon name="TrendingDown" size={16} className="text-danger mr-2" />
            <span className="text-xs text-text-secondary">Weekly P&L</span>
          </div>
          <div className="text-lg font-semibold text-danger">${accountData.weeklyPL.toFixed(2)}</div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-text-secondary">Weekly Performance</h3>
        </div>
        <div className="h-40 w-full" aria-label="Weekly Performance Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10 }} 
              />
              <YAxis hide={true} />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="profit" fill={(entry) => (entry.profit >= 0 ?"#10B981" : "#EF4444")} 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <Link 
          to="/trading-interface" className="flex-1 mr-2 flex items-center justify-center bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-lg transition-colors"
        >
          <Icon name="TrendingUp" size={16} className="mr-2" />
          <span>Trade Now</span>
        </Link>
        <Link 
          to="/portfolio-history-screen" className="flex-1 ml-2 flex items-center justify-center border border-primary text-primary hover:bg-primary-light py-2 px-4 rounded-lg transition-colors"
        >
          <Icon name="PieChart" size={16} className="mr-2" />
          <span>Portfolio</span>
        </Link>
      </div>
    </div>
  );
};

export default AccountSummary;