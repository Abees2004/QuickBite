import React from 'react';

const OrderHeader = ({ orderId, status }) => {
  const getStatusClass = (currentStatus) => {
    switch (currentStatus) {
      case 'DELIVERED':
        return 'status-delivered';
      case 'PREPARING':
        return 'status-preparing';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <header className="flex justify-between items-center pb-4">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Order Details <span className="text-orange-600">#{orderId}</span>
      </h1>
      
      <div className="flex items-center space-x-3">
        <span className={`status-badge ${getStatusClass(status)}`}>{status}</span>
        
        <span className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg">{status}</span>
      </div>
    </header>
  );
};

export default OrderHeader;