import React from "react";

const Legend = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Legend</h3>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded" />
          <span className="text-sm">Confirmed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-600 rounded" />
          <span className="text-sm">Pending</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-600 rounded" />
          <span className="text-sm">Canceled</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-800 rounded" />
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
          <span className="text-sm">Today</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Legend);