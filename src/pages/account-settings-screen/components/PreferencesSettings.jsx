import React, { useState } from "react";


const PreferencesSettings = () => {
  const [preferences, setPreferences] = useState({
    theme: "light",
    defaultAssetClass: "forex",
    defaultTimeframe: "1h",
    notifications: {
      email: {
        marketUpdates: true,
        priceAlerts: true,
        accountActivity: true,
        promotions: false,
      },
      push: {
        marketUpdates: true,
        priceAlerts: true,
        accountActivity: true,
        promotions: false,
      },
    },
    chartPreferences: {
      defaultIndicators: ["MA", "RSI"],
      showVolume: true,
      showGrid: true,
      colorScheme: "default",
    },
  });

  const handleThemeChange = (theme) => {
    setPreferences({
      ...preferences,
      theme,
    });
  };

  const handleAssetClassChange = (e) => {
    setPreferences({
      ...preferences,
      defaultAssetClass: e.target.value,
    });
  };

  const handleTimeframeChange = (e) => {
    setPreferences({
      ...preferences,
      defaultTimeframe: e.target.value,
    });
  };

  const handleNotificationChange = (channel, type) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [channel]: {
          ...preferences.notifications[channel],
          [type]: !preferences.notifications[channel][type],
        },
      },
    });
  };

  const handleChartPreferenceChange = (preference, value) => {
    setPreferences({
      ...preferences,
      chartPreferences: {
        ...preferences.chartPreferences,
        [preference]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Appearance</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Theme
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleThemeChange("light")}
              className={`flex flex-col items-center p-4 rounded-lg border ${
                preferences.theme === "light" ?"border-primary bg-primary-light bg-opacity-20" :"border-border hover:border-primary-light"
              }`}
            >
              <div className="w-full h-24 bg-white border border-border rounded-lg mb-3 overflow-hidden">
                <div className="h-6 bg-primary-light border-b border-border flex items-center px-2">
                  <div className="w-2 h-2 rounded-full bg-danger mr-1"></div>
                  <div className="w-2 h-2 rounded-full bg-warning mr-1"></div>
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                </div>
                <div className="p-2">
                  <div className="w-full h-2 bg-gray-100 rounded mb-1"></div>
                  <div className="w-2/3 h-2 bg-gray-100 rounded"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-text-primary">Light Mode</span>
            </button>
            
            <button
              onClick={() => handleThemeChange("dark")}
              className={`flex flex-col items-center p-4 rounded-lg border ${
                preferences.theme === "dark" ?"border-primary bg-primary-light bg-opacity-20" :"border-border hover:border-primary-light"
              }`}
            >
              <div className="w-full h-24 bg-gray-900 border border-gray-700 rounded-lg mb-3 overflow-hidden">
                <div className="h-6 bg-gray-800 border-b border-gray-700 flex items-center px-2">
                  <div className="w-2 h-2 rounded-full bg-danger mr-1"></div>
                  <div className="w-2 h-2 rounded-full bg-warning mr-1"></div>
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                </div>
                <div className="p-2">
                  <div className="w-full h-2 bg-gray-700 rounded mb-1"></div>
                  <div className="w-2/3 h-2 bg-gray-700 rounded"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-text-primary">Dark Mode</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Trading Defaults</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="defaultAssetClass" className="block text-sm font-medium text-text-secondary mb-1">
              Default Asset Class
            </label>
            <select
              id="defaultAssetClass"
              value={preferences.defaultAssetClass}
              onChange={handleAssetClassChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
            >
              <option value="forex">Forex</option>
              <option value="stocks">Stocks</option>
              <option value="crypto">Cryptocurrencies</option>
              <option value="commodities">Commodities</option>
              <option value="indices">Indices</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="defaultTimeframe" className="block text-sm font-medium text-text-secondary mb-1">
              Default Chart Timeframe
            </label>
            <select
              id="defaultTimeframe"
              value={preferences.defaultTimeframe}
              onChange={handleTimeframeChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
            >
              <option value="1m">1 Minute</option>
              <option value="5m">5 Minutes</option>
              <option value="15m">15 Minutes</option>
              <option value="30m">30 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="4h">4 Hours</option>
              <option value="1d">1 Day</option>
              <option value="1w">1 Week</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Chart Preferences
          </label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Show Volume</span>
              <button
                onClick={() => handleChartPreferenceChange("showVolume", !preferences.chartPreferences.showVolume)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.chartPreferences.showVolume ? "bg-success" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.chartPreferences.showVolume ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Show Grid</span>
              <button
                onClick={() => handleChartPreferenceChange("showGrid", !preferences.chartPreferences.showGrid)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.chartPreferences.showGrid ? "bg-success" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.chartPreferences.showGrid ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Notification Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-text-secondary mb-3">Email Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Market Updates</span>
                <button
                  onClick={() => handleNotificationChange("email", "marketUpdates")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.email.marketUpdates ? "bg-success" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.email.marketUpdates ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Price Alerts</span>
                <button
                  onClick={() => handleNotificationChange("email", "priceAlerts")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.email.priceAlerts ? "bg-success" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.email.priceAlerts ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Account Activity</span>
                <button
                  onClick={() => handleNotificationChange("email", "accountActivity")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.email.accountActivity ? "bg-success" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.email.accountActivity ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Promotions & News</span>
                <button
                  onClick={() => handleNotificationChange("email", "promotions")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.email.promotions ? "bg-success" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.email.promotions ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-text-secondary mb-3">Push Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Market Updates</span>
                <button
                  onClick={() => handleNotificationChange("push", "marketUpdates")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.push.marketUpdates ? "bg-success" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.push.marketUpdates ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Price Alerts</span>
                <button
                  onClick={() => handleNotificationChange("push", "priceAlerts")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.push.priceAlerts ? "bg-success" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.push.priceAlerts ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Account Activity</span>
                <button
                  onClick={() => handleNotificationChange("push", "accountActivity")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.push.accountActivity ? "bg-success" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.push.accountActivity ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Promotions & News</span>
                <button
                  onClick={() => handleNotificationChange("push", "promotions")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications.push.promotions ? "bg-success" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications.push.promotions ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings;