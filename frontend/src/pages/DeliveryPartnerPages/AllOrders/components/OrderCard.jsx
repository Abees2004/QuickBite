import React from 'react';
import { Link } from 'react-router';

const OrderCard = ({ order }) => {
  // 1. Status Configuration Engine
  const statusConfig = {
    'ASSIGNED': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', dot: 'bg-amber-500', label: 'Assigned' },
    'PICKED': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', dot: 'bg-blue-500', label: 'On The Way' },
    'DELIVERED': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', dot: 'bg-emerald-500', label: 'Completed' },
    'REJECTED': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', dot: 'bg-rose-500', label: 'Cancelled' },
  };

  // Fallback if status doesn't match
  const currentStatus = statusConfig[order.status] || statusConfig['ass']

  return (
    <div className="group relative bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out overflow-hidden">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-gray-50 rounded-full blur-3xl opacity-50 group-hover:bg-orange-50 transition-colors" />

      <div className="relative flex flex-col lg:flex-row gap-6">
        
        {/* Section 1: Image & Branding */}
        <div className="relative w-full lg:w-48 h-40 lg:h-auto overflow-hidden rounded-2xl flex-shrink-0">
          <img 
            src={order.restaurant.image || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400"} 
            alt={order.restaurant.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
             <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded border border-white/30 uppercase">
              {'Premium'}
             </span>
          </div>
        </div>

        {/* Section 2: Core Info */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-black bg-neutral-900 text-white px-3 py-1 rounded-full tracking-tighter">
                #{order.id}
              </span>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${currentStatus.bg} ${currentStatus.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentStatus.dot}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wide ${currentStatus.text}`}>
                  {currentStatus.label}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              {/* Vertical Path Line */}
              <div className="hidden sm:block absolute left-[1px] top-4 bottom-4 w-[1px] bg-dashed border-l border-gray-200" />
              
              <div className="pl-0 sm:pl-4">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pick up</p>
                <h4 className="text-md font-bold text-gray-900 leading-none">{order.restaurant.name}</h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{order.restaurant.street_name},{order.restaurant.city},{order.restaurant.pincode}</p>
              </div>

              <div className="pl-0 sm:pl-4 border-l-2 border-orange-500 sm:border-l-0">
                <p className="text-[9px] font-bold text-orange-500 uppercase tracking-widest mb-1">Drop off</p>
                <h4 className="text-md font-bold text-gray-900 leading-none">{order.customer.username}</h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{order.street_name},{order.city},{order.pincode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Payout & Actions */}
        <div className="flex flex-row lg:flex-col justify-between items-center lg:items-end lg:w-48 lg:pl-6 lg:border-l border-gray-100 pt-5 lg:pt-0 border-t lg:border-t-0">
          <div className="lg:text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payout</p>
            <div className="flex items-baseline gap-1">
               <span className="text-lg font-bold text-gray-900">₹</span>
               <span className="text-3xl font-black text-gray-900 tracking-tight">{order.total}</span>
            </div>
          </div>

          <Link to={`/deliveryStatus/${order.id}`} className="relative overflow-hidden bg-neutral-900 hover:bg-black text-white px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-lg shadow-gray-200">
            <span className="text-[11px] font-bold uppercase tracking-wider">View Order</span>

          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderCard;