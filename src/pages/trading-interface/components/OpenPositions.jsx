import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";

const OpenPositions = ({ positions, onPositionClose }) => {
  const [timeLeft, setTimeLeft] = useState({});
  
  // Update time left for each position
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      
      const updatedTimeLeft = {};
      positions.forEach(position => {
        const expiryTime = new Date(position.expiryTime);
        const diff = expiryTime - now;
        
        if (diff > 0) {
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          updatedTimeLeft[position.id] = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
          updatedTimeLeft[position.id] = "Expired";
          
          // Auto-close expired positions
          if (!position.closed) {
            onPositionClose(position.id);
          }
        }
      });
      
      setTimeLeft(updatedTimeLeft);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [positions, onPositionClose]);
  
  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h2 className="text-lg font-semibold text-text-primary">Open Positions</h2>
        <span className="bg-primary-light text-primary text-sm font-medium px-2 py-1 rounded-full">
          {positions.filter(p => !p.closed).length} Active
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {positions.length > 0 ? (
          <div className="p-2">
            {positions.map((position) => (
              <div 
                key={position.id} 
                className={`p-3 border rounded-lg mb-2 ${
                  position.closed 
                    ? "border-border opacity-70" : position.direction ==="rise" ?"border-success" :"border-danger"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                      position.direction === "rise" ?"bg-success-light" :"bg-danger-light"
                    }`}>
                      <Icon 
                        name={position.direction === "rise" ? "TrendingUp" : "TrendingDown"} 
                        size={16} 
                        className={position.direction === "rise" ? "text-success" : "text-danger"} 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary">{position.asset.name}</h3>
                      <p className="text-xs text-text-tertiary">
                        {position.contractType === "rise_fall"? "Rise/Fall" : position.contractType ==="higher_lower" ? "Higher/Lower" : "Touch/No Touch"}
                      </p>
                    </div>
                  </div>
                  {!position.closed && (
                    <button 
                      className="text-text-tertiary hover:text-danger"
                      onClick={() => onPositionClose(position.id)}
                    >
                      <Icon name="X" size={16} />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                    <p className="text-text-tertiary">Stake</p>
                    <p className="font-medium text-text-primary">${position.stake}</p>
                  </div>
                  <div>
                    <p className="text-text-tertiary">Potential Payout</p>
                    <p className="font-medium text-text-primary">${position.potentialPayout.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Icon name="Clock" size={14} className="text-text-tertiary mr-1" />
                    <span className={`text-xs font-medium ${
                      position.closed 
                        ? "text-text-tertiary" : timeLeft[position.id] ==="Expired" ?"text-danger" :"text-text-secondary"
                    }`}>
                      {position.closed ? "Closed" : timeLeft[position.id] || "Loading..."}
                    </span>
                  </div>
                  
                  {position.closed && (
                    <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      position.outcome === "win" ?"bg-success-light text-success" :"bg-danger-light text-danger"
                    }`}>
                      {position.outcome === "win" ? `+$${position.profit.toFixed(2)}` : `-$${position.stake}`}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-text-tertiary">
            <Icon name="Briefcase" size={48} className="mb-4" />
            <p className="text-center">No open positions</p>
            <p className="text-center text-xs mt-2">Your active trades will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenPositions;