const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {/* Revenue Card */}
      <div className="relative bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm">
        <div className="flex flex-col">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-wallet text-sm"></i>
          </div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[1.5px]">Revenue</span>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">$1,240.50</h3>
            <span className="text-emerald-500 text-[11px] font-bold">+12%</span>
          </div>
        </div>
      </div>

      {/* Active Orders Card */}
      <div className="relative bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm">
        <div className="flex flex-col">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-fire-flame-curved text-sm"></i>
          </div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[1.5px]">Active Orders</span>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">24</h3>
            <span className="bg-orange-50 text-orange-600 text-[9px] font-black px-2 py-0.5 rounded-md">6 NEW</span>
          </div>
        </div>
      </div>

      {/* Customers Card */}
      <div className="relative bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm">
        <div className="flex flex-col">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-user-group text-sm"></i>
          </div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[1.5px]">Customers</span>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">1,842</h3>
            <span className="text-indigo-500 text-[11px] font-bold">+5.4%</span>
          </div>
        </div>
      </div>

      {/* Avg Rating Card */}
      <div className="relative bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm">
        <div className="flex flex-col">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-star text-sm"></i>
          </div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[1.5px]">Avg Rating</span>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">4.8<span className="text-slate-300 text-lg">/5</span></h3>
            <span className="text-slate-400 text-[9px] font-bold">98 REVIEWS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;