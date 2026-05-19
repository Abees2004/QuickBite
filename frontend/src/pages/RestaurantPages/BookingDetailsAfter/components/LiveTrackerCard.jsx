import React from 'react';

const LiveTrackerCard = ({ eta }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-strong">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Live Tracker</h3>
        <span className="text-lg font-extrabold text-orange-600">ETA: {eta}</span>
      </div>

      <div className="w-full map-container-height bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative">
        
        {/* Placeholder for Map Integration */}
        <p className="text-gray-500 font-medium animate-pulse">
          Loading Live Map...
        </p>
        
        {/* Driver Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3 bg-white p-3 rounded-lg shadow-xl flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              className="w-10 h-10 rounded-full object-cover" 
              src="https://i.pravatar.cc/150?img=4" 
              alt="Driver Avatar"
            />
            <div>
              <p className="font-semibold text-gray-900">Driver: Ravi S.</p>
              <p className="text-xs text-green-600 font-medium">1.2 km to Pickup</p>
            </div>
          </div>
          <button className="text-xs font-bold text-white bg-orange-600 py-1.5 px-3 rounded-full hover:bg-orange-700">
            Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackerCard;