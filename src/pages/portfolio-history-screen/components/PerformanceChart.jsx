import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const PerformanceChart = () => {
  const [timeRange, setTimeRange] = useState("week");
  
  const performanceData = {
    day: [
      { time: "00:00", profit: 0 },
      { time: "04:00", profit: 25.50 },
      { time: "08:00", profit: -15.75 },
      { time: "12:00", profit: 45.20 },
      { time: "16:00", profit: 85.40 },
      { time: "20:00", profit: 65.30 },
      { time: "23:59", profit: 85.20 },
    ],
    week: [
      { time: "Mon", profit: 45.20 },
      { time: "Tue", profit: 16.70 },
      { time: "Wed", profit: 84.00 },
      { time: "Thu", profit: 169.40 },
      { time: "Fri", profit: 124.30 },
      { time: "Sat", profit: 156.55 },
      { time: "Sun", profit: 124.35 },
    ],
    month: [
      { time: "Week 1", profit: 124.35 },
      { time: "Week 2", profit: 256.80 },
      { time: "Week 3", profit: 178.50 },
      { time: "Week 4", profit: 345.20 },
    ],
    year: [
      { time: "Jan", profit: 345.20 },
      { time: "Feb", profit: 520.75 },
      { time: "Mar", profit: 420.30 },
      { time: "Apr", profit: 680.45 },
      { time: "May", profit: 540.20 },
      { time: "Jun", profit: 780.60 },
      { time: "Jul", profit: 620.35 },
      { time: "Aug", profit: 840.50 },
      { time: "Sep", profit: 720.25 },
      { time: "Oct", profit: 950.70 },
      { time: "Nov", profit: 850.40 },
      { time: "Dec", profit: 1050.80 },
    ],
  };
  
  const data = performanceData[timeRange];
  
  // Calculate cumulative profit
  const cumulativeData = data.map((item, index) => {
    let cumulativeProfit = 0;
    for (let i = 0; i <= index; i++) {
      cumulativeProfit += data[i].profit;
    }
    return {
      ...item,
      cumulativeProfit,
    };
  });
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-3 border border-border rounded shadow-sm">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-text-secondary">
            Period P&L: <span className={payload[0].value >= 0 ? "text-success" : "text-danger"}>
              {payload[0].value >= 0 ? "+" : ""}${payload[0].value.toFixed(2)}
            </span>
          </p>
          <p className="text-xs text-text-secondary">
            Cumulative P&L: <span className={payload[1].value >= 0 ? "text-success" : "text-danger"}>
              {payload[1].value >= 0 ? "+" : ""}${payload[1].value.toFixed(2)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Performance Chart</h2>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-xs rounded-lg ${
              timeRange === "day" ?"bg-primary text-white" :"bg-gray-100 text-text-secondary hover:bg-gray-200"
            }`}
            onClick={() => setTimeRange("day")}
          >
            Day
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded-lg ${
              timeRange === "week" ?"bg-primary text-white" :"bg-gray-100 text-text-secondary hover:bg-gray-200"
            }`}
            onClick={() => setTimeRange("week")}
          >
            Week
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded-lg ${
              timeRange === "month" ?"bg-primary text-white" :"bg-gray-100 text-text-secondary hover:bg-gray-200"
            }`}
            onClick={() => setTimeRange("month")}
          >
            Month
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded-lg ${
              timeRange === "year" ?"bg-primary text-white" :"bg-gray-100 text-text-secondary hover:bg-gray-200"
            }`}
            onClick={() => setTimeRange("year")}
          >
            Year
          </button>
        </div>
      </div>
      
      <div className="h-64 w-full" aria-label="Performance Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={cumulativeData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="time" axisLine={{ stroke:"#E2E8F0" }} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#475569" }} 
            />
            <YAxis 
              axisLine={{ stroke: "#E2E8F0" }} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#475569" }} 
              tickFormatter={(value) => `$${value}`} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" dataKey="profit" stroke="#10B981" 
              strokeWidth={2} 
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6, strokeWidth: 2 }} 
            />
            <Line 
              type="monotone" dataKey="cumulativeProfit" stroke="#2563EB" 
              strokeWidth={2} 
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6, strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
          <span className="text-sm text-text-secondary">Period P&L</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
          <span className="text-sm text-text-secondary">Cumulative P&L</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;