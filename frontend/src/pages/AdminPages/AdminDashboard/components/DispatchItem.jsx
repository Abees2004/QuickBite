import React from 'react';
import { Link } from 'react-router';

const getStatusStyles = (status) => {
  switch (status?.toLowerCase()) {
    case 'DELIVERED': return 'bg-emerald-500 text-emerald-600';
    case 'PENDING': return 'bg-amber-500 text-amber-600';
    case 'REJECTED': return 'bg-rose-500 text-rose-600';
    case 'APPROVED': return 'bg-emerald-500 text-emerald-600';
    case 'ASSIGNED': return 'bg-blue-500 text-blue-600';
    case 'PICKED': return 'bg-indigo-500 text-indigo-600';
    default: return 'bg-slate-400 text-slate-600';
  }
};

const DispatchItem = ({ order }) => {
  if (!order) {
    return <div className="p-6 text-slate-400 text-xs animate-pulse text-center">Loading order...</div>;
  }

  const statusStyle = getStatusStyles(order.status);
  
  const restaurant = order.restaurant || order.restaurant; 

  const [dotBg, textColor] = statusStyle.split(' ');

  return (
    <div className="group flex items-center gap-4 sm:gap-6 p-6 border-b border-slate-100 hover:bg-slate-50/50 transition-all">

      <div className="relative shrink-0">
        <img 
          src={restaurant?.image || 'https://via.placeholder.com/100'} 
          alt={restaurant?.name || 'Restaurant'} 
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover shadow-sm" 
        />

        <div className={`absolute -top-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${dotBg}`}></div>
      </div>


      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[9px] font-black px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded uppercase">
            #{order.id}
          </span>
          <span className={`text-[9px] text-white px-1.5 py-0.5 rounded uppercase tracking-tighter ${textColor} bg-current bg-opacity-10`}>
            {order.status || 'Unknown'}
          </span>
        </div>

        <h3 className="text-sm font-extrabold text-slate-800 truncate">
          {restaurant?.name || 'Unknown Restaurant'}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
          <p className="text-[11px] font-bold text-slate-500 shrink-0">
            <i className="fa-solid fa-user-ninja mr-1 text-slate-300"></i> 
            {order.customer?.username || 'Guest'}
          </p>
          <p className="text-[11px] font-bold text-slate-400 shrink-0">
            <i className="fa-solid fa-clock mr-1 text-slate-300"></i> {'--'} MIN
          </p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-lg font-black text-slate-900">${order.total}</p>
        <Link to={`/admin/bookings/${order.id}`} className="mt-1 text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">
          Manage
        </Link>
      </div>
    </div>
  );
};

export default DispatchItem;