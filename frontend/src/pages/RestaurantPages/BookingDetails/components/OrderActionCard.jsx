import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../../../../api/axiosapi';
import { toast } from 'react-toastify';

const OrderActionCard = ({id,location,total}) => {
  const navigate=useNavigate()
  return (
    <div className="max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Top Header */}
      <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-bold text-gray-800">Order #{id}</h2>
        <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-2 py-1 rounded uppercase tracking-tighter">
          Action Required
        </span>
      </div>

      {/* Main Grid Content */}
      <div className="p-6 grid grid-cols-3 gap-6">
        {/* Column 1 */}
        <div>
          <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Order</p>
          <p className="text-xs text-gray-500 mt-1">ID: #{id}</p>
        </div>

        {/* Column 2 */}
        <div>
          <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Location</p>
          <p className="font-bold text-gray-800 leading-tight">{location.street_name},{location.city},{location.pincode}</p>
        </div>

        {/* Column 3 */}
        <div>
          <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Total</p>
          <p className="font-bold text-orange-600 text-lg leading-tight">${total}</p>
          <p className="text-xs text-gray-500 mt-0.5">Paid via Wallet</p>
        </div>
      </div>

      {/* Simple Action Buttons */}
      <div className="px-3 pb-3 flex gap-4">
        <button onClick={()=>{
          axiosInstance.patch(`/api/orders/orders-status/${id}/`,{status:'REJECTED'})
          .then(res=>{
            toast.info("Orders Rjected")
            navigate(`/resturant/orderrequest`)
          })
          .catch(err=>console.log(err))
        }} 
         className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-95">
          Reject
        </button>
        <button onClick={()=>{
          axiosInstance.patch(`/api/orders/orders-status/${id}/`,{status:'APPROVED'})
          .then(res=>{
            toast.success("Order Accepted")
              navigate(`/resturant/orderrequest`)
          })
          .catch(err=>console.log(err))
        }} 
        className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-95">
          Approve
        </button>
      </div>
    </div>
  );
};

export default OrderActionCard;