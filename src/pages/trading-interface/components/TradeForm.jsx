import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";

const TradeForm = ({ selectedAsset, onPlaceTrade }) => {
  const [contractType, setContractType] = useState("rise_fall");
  const [direction, setDirection] = useState("rise");
  const [duration, setDuration] = useState("1m");
  const [customDuration, setCustomDuration] = useState("");
  const [stake, setStake] = useState(10);
  const [payout, setPayout] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const contractTypes = [
    { id: "rise_fall", name: "Rise/Fall", description: "Predict if the market will rise or fall from its current price" },
    { id: "higher_lower", name: "Higher/Lower", description: "Predict if the market will end higher or lower than a target price" },
    { id: "touch_no_touch", name: "Touch/No Touch", description: "Predict if the market will touch or not touch a target price" },
  ];
  
  const durationOptions = [
    { id: "1m", label: "1 Min" },
    { id: "5m", label: "5 Min" },
    { id: "15m", label: "15 Min" },
    { id: "30m", label: "30 Min" },
    { id: "1h", label: "1 Hour" },
    { id: "custom", label: "Custom" },
  ];
  
  const stakeOptions = [5, 10, 25, 50, 100, 500];
  
  // Calculate payout based on stake and a random payout factor
  useEffect(() => {
    if (!selectedAsset) return;
    
    const payoutFactor = 0.8 + Math.random() * 0.2; // Between 80% and 100% payout
    const calculatedPayout = stake * (1 + payoutFactor);
    setPayout(calculatedPayout);
  }, [selectedAsset, stake, contractType, duration]);
  
  const handleStakeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setStake(value);
    }
  };
  
  const handleCustomDurationChange = (e) => {
    setCustomDuration(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };
  
  const confirmTrade = () => {
    onPlaceTrade({
      asset: selectedAsset,
      contractType,
      direction,
      duration: duration === "custom" ? customDuration : duration,
      stake,
      potentialPayout: payout,
      timestamp: new Date(),
    });
    setShowConfirmation(false);
  };
  
  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Trade Options</h2>
      </div>
      
      {selectedAsset ? (
        <form onSubmit={handleSubmit} className="flex-1 p-4 overflow-y-auto">
          {/* Contract Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">Contract Type</label>
            <div className="grid grid-cols-1 gap-2">
              {contractTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    contractType === type.id 
                      ? "border-primary bg-primary-light bg-opacity-30" :"border-border hover:border-primary-light"
                  }`}
                  onClick={() => setContractType(type.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border ${
                      contractType === type.id 
                        ? "border-primary bg-primary" :"border-text-tertiary"
                    } mr-2 flex items-center justify-center`}>
                      {contractType === type.id && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="font-medium text-text-primary">{type.name}</span>
                  </div>
                  <p className="text-xs text-text-tertiary mt-1 ml-6">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Direction Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">Prediction</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`flex items-center justify-center py-3 px-4 rounded-lg transition-colors ${
                  direction === "rise" ?"bg-success-light text-success border border-success" :"bg-gray-50 text-text-secondary border border-border hover:border-success"
                }`}
                onClick={() => setDirection("rise")}
              >
                <Icon name="TrendingUp" size={18} className="mr-2" />
                <span className="font-medium">Rise</span>
              </button>
              <button
                type="button"
                className={`flex items-center justify-center py-3 px-4 rounded-lg transition-colors ${
                  direction === "fall" ?"bg-danger-light text-danger border border-danger" :"bg-gray-50 text-text-secondary border border-border hover:border-danger"
                }`}
                onClick={() => setDirection("fall")}
              >
                <Icon name="TrendingDown" size={18} className="mr-2" />
                <span className="font-medium">Fall</span>
              </button>
            </div>
          </div>
          
          {/* Duration Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">Duration</label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {durationOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                    duration === option.id 
                      ? "bg-primary text-white" :"bg-gray-50 text-text-secondary border border-border hover:bg-gray-100"
                  }`}
                  onClick={() => setDuration(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {duration === "custom" && ( <div className="flex items-center space-x-2">
                <input
                  type="number" min="1" placeholder="Enter duration" className="bg-gray-50 border border-border text-text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  value={customDuration}
                  onChange={handleCustomDurationChange}
                />
                <select className="bg-gray-50 border border-border text-text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5">
                  <option value="m">Minutes</option>
                  <option value="h">Hours</option>
                  <option value="d">Days</option>
                </select>
              </div>
            )}
          </div>
          
          {/* Stake Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">Stake Amount</label>
            <div className="flex items-center mb-3">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number" min="1" step="0.01" className="bg-gray-50 border border-border text-text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                value={stake}
                onChange={handleStakeChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {stakeOptions.map((amount) => (
                <button
                  key={amount}
                  type="button" className="py-2 px-3 text-sm font-medium rounded-lg bg-gray-50 text-text-secondary border border-border hover:bg-gray-100 transition-colors"
                  onClick={() => setStake(amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>
          
          {/* Potential Payout */}
          <div className="mb-6 p-3 bg-primary-light bg-opacity-30 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Potential Payout:</span>
              <span className="text-lg font-semibold text-primary">${payout.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit" className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded-lg transition-colors font-medium"
          >
            <Icon name="CheckCircle" size={18} className="mr-2" />
            Place Trade
          </button>
        </form>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-text-tertiary">
          <Icon name="AlertCircle" size={48} className="mb-4" />
          <p className="text-center">Please select an asset to start trading</p>
        </div>
      )}
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Confirm Trade</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary">Asset:</span>
                <span className="font-medium text-text-primary">{selectedAsset.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Contract Type:</span>
                <span className="font-medium text-text-primary">
                  {contractTypes.find(c => c.id === contractType)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Direction:</span>
                <span className={`font-medium ${direction === "rise" ? "text-success" : "text-danger"}`}>
                  {direction === "rise" ? "Rise" : "Fall"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Duration:</span>
                <span className="font-medium text-text-primary">
                  {duration === "custom" ? customDuration : durationOptions.find(d => d.id === duration)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Stake:</span>
                <span className="font-medium text-text-primary">${stake}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Potential Payout:</span>
                <span className="font-medium text-primary">${payout.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                className="flex-1 py-2 px-4 bg-gray-100 text-text-secondary rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                onClick={confirmTrade}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeForm;