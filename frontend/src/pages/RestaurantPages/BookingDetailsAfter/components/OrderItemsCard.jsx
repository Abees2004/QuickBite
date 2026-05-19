import React from 'react';

const OrderItemsCard = ({orderItems}) => {
  orderItems=orderItems
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
        Order Items ({orderItems.length})
      </h3>

      <ul className="divide-y divide-gray-200">
        {orderItems.map((item) => (
          <li key={item.id} className="flex items-center py-4">
              <img 
                className="w-16 h-16 rounded-lg object-cover mr-4 shadow-sm" 
                src={`http://127.0.0.1:8000/${item.food.image}/`} 
                alt={item.food.name}
              />
            
            <div className="flex-grow">
              <p className="font-semibold text-gray-800">{item.food.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity} 
                {item.note && (
                  <> | <span className={item.note.toLowerCase().includes('no') ? 'text-red-500' : 'text-orange-500'}>
                    {item.note}
                  </span></>
                )}
              </p>
            </div>

            <span className="font-extrabold text-gray-700">
              ₹{item.food.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItemsCard;