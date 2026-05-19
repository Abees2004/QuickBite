import React from 'react';
import { Link } from 'react-router';

const OrderCard = ({ order }) => {
  const { id, restaurant, total, status, image, street_name,city } = order;



  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'APPROVED': return 'bg-blue-100 text-blue-700';
      case 'ASSIGNED': return 'bg-indigo-100 text-indigo-700';
      case 'PICKED': return 'bg-green-100 text-green-700';
      case 'DELIVERED': return 'bg-green-200 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex">
        
        {/* Image */}
        <img
          className="rounded-lg object-cover w-[100px] h-[100px]"
          src={`http://127.0.0.1:8000/${image}`}
          alt={restaurant?.name}
        />

        {/* Details */}
        <div className="flex-grow ml-4 flex justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Order ID: <span className="text-gray-700 font-semibold">#{id}</span>
            </p>
            <h2 className="text-xl font-bold text-gray-800 mb-1">{order.restaurant.name}</h2>
            <p className="text-sm text-gray-600 mb-2">Location: {street_name},{city}</p>
            <p className="text-xs text-gray-500">Placed on: {formatDate(order.creadted_at)}</p>
          </div>

          {/* Status & Price */}
          <div className="text-right">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${getStatusColor(status)}`}
            >
              {(status)}
            </span>

            <p className="text-lg font-extrabold text-green-600 mt-2">
              ₹{total.toFixed(2)}
            </p>

            <Link
              to={`/orders/${id}`}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
