import React, { useState } from "react";
import Icon from "components/AppIcon";
import Image from "components/AppImage";

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    timezone: "UTC-05:00 (Eastern Time)",
    language: "English",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // In a real app, this would send data to an API
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4 bg-primary-light bg-opacity-30 rounded-lg">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm">
            <Image 
              src={profileData.profileImage} 
              alt="Profile" className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-sm hover:bg-primary-hover transition-colors">
            <Icon name="Camera" size={16} />
          </button>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary">
            {profileData.firstName} {profileData.lastName}
          </h3>
          <p className="text-text-secondary text-sm mb-2">{profileData.email}</p>
          <div className="flex items-center">
            <span className="bg-success-light text-success text-xs px-2 py-1 rounded-full font-medium">
              Premium Account
            </span>
            <span className="mx-2 text-text-tertiary">•</span>
            <span className="text-text-tertiary text-sm">Member since Jan 2023</span>
          </div>
        </div>
        
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-primary hover:text-primary-hover"
        >
          <Icon name={isEditing ? "X" : "Edit2"} size={16} className="mr-1" />
          <span className="text-sm font-medium">{isEditing ? "Cancel" : "Edit Profile"}</span>
        </button>
      </div>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-text-secondary mb-1">
              First Name
            </label>
            <input
              type="text" id="firstName" name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-text-secondary mb-1">
              Last Name
            </label>
            <input
              type="text" id="lastName" name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
              Email Address
            </label>
            <input
              type="email" id="email" name="email"
              value={profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-1">
              Phone Number
            </label>
            <input
              type="tel" id="phone" name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
            />
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-text-secondary mb-1">
              Country
            </label>
            <select
              id="country" name="country"
              value={profileData.country}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
            >
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-text-secondary mb-1">
              Timezone
            </label>
            <select
              id="timezone" name="timezone"
              value={profileData.timezone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
            >
              <option value="UTC-05:00 (Eastern Time)">UTC-05:00 (Eastern Time)</option>
              <option value="UTC-08:00 (Pacific Time)">UTC-08:00 (Pacific Time)</option>
              <option value="UTC+00:00 (GMT)">UTC+00:00 (GMT)</option>
              <option value="UTC+01:00 (Central European Time)">UTC+01:00 (Central European Time)</option>
              <option value="UTC+08:00 (China Standard Time)">UTC+08:00 (China Standard Time)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-text-secondary mb-1">
              Language
            </label>
            <select
              id="language" name="language"
              value={profileData.language}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-text-primary"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
        </div>
        
        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-border rounded-lg text-text-secondary mr-3 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Verification Documents</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-success-light flex items-center justify-center mr-3">
                <Icon name="FileCheck" size={18} className="text-success" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Identity Verification</h4>
                <p className="text-xs text-success">Verified</p>
              </div>
            </div>
            <button className="text-primary text-sm font-medium hover:text-primary-hover">
              View
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-warning bg-opacity-10 flex items-center justify-center mr-3">
                <Icon name="Home" size={18} className="text-warning" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Proof of Address</h4>
                <p className="text-xs text-warning">Pending Review</p>
              </div>
            </div>
            <button className="text-primary text-sm font-medium hover:text-primary-hover">
              View
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <Icon name="FileText" size={18} className="text-text-tertiary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Financial Information</h4>
                <p className="text-xs text-text-tertiary">Not Submitted</p>
              </div>
            </div>
            <button className="text-primary text-sm font-medium hover:text-primary-hover">
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;