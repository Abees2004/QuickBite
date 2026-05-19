import React from 'react';

const StatsGrid = ({stats}) => {
  if (!stats) {
    return <div>Loading stats...</div>;
  }
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Revenue Card */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
          <p className="text-2xl font-black text-slate-900">${stats?.total_revenue}</p>
        </div>
        <i className="fa-solid fa-chart-line absolute -right-4 -bottom-4 text-slate-50 text-6xl group-hover:text-indigo-50 transition-colors duration-500"></i>
      </div>

      {/* Bookings Card */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Bookings</p>
          <p className="text-2xl font-black text-slate-900">{stats?.total_orders}</p>
        </div>
        <i className="fa-solid fa-calendar-check absolute -right-4 -bottom-4 text-slate-50 text-6xl group-hover:text-rose-50 transition-colors duration-500"></i>
      </div>

      {/* Partners Card */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Partners</p>
          <p className="text-2xl font-black text-slate-900">{stats?.total_partners}</p>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md mt-2 inline-block">Verified</span>
        </div>
        <i className="fa-solid fa-handshake absolute -right-4 -bottom-4 text-slate-50 text-6xl group-hover:text-slate-100 transition-colors duration-500"></i>
      </div>

      {/* Users Card */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Delivery Partners</p>
          <p className="text-2xl font-black text-slate-900">{stats?.total_delivery_partners}</p>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md mt-2 inline-block">Verified</span>
        </div>
        <i className="fa-solid fa-users absolute -right-4 -bottom-4 text-slate-50 text-6xl group-hover:text-indigo-50 transition-colors duration-500"></i>
      </div>
    </section>
  );
};

export default StatsGrid;