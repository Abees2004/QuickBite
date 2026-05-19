import React from 'react';

const OrderHeader = ({ orderId }) => {


  return (
    <header className="flex justify-between items-center pb-4">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Order Details <span className="text-orange-600">#{orderId}</span>
      </h1>
    </header>
  );
};

export default OrderHeader;