import React, { useEffect, useRef, useState, useCallback } from "react";
import { createChart } from 'lightweight-charts';

const ChartContainer = ({ chartType, data, activeIndicators }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const isDisposed = useRef(false);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  
  // Track if component is mounted
  const isMounted = useRef(true);
  
  // Effect to get container dimensions once mounted
  useEffect(() => {
    if (chartContainerRef.current) {
      const { clientWidth, clientHeight } = chartContainerRef.current;
      setContainerDimensions({
        width: clientWidth || 800, // Fallback width
        height: clientHeight || 500, // Fallback height
      });
    }
    
    // Cleanup function for component unmount
    return () => {
      isMounted.current = false;
      isDisposed.current = true;
    };
  }, []);
  
  // Safe chart operation helper
  const safeChartOperation = useCallback((operation) => {
    try {
      if (chartRef.current && !isDisposed.current) {
        return operation();
      }
    } catch (error) {
      console.error('Chart operation error:', error);
      // If we get an 'Object is disposed' error, mark the chart as disposed
      if (error.message && error.message.includes('disposed')) {
        isDisposed.current = true;
        chartRef.current = null;
        seriesRef.current = null;
      }
    }
    return null;
  }, []);
  
  // Memoized function to create chart series
  const createSeries = useCallback((chart, type, uniqueData) => {
    if (!chart || isDisposed.current) return null;
    
    try {
      let series;
      if (type === 'candlestick') {
        series = chart.addCandlestickSeries({
          upColor: '#10B981',
          downColor: '#EF4444',
          borderVisible: false,
          wickUpColor: '#10B981',
          wickDownColor: '#EF4444',
        });
      } else if (type === 'line') {
        series = chart.addLineSeries({
          color: '#2563EB',
          lineWidth: 2,
        });
      } else if (type === 'area') {
        series = chart.addAreaSeries({
          topColor: 'rgba(37, 99, 235, 0.3)',
          bottomColor: 'rgba(37, 99, 235, 0.0)',
          lineColor: '#2563EB',
          lineWidth: 2,
        });
      }
      
      // Set data safely
      if (series && uniqueData && uniqueData.length > 0) {
        try {
          series.setData(uniqueData);
          // Store series reference
          seriesRef.current = series;
          return series;
        } catch (error) {
          console.error('Error setting chart data:', error);
          return null;
        }
      }
      
      return series;
    } catch (error) {
      console.error('Error creating chart series:', error);
      return null;
    }
  }, []);
  
  // Chart initialization and data handling effect
  useEffect(() => {
    // Safety check for component mounted state
    if (!isMounted.current) return;
    
    // Safety check for container and dimensions
    if (!chartContainerRef.current || containerDimensions.width === 0 || containerDimensions.height === 0) {
      console.log('Container not ready or dimensions not set yet');
      return;
    }
    
    // Validate data is available and properly formatted
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log('Chart data is not available or empty:', data);
      return;
    }
    
    // Clean up function definition (to be used both in cleanup and before creating new chart)
    const cleanupChart = () => {
      if (chartRef.current && !isDisposed.current) {
        try {
          // Only call remove if chart exists and isn't already disposed
          chartRef.current.remove();
          chartRef.current = null;
          seriesRef.current = null;
        } catch (error) {
          console.error('Error removing chart:', error);
          // If we get an 'Object is disposed' error, just clear our references
          chartRef.current = null;
          seriesRef.current = null;
        }
      }
    };
    
    // Reset the disposed flag since we're creating a new chart
    isDisposed.current = false;
    
    // Ensure data is sorted by time
    const sortedData = [...data].sort((a, b) => a.time - b.time);
    
    // Check for duplicate times and remove them
    const uniqueData = sortedData.filter((item, index, self) => 
      index === 0 || item.time !== self[index - 1].time
    );
    
    // Log data preparation for debugging
    console.log(`Preparing chart with ${uniqueData.length} data points (original: ${data.length})`);
    
    try {
      // Clean up previous chart if it exists
      cleanupChart();
      
      // Create new chart with explicit dimensions
      const chart = createChart(chartContainerRef.current, {
        width: containerDimensions.width,
        height: containerDimensions.height,
        layout: {
          background: { color: '#ffffff' },
          textColor: '#333',
        },
        grid: {
          vertLines: { color: '#f0f3fa' },
          horzLines: { color: '#f0f3fa' },
        },
        timeScale: {
          borderColor: '#e2e8f0',
          timeVisible: true,
        },
        crosshair: {
          mode: 0,
        },
      });
      
      // Save chart reference immediately
      chartRef.current = chart;
      
      // Add series based on chart type
      const series = createSeries(chart, chartType, uniqueData);
      
      // Add indicators if series was created successfully
      if (series && activeIndicators && activeIndicators.length > 0 && !isDisposed.current) {
        safeChartOperation(() => {
          activeIndicators.forEach(indicator => {
            if (indicator.id === 'ma') {
              try {
                const maSeries = chart.addLineSeries({
                  color: '#F59E0B',
                  lineWidth: 1,
                  priceLineVisible: false,
                });
                
                // Simple mock MA calculation
                const maData = uniqueData.map((item, index, arr) => {
                  if (index < 20) return null;
                  
                  const sum = arr.slice(index - 20, index)
                    .reduce((acc, val) => acc + (chartType === 'candlestick' ? val.close : val.value), 0);
                  
                  return {
                    time: item.time,
                    value: sum / 20,
                  };
                }).filter(Boolean); // Remove null entries
                
                if (maData.length > 0 && !isDisposed.current) {
                  maSeries.setData(maData);
                }
              } catch (error) {
                console.error('Error adding indicator:', error);
              }
            }
            
            // Add other indicators similarly
          });
        });
      }
      
      // Fit content safely
      safeChartOperation(() => {
        chart.timeScale().fitContent();
      });
      
      // Handle resize
      const handleResize = () => {
        safeChartOperation(() => {
          if (chartContainerRef.current) {
            const { clientWidth, clientHeight } = chartContainerRef.current;
            if (clientWidth > 0 && clientHeight > 0) {
              chart.applyOptions({
                width: clientWidth,
                height: clientHeight,
              });
            }
          }
        });
      };
      
      window.addEventListener('resize', handleResize);
      
      // Return cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        cleanupChart();
      };
    } catch (error) {
      console.error('Error creating chart:', error);
      isDisposed.current = true;
    }
  }, [chartType, data, activeIndicators, containerDimensions, createSeries, safeChartOperation]);

  return (
    <div ref={chartContainerRef} className="w-full h-full" style={{ minHeight: '400px' }} data-testid="chart-container" />
  );
};

export default ChartContainer;