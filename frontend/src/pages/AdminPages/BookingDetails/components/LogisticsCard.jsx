import React from 'react';
import { useParams } from 'react-router';

const LogisticsCard = ({details}) => {
  const {id}=useParams()
  return (
    <div className="bg-white p-6 rounded-xl shadow-strong border-l-4 border-orange-600">
      <h2 className="font-bold text-gray-800">Order #{id}</h2>
      <h2 className="text-xl font-bold mb-4 border-b pb-2">
        Logistics & Contacts
      </h2>

      <div className="grid grid-cols-3 gap-4">
        
        {/* Customer */}
        <div>
          <p className="text-xs font-medium uppercase text-gray-500">Customer</p>
          <p className="font-semibold text-gray-800">{details?.customer?.username}</p>
          <p className="text-sm text-gray-600">{details?.customer?.email}</p>
        </div>

        {/* Restaurant */}
        <div>
          <p className="text-xs font-medium uppercase text-gray-500">Restaurant</p>
          <p className="font-semibold text-gray-800">{details?.restaurant?.name}</p>
          <p className="text-sm text-gray-600">{details?.restaurant?.street_name},{details?.restaurant?.city}</p>
        </div>

        {/* Rider */}
        <div>
          <p className="text-xs font-medium uppercase text-gray-500">Rider</p>
          <p className="font-semibold text-gray-800">{details?.Delivery_partner?.username}</p>
          <p className="text-sm text-gray-600">{details?.Delivery_partner?.email}</p>
        </div>

      </div>
    </div>
  );
};

export default LogisticsCard;