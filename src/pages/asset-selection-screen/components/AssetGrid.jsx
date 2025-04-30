import React from "react";
import AssetCard from "./AssetCard";

const AssetGrid = ({ assets, onFavoriteToggle, isLoading }) => {
  // Skeleton loading component
  const SkeletonLoader = () => (
    <div className="bg-surface rounded-lg shadow-sm border border-border p-4 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
      </div>
      
      <div className="flex justify-between items-end mb-3">
        <div>
          <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex flex-col items-end">
          <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-8"></div>
        </div>
      </div>
      
      <div className="h-10 w-full bg-gray-200 rounded mb-3"></div>
      
      <div className="flex justify-between">
        <div className="h-6 bg-gray-200 rounded w-20"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="bg-surface rounded-lg shadow-sm border border-border p-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No assets found</h3>
          <p className="text-text-secondary">Try adjusting your filters or search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assets.map((asset) => (
        <AssetCard 
          key={asset.id} 
          asset={asset} 
          onFavoriteToggle={onFavoriteToggle} 
        />
      ))}
    </div>
  );
};

export default AssetGrid;