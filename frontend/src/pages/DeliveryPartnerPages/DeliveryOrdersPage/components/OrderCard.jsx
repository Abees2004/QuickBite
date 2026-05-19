import axios from 'axios';
import React from 'react';
import axiosInstance from '../../../../api/axiosapi';

const OrderCard = ({ order,refresh }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5 flex flex-col sm:flex-row gap-5">
        
        {/* Left Side: Image & Price */}
        <div className="flex gap-4 sm:flex-col sm:w-32 flex-shrink-0">
          <div className="relative flex-shrink-0">
            <img 
              src={order.restaurant.image} 
              alt={order.restaurant.name}
              className="w-16 h-16 sm:w-full sm:h-24 rounded-2xl object-cover shadow-sm"
            />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white text-[10px]">
              <i className="fas fa-check"></i>
            </div>
          </div>
          <div className="sm:text-center">
            <p className="text-lg font-800 text-emerald-600 leading-none">₹{order.total}</p>
          </div>
        </div>

        {/* Center: Info & Path */}
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-xs text-slate-400 font-semibold italic">#{order.id}</p>
            <h3 className="font-800 text-slate-900 text-xl leading-tight">{order.restaurant.name}</h3>
            <p className="text-xs text-slate-400 font-semibold italic">Approved From {order.restaurant.name}</p>
          </div>

          <div className="relative pl-8 space-y-5 py-1">
            {/* Custom Path Line CSS would go in your index.css or a styled component */}
            <div className="absolute left-[20px] top-6 bottom-6 w-[2px] bg-slate-200 border-l-2 border-dashed border-slate-300"></div>
            
            <div className="relative">
              <div className="absolute -left-[24px] top-1 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-orange-50"></div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Pickup From</p>
              <p className="text-sm font-bold text-slate-700">{order.restaurant.street_name},{order.restaurant.city},{order.restaurant.pincode}</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[24px] top-1 w-3 h-3 rounded-full bg-slate-900 ring-4 ring-slate-100"></div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Deliver To</p>
              <p className="text-sm font-bold text-slate-700">{order.street_name},{order.city},{order.pincode}</p>
            </div>
          </div>

          <button onClick={()=>{
            axiosInstance.patch(`/api/delivery/assign-order/${order.id}/`,{status:'ASSIGNED'})
            .then(res=>{
              alert('Order was Assigned to You')
              console.log(res.data)
              refresh(prev=>!prev)
            })
            .catch(err=>{
            console.log(err)
            alert(JSON.stringify(err.response.data));

            })
          }}
          
          className="w-full mt-6 bg-slate-900 text-white py-4 rounded-2xl font-800 text-xs tracking-[0.2em] uppercase hover:bg-orange-600 transition-all shadow-lg active:scale-[0.98]">
            Accept Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;