import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const PriceChart = ({ selectedAsset }) => {
  const [timeframe, setTimeframe] = useState("1h");
  const [showIndicators, setShowIndicators] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const timeframes = [
    { id: "5m", label: "5m" },
    { id: "15m", label: "15m" },
    { id: "1h", label: "1H" },
    { id: "4h", label: "4H" },
    { id: "1d", label: "1D" },
    { id: "1w", label: "1W" },
  ];
  
  // Generate mock chart data based on selected asset and timeframe
  useEffect(() => {
    if (!selectedAsset) return;
    
    setIsLoading(true);
    
    // Generate random price data
    const generateChartData = () => {
      const basePrice = parseFloat(selectedAsset.price.replace(",", ""));
      const volatility = 0.002; // 0.2% price movement
      const points = timeframe === "5m" ? 60 : timeframe ==="15m"? 60 : timeframe ==="1h"? 60 : timeframe ==="4h"? 48 : timeframe ==="1d" ? 24 : 14;
      
      let lastPrice = basePrice;
      const data = [];
      
      for (let i = 0; i < points; i++) {
        const change = lastPrice * volatility * (Math.random() * 2 - 1);
        lastPrice = lastPrice + change;
        
        const timestamp = new Date();
        timestamp.setMinutes(timestamp.getMinutes() - (points - i) * 
          (timeframe === "5m" ? 5 : timeframe ==="15m"? 15 : timeframe ==="1h"? 60 : timeframe ==="4h"? 240 : timeframe ==="1d" ? 1440 : 10080));
        
        data.push({
          time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: lastPrice,
          sma: null,
          ema: null,
        });
      }
      
      // Calculate SMA (Simple Moving Average)
      const smaPeriod = 14;
      for (let i = smaPeriod - 1; i < data.length; i++) {
        let sum = 0;
        for (let j = 0; j < smaPeriod; j++) {
          sum += data[i - j].price;
        }
        data[i].sma = sum / smaPeriod;
      }
      
      // Calculate EMA (Exponential Moving Average)
      const emaPeriod = 8;
      const multiplier = 2 / (emaPeriod + 1);
      let ema = data[0].price;
      
      for (let i = 0; i < data.length; i++) {
        ema = (data[i].price - ema) * multiplier + ema;
        data[i].ema = ema;
      }
      
      return data;
    };
    
    // Simulate WebSocket data loading
    setTimeout(() => {
      setChartData(generateChartData());
      setIsLoading(false);
      
      // Simulate real-time updates
      const interval = setInterval(() => {
        setChartData(prevData => {
          const newData = [...prevData];
          const lastPoint = newData[newData.length - 1];
          const change = lastPoint.price * 0.0005 * (Math.random() * 2 - 1);
          const newPrice = lastPoint.price + change;
          
          newData[newData.length - 1] = {
            ...lastPoint,
            price: newPrice,
          };
          
          return newData;
        });
      }, 2000);
      
      return () => clearInterval(interval);
    }, 1000);
  }, [selectedAsset, timeframe]);
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-2 border border-border rounded shadow-sm">
          <p className="text-xs font-medium text-text-primary">{`Time: ${payload[0].payload.time}`}</p>
          <p className="text-xs font-medium text-primary">{`Price: ${payload[0].value.toFixed(4)}`}</p>
          {showIndicators && payload[0].payload.sma && (
            <p className="text-xs font-medium text-success">{`SMA: ${payload[0].payload.sma.toFixed(4)}`}</p>
          )}
          {showIndicators && payload[0].payload.ema && (
            <p className="text-xs font-medium text-warning">{`EMA: ${payload[0].payload.ema.toFixed(4)}`}</p>
          )}
        </div>
      );
    }
    return null;
  };
  
  // Calculate current price and price change
  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0;
  const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].price : 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice ? (priceChange / previousPrice) * 100 : 0;
  
  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <div>
          {selectedAsset ? (
            <div>
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-text-primary">{selectedAsset.name}</h2>
                <span className={`ml-2 text-sm ${priceChange >= 0 ? "text-success" : "text-danger"}`}>
                  {priceChange >= 0 ? "+" : ""}{priceChangePercent.toFixed(2)}%
                </span>
              </div>
              <p className="text-2xl font-semibold text-text-primary">
                {currentPrice.toFixed(4)}
                <span className={`ml-2 text-sm ${priceChange >= 0 ? "text-success" : "text-danger"}`}>
                  {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(4)}
                </span>
              </p>
            </div>
          ) : (
            <h2 className="text-lg font-semibold text-text-primary">Select an asset to view chart</h2>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className={`p-2 rounded-lg ${showIndicators ? "bg-primary-light text-primary" : "text-text-secondary hover:bg-gray-50"}`}
            onClick={() => setShowIndicators(!showIndicators)}
            title="Technical Indicators"
          >
            <Icon name="LineChart" size={18} />
          </button>
          <button className="p-2 rounded-lg text-text-secondary hover:bg-gray-50" title="Full Screen">
            <Icon name="Maximize" size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex border-b border-border overflow-x-auto">
        {timeframes.map((tf) => (
          <button
            key={tf.id}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === tf.id 
                ? "text-primary border-b-2 border-primary" :"text-text-secondary hover:text-text-primary"
            }`}
            onClick={() => setTimeframe(tf.id)}
          >
            {tf.label}
          </button>
        ))}
      </div>
      
      <div className="flex-1 p-4">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : selectedAsset ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="time" axisLine={{ stroke:"#E2E8F0" }} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: "#475569" }} 
              />
              <YAxis 
                domain={['auto', 'auto']} 
                axisLine={{ stroke: "#E2E8F0" }} 
                tickLine={false}
                tick={{ fontSize: 10, fill: "#475569" }}
                width={60}
                tickFormatter={(value) => value.toFixed(4)}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={currentPrice} stroke="#2563EB" strokeDasharray="3 3" />
              <Line 
                type="monotone" dataKey="price" stroke="#2563EB" 
                strokeWidth={2} 
                dot={false} 
                activeDot={{ r: 6 }} 
                isAnimationActive={false}
              />
              {showIndicators && (
                <>
                  <Line 
                    type="monotone" dataKey="sma" stroke="#10B981" 
                    strokeWidth={1.5} 
                    dot={false} 
                    isAnimationActive={false}
                  />
                  <Line 
                    type="monotone" dataKey="ema" stroke="#F59E0B" 
                    strokeWidth={1.5} 
                    dot={false} 
                    isAnimationActive={false}
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-text-tertiary">
            <Icon name="BarChart2" size={48} className="mb-4" />
            <p className="text-lg">Select an asset to view chart</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChart;