import { Link } from "react-router";

const SidebarActivity = ({order}) => {
  if(!order){
    return <p>No Deliverd Orders......</p>
  }
  return (
    <div className="lg:w-[40%]">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Recent Activity</h2>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">History</span>
      </div>
      
      <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden">
        {/* Activity Item */}
        <div className="p-5 border-b border-slate-100 hover:bg-slate-50/50 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-xs">
                <i className="fa-solid fa-check"></i>
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-800">#{order.id}</p>
                <span className="text-[9px] font-black text-emerald-600 uppercase">Delivered</span>
              </div>
            </div>
            <p className="text-base font-black text-slate-900">${order.total}</p>
          </div>
          <div className="space-y-2 ml-1">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-circle text-[6px] text-slate-300"></i>
              <p className="text-[11px] font-bold text-slate-500 truncate">{order.restaurant.name},{order.restaurant.street_name},{order.restaurant.city},{order.restaurant.pincode}</p>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-location-dot text-[8px] text-indigo-500"></i>
              <p className="text-[11px] font-bold text-slate-700 truncate">{order.street_name},{order.city},{order.pincode}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50/50 text-center">
          <Link to={`/delivery/orders`} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-600">
            View All Transactions <i className="fa-solid fa-arrow-right ml-1 text-[8px]"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarActivity;