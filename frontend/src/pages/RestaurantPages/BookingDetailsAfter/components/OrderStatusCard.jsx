import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';

const OrderStatusCard = ({orderDetails}) => {
    const {id}=useParams()
    const orderData=orderDetails
    console.log(orderData)
  return (
    <div className="max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Top Header */}
      <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-bold text-gray-800">Order #{id}</h2>
      </div>

      {/* Main Grid Content */}
      <div className="p-6 grid grid-cols-3 gap-6">
        {/* Column 1 */}
        <div>
          <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Customer</p>
          <p className="font-bold text-gray-800 leading-tight">{orderData.customer.username}</p>
          <p className="text-xs text-gray-500 mt-1">{orderData.customer.email}</p>
        </div>

        {/* Column 2 */}
        <div>
          <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Location</p>
          <p className="font-bold text-gray-800 leading-tight">{orderData?.street_name},{orderData.street_name},{orderData.pincode}</p>
        </div>

        {/* Column 3 */}
        <div>
          <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Total</p>
          <p className="font-bold text-orange-600 text-lg leading-tight">${orderData.total}</p>
        </div>
      </div>

<div className="px-3 pb-3">
  <button
    disabled
    className={`w-full py-3 text-white text-sm font-bold rounded-xl shadow-md
      ${
        orderData?.status === 'REJECTED'
          ? 'bg-red-500'
          : ['APPROVED', 'ASSIGNED','PICKED', 'DELIVERED'].includes(orderData?.status)
          ? 'bg-green-600'
          : 'bg-yellow-500'
      }
    `}
  >
    {orderData?.status === 'REJECTED'
      ? 'Rejected'
      : ['APPROVED', 'ASSIGNED', 'PICKED','DELIVERED'].includes(orderData?.status)
      ? 'Confirmed'
      : 'Pending'}
  </button>
</div>


      </div>
  );
};

export default OrderStatusCard;