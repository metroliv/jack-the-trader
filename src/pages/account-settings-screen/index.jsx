import React, { useState, useEffect } from "react";

import Icon from "components/AppIcon";

// Import components
import Sidebar from "../dashboard/components/Sidebar";
import Header from "../dashboard/components/Header";
import ProfileSettings from "./components/ProfileSettings";
import SecuritySettings from "./components/SecuritySettings";
import PreferencesSettings from "./components/PreferencesSettings";
import ApiSettings from "./components/ApiSettings";

const AccountSettingsScreen = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Warn user about unsaved changes when navigating away
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleTabChange = (tab) => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm("You have unsaved changes. Are you sure you want to leave this tab?");
      if (!confirm) return;
    }
    setActiveTab(tab);
    setHasUnsavedChanges(false);
  };

  // Skeleton loading component
  const SkeletonLoader = () => (
    <div className="bg-surface rounded-lg shadow-sm border border-border p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (isLoading) {
      return <SkeletonLoader />;
    }

    switch (activeTab) {
      case "profile":
        return <ProfileSettings onChangesMade={() => setHasUnsavedChanges(true)} />;
      case "security":
        return <SecuritySettings onChangesMade={() => setHasUnsavedChanges(true)} />;
      case "preferences":
        return <PreferencesSettings onChangesMade={() => setHasUnsavedChanges(true)} />;
      case "api":
        return <ApiSettings onChangesMade={() => setHasUnsavedChanges(true)} />;
      default:
        return <ProfileSettings onChangesMade={() => setHasUnsavedChanges(true)} />;
    }
  };

  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header />
        
        {/* Settings Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary mb-1">Account Settings</h1>
            <p className="text-text-secondary">Manage your account preferences and security settings</p>
          </div>
          
          {/* Settings Tabs */}
          <div className="flex border-b border-border mb-6">
            <button
              onClick={() => handleTabChange("profile")}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "profile" ?"border-primary text-primary" :"border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => handleTabChange("security")}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "security" ?"border-primary text-primary" :"border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              Security
            </button>
            <button
              onClick={() => handleTabChange("preferences")}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "preferences" ?"border-primary text-primary" :"border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              Preferences
            </button>
            <button
              onClick={() => handleTabChange("api")}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "api" ?"border-primary text-primary" :"border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              API Access
            </button>
          </div>
          
          {/* Tab Content */}
          {renderTabContent()}
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
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-2 flex justify-around lg:hidden">
        <button
          onClick={() => handleTabChange("profile")}
          className={`flex flex-col items-center p-2 ${
            activeTab === "profile" ? "text-primary" : "text-text-tertiary"
          }`}
        >
          <Icon name="User" size={20} />
          <span className="text-xs mt-1">Profile</span>
        </button>
        <button
          onClick={() => handleTabChange("security")}
          className={`flex flex-col items-center p-2 ${
            activeTab === "security" ? "text-primary" : "text-text-tertiary"
          }`}
        >
          <Icon name="Shield" size={20} />
          <span className="text-xs mt-1">Security</span>
        </button>
        <button
          onClick={() => handleTabChange("preferences")}
          className={`flex flex-col items-center p-2 ${
            activeTab === "preferences" ? "text-primary" : "text-text-tertiary"
          }`}
        >
          <Icon name="Settings" size={20} />
          <span className="text-xs mt-1">Preferences</span>
        </button>
        <button
          onClick={() => handleTabChange("api")}
          className={`flex flex-col items-center p-2 ${
            activeTab === "api" ? "text-primary" : "text-text-tertiary"
          }`}
        >
          <Icon name="Key" size={20} />
          <span className="text-xs mt-1">API</span>
        </button>
      </div>
    </div>
  );
};

export default AccountSettingsScreen;