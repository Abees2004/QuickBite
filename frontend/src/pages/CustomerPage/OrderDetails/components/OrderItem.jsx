import React from 'react';

const OrderItem = ({ food, quantity }) => (
  <li className="flex items-center py-4">
  
  
    
      <img className="w-16 h-16 rounded-lg object-cover mr-4 shadow-sm" src={`http://127.0.0.1:8000${food.image}/`} alt={food.name} />
    
    <div className="flex-grow">
      <p className="font-semibold text-gray-800">{food.name}</p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Qty: {quantity}</span>
      </div>
    </div>
    <span className="font-bold text-gray-700">₹{(food.price*quantity).toFixed(2)}</span>
  </li>
);

export default OrderItem;