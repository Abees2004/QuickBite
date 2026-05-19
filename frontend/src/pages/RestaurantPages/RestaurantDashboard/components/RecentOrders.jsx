import React from 'react';
import { Link } from 'react-router';

const RecentOrders = ({ orders = [] }) => {

  const statusConfig = {
    pen: { label: "PENDING",   color: "bg-slate-50 text-slate-600",   bar: "bg-slate-400" },
    acc: { label: "APPROVED",  color: "bg-blue-50 text-blue-600",     bar: "bg-blue-500" },
    ass: { label: "ASSIGNED",  color: "bg-purple-50 text-purple-600", bar: "bg-purple-500" },
    pic: { label: "PICKED",    color: "bg-amber-50 text-amber-600",   bar: "bg-amber-500" },
    del: { label: "DELIVERED", color: "bg-emerald-50 text-emerald-600", bar: "bg-emerald-500" },
    rej: { label: "REJECTED",  color: "bg-rose-50 text-rose-600",     bar: "bg-rose-500" },
  };

  // 🔄 Empty state
  if (!orders.length) {
    return (
      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-xl p-10 text-center text-slate-400">
        No recent orders found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col">

      <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <h2 className="text-xl font-black text-slate-900">Recent Orders</h2>

        <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-orange-500 hover:text-white transition-all">
          View Full Log
        </button>
      </div>

      <div className="overflow-x-auto">

        {orders.map((order) => {
          const key = order.status?.toLowerCase()?.slice(0, 3);
          const s = statusConfig[key] || statusConfig.pen;

          return (
            <div
              key={order.id}
              className="group flex items-center justify-between p-5 md:p-6 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
            >

              {/* Customer */}
              <div className="flex items-center gap-6 w-1/3">
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-orange-500">
                    #{order.id}
                  </span>
                  <div className={`w-1 h-6 ${s.bar} rounded-full mt-1`} />
                </div>

                <div>
                  <p className="text-sm font-black text-slate-900">
                    {order.customer?.username || "Unknown"}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    {order.customer?.email || "-"}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="w-1/3 text-center">
                <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${s.color}`}>
                  {s.label}
                </span>
              </div>

              {/* Actions */}
              <div className="w-1/3 flex items-center justify-end gap-6">
                <p className="text-sm font-black text-slate-900">
                  ${Number(order.total || 0).toFixed(2)}
                </p>

                <Link
                  to={`/resturant/bookings/${order.id}`}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase hover:bg-orange-500 transition-all"
                >
                  View
                </Link>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default RecentOrders;