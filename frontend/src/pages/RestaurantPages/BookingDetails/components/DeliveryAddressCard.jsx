import React from 'react';

const DeliveryAddressCard = ({location}) => {
  if (!location){
    return <p>Loading...</p>
  }
  return (
    <div className="bg-white p-6 rounded-xl shadow-strong">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Delivery Address</h3>
      <p className="font-semibold text-gray-800">{location.city}</p>
      <p className="text-gray-600 leading-relaxed">
        {location?.street_name || ''}<br />
        {location?.city || ''}<br />
        {location?.pincode || ''}
      </p>
      <button className="mt-4 text-sm text-red-600 hover:text-red-800 font-bold underline">
        Flag Address Issue
      </button>
    </div>
  );
};

export default DeliveryAddressCard;