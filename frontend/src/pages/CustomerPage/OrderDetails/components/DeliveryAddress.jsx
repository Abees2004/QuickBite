import React from 'react';

const DeliveryAddress = ({location}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Delivery Address</h3>
    <p className="font-semibold text-gray-800">{location.city}</p>
    <p className="text-gray-600 leading-relaxed text-sm">
      {location.street_name},<br />
      {location.city},<br/>
      {location.pincode}
    </p>

  </div>
);

export default DeliveryAddress;