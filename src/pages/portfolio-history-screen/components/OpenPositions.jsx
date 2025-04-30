import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";
import { Link } from "react-router-dom";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const OpenPositions = () => {
  const [positions, setPositions] = useState([
    {
      id: 1,
      asset: "EUR/USD",
      type: "Rise",
      entryPrice: 1.0875,
      currentPrice: 1.0892,
      stake: 100,
      payout: 185.20,
      profit: 85.20,
      expiry: new Date(Date.now() + 3600000), // 1 hour from now
      chartData: [
        { value: 1.0870 },
        { value: 1.0872 },
        { value: 1.0878 },
        { value: 1.0876 },
        { value: 1.0880 },
        { value: 1.0885 },
        { value: 1.0892 },
      ],
      isUpdating: false,
    },
    {
      id: 2,
      asset: "Gold",
      type: "Fall",
      entryPrice: 2035.75,
      currentPrice: 2032.45,
      stake: 75,
      payout: 138.75,
      profit: 63.75,
      expiry: new Date(Date.now() + 7200000), // 2 hours from now
      chartData: [
        { value: 2035.75 },
        { value: 2034.50 },
        { value: 2033.80 },
        { value: 2034.20 },
        { value: 2033.10 },
        { value: 2032.70 },
        { value: 2032.45 },
      ],
      isUpdating: false,
    },
    {
      id: 3,
      asset: "BTC/USD",
      type: "Rise",
      entryPrice: 42150.25,
      currentPrice: 42356.78,
      stake: 150,
      payout: 277.50,
      profit: 127.50,
      expiry: new Date(Date.now() + 10800000), // 3 hours from now
      chartData: [
        { value: 42150.25 },
        { value: 42180.50 },
        { value: 42210.75 },
        { value: 42250.30 },
        { value: 42290.45 },
        { value: 42320.60 },
        { value: 42356.78 },
      ],
      isUpdating: false,
    },
  ]);

  // Simulate WebSocket price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPositionIndex = Math.floor(Math.random() * positions.length);
      const randomPriceChange = (Math.random() * 0.1).toFixed(4);
      const isPositive = Math.random() > 0.5;
      
      setPositions(prevPositions => {
        const newPositions = [...prevPositions];
        const position = {...newPositions[randomPositionIndex]};
        
        // Calculate new price
        const currentPrice = position.currentPrice;
        const change = isPositive ? parseFloat(randomPriceChange) : -parseFloat(randomPriceChange);
        const newPrice = parseFloat((currentPrice + change).toFixed(
          position.asset.includes("BTC") ? 2 : position.asset.includes("Gold") ? 2 : 4
        ));
        
        // Update chart data
        const newChartData = [...position.chartData.slice(1), { value: newPrice }];
        
        // Calculate new profit
        let newProfit;
        if (position.type === "Rise") {
          newProfit = position.stake * ((newPrice - position.entryPrice) / position.entryPrice) * 1.85;
        } else {
          newProfit = position.stake * ((position.entryPrice - newPrice) / position.entryPrice) * 1.85;
        }
        
        position.currentPrice = newPrice;
        position.chartData = newChartData;
        position.profit = parseFloat(newProfit.toFixed(2));
        position.payout = parseFloat((position.stake + position.profit).toFixed(2));
        position.isUpdating = true;
        
        newPositions[randomPositionIndex] = position;
        return newPositions;
      });
      
      // Remove updating animation after a short delay
      setTimeout(() => {
        setPositions(prevPositions => {
          return prevPositions.map(position => {
            if (position.isUpdating) {
              return { ...position, isUpdating: false };
            }
            return position;
          });
        });
      }, 1000);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [positions]);

  // Calculate time remaining
  const getTimeRemaining = (expiry) => {
    const total = expiry - Date.now();
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div>
      {positions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
            <Icon name="Briefcase" size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No Open Positions</h3>
          <p className="text-text-secondary mb-6">You don't have any active trades at the moment.</p>
          <Link 
            to="/trading-interface" className="flex items-center bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Icon name="TrendingUp" size={16} className="mr-2" />
            <span>Start Trading</span>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-text-secondary text-sm border-b border-border">
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Entry Price</th>
                <th className="pb-3 font-medium">Current</th>
                <th className="pb-3 font-medium">Chart</th>
                <th className="pb-3 font-medium">Stake</th>
                <th className="pb-3 font-medium">Payout</th>
                <th className="pb-3 font-medium">Profit/Loss</th>
                <th className="pb-3 font-medium">Expires</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr 
                  key={position.id} 
                  className={`border-b border-border hover:bg-gray-50 ${
                    position.isUpdating ? 'bg-primary-light bg-opacity-50' : ''
                  }`}
                >
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center mr-2">
                        <Icon 
                          name={
                            position.asset === "EUR/USD" ? "RefreshCw" : position.asset ==="Gold" ? "Diamond" : "Bitcoin"
                          } 
                          size={16} 
                          className="text-primary" 
                        />
                      </div>
                      <span className="font-medium">{position.asset}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      position.type === "Rise" ? "bg-success-light text-success" : "bg-danger-light text-danger"
                    }`}>
                      {position.type}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-mono">{position.entryPrice.toFixed(
                      position.asset.includes("BTC") ? 2 : position.asset.includes("Gold") ? 2 : 4
                    )}</span>
                  </td>
                  <td className={`py-4 font-mono ${position.isUpdating ? 'animate-pulse' : ''}`}>
                    {position.currentPrice.toFixed(
                      position.asset.includes("BTC") ? 2 : position.asset.includes("Gold") ? 2 : 4
                    )}
                  </td>
                  <td className="py-4">
                    <div className="w-24 h-12">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={position.chartData}>
                          <defs>
                            <linearGradient id={`gradient-${position.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop 
                                offset="5%" stopColor={position.profit >= 0 ?"#10B981" : "#EF4444"} 
                                stopOpacity={0.8}
                              />
                              <stop 
                                offset="95%" stopColor={position.profit >= 0 ?"#10B981" : "#EF4444"} 
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" dataKey="value" stroke={position.profit >= 0 ?"#10B981" : "#EF4444"} 
                            fillOpacity={1} 
                            fill={`url(#gradient-${position.id})`} 
                            isAnimationActive={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="font-medium">${position.stake.toFixed(2)}</span>
                  </td>
                  <td className="py-4">
                    <span className="font-medium">${position.payout.toFixed(2)}</span>
                  </td>
                  <td className="py-4">
                    <span className={`font-medium ${
                      position.profit >= 0 ? "text-success" : "text-danger"
                    }`}>
                      {position.profit >= 0 ? "+" : ""}${position.profit.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <Icon name="Clock" size={14} className="text-text-tertiary mr-1" />
                      <span className="text-text-secondary">{getTimeRemaining(position.expiry)}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <button className="text-danger hover:text-danger-hover">
                      <Icon name="X" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OpenPositions;