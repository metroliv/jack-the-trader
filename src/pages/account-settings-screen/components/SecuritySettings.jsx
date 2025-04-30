import React, { useState } from "react";
import Icon from "components/AppIcon";

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const loginHistory = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New York, United States",
      ip: "192.168.1.1",
      time: "Today, 10:45 AM",
      status: "success",
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New York, United States",
      ip: "192.168.1.2",
      time: "Yesterday, 8:30 PM",
      status: "success",
    },
    {
      id: 3,
      device: "Firefox on MacOS",
      location: "Chicago, United States",
      ip: "192.168.1.3",
      time: "Jun 10, 2023, 3:15 PM",
      status: "suspicious",
    },
    {
      id: 4,
      device: "Chrome on Android",
      location: "London, United Kingdom",
      ip: "192.168.1.4",
      time: "Jun 5, 2023, 11:20 AM",
      status: "failed",
    },
  ];

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the password
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const toggleTwoFactor = () => {
    if (!twoFactorEnabled) {
      setShowQRCode(true);
    } else {
      setTwoFactorEnabled(false);
      setShowQRCode(false);
    }
  };

  const confirmTwoFactor = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Two-Factor Authentication</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-text-secondary mb-1">
              Add an extra layer of security to your account
            </p>
            <p className="text-sm text-text-tertiary">
              We'll ask for a verification code in addition to your password when you sign in
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTwoFactor}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFactorEnabled ? "bg-success" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
        
        {showQRCode && (
          <div className="mt-4 p-4 border border-border rounded-lg bg-gray-50">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-white p-2 border border-border rounded-lg mb-4">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                  alt="QR Code" className="w-full h-full"
                />
              </div>
              <p className="text-sm text-text-secondary mb-4 text-center">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
              <div className="flex items-center mb-4">
                <input
                  type="text" placeholder="Enter verification code" className="px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary mr-2"
                />
                <button
                  onClick={confirmTwoFactor}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Verify
                </button>
              </div>
              <button
                onClick={() => setShowQRCode(false)}
                className="text-text-secondary text-sm hover:text-text-primary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Password</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-text-secondary mb-1">
              Change your password
            </p>
            <p className="text-sm text-text-tertiary">
              Last changed 3 months ago
            </p>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary-light transition-colors"
          >
            Change Password
          </button>
        </div>
        
        {showPasswordForm && (
          <form onSubmit={handlePasswordSubmit} className="mt-4 p-4 border border-border rounded-lg bg-gray-50">
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-text-secondary mb-1">
                  Current Password
                </label>
                <input
                  type="password" id="currentPassword" name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-text-secondary mb-1">
                  New Password
                </label>
                <input
                  type="password" id="newPassword" name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
                  required
                />
                <p className="text-xs text-text-tertiary mt-1">
                  Password must be at least 8 characters and include a number and a special character
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password" id="confirmPassword" name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="px-4 py-2 border border-border rounded-lg text-text-secondary mr-3 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Login History</h3>
        
        <div className="space-y-4">
          {loginHistory.map((login) => (
            <div 
              key={login.id} 
              className={`flex items-start p-3 rounded-lg ${
                login.status === 'suspicious' ? 'bg-warning bg-opacity-10' : login.status ==='failed' ? 'bg-danger-light' : 'hover:bg-gray-50'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <Icon 
                  name={
                    login.status === 'success' ? "CheckCircle" : login.status ==='suspicious' ? "AlertTriangle" : "XCircle"
                  } 
                  size={18} 
                  className={
                    login.status === 'success' ? "text-success" : login.status ==='suspicious' ? "text-warning" : "text-danger"
                  } 
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-text-primary">{login.device}</h4>
                  <span className="text-xs text-text-tertiary">{login.time}</span>
                </div>
                <p className="text-xs text-text-secondary">
                  {login.location} • {login.ip}
                </p>
                {login.status === 'suspicious' && (
                  <div className="mt-1 flex items-center">
                    <span className="text-xs text-warning font-medium">Unusual location detected</span>
                    <button className="ml-2 text-xs text-primary font-medium">
                      This was me
                    </button>
                  </div>
                )}
                {login.status === 'failed' && (
                  <div className="mt-1">
                    <span className="text-xs text-danger font-medium">Failed login attempt</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button className="mt-4 text-primary text-sm font-medium hover:text-primary-hover flex items-center">
          <span>View Full History</span>
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Active Sessions</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-primary-light bg-opacity-10">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
                <Icon name="Monitor" size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Chrome on Windows</h4>
                <p className="text-xs text-text-secondary">New York, United States • Current Session</p>
              </div>
            </div>
            <span className="text-xs text-success font-medium px-2 py-1 bg-success-light rounded-full">
              Active Now
            </span>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <Icon name="Smartphone" size={18} className="text-text-tertiary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Safari on iPhone</h4>
                <p className="text-xs text-text-secondary">New York, United States • Last active 2 hours ago</p>
              </div>
            </div>
            <button className="text-danger text-sm font-medium hover:text-danger">
              Logout
            </button>
          </div>
        </div>
        
        <button className="mt-4 text-danger text-sm font-medium hover:text-danger flex items-center">
          <Icon name="LogOut" size={16} className="mr-2" />
          <span>Logout from all devices</span>
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;