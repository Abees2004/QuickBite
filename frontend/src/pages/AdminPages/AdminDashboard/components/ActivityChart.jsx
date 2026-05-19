import React from 'react';

const ActivityChart = () => (
  <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm p-6">
    <div className="relative h-48 flex items-end justify-between gap-2 mb-6">
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {[...Array(4)].map((_, i) => <div key={i} className="border-b border-slate-50 w-full h-0"></div>)}
      </div>

      <div className="bg-slate-100 hover:bg-indigo-500 w-full h-12 rounded-t-lg transition-all cursor-pointer"></div>
      <div className="bg-slate-100 hover:bg-indigo-500 w-full h-24 rounded-t-lg transition-all cursor-pointer"></div>
      <div className="bg-indigo-600 w-full h-40 rounded-t-lg shadow-lg shadow-indigo-100"></div>
      <div className="bg-slate-100 hover:bg-indigo-500 w-full h-32 rounded-t-lg transition-all cursor-pointer"></div>
      <div className="bg-slate-100 hover:bg-indigo-500 w-full h-20 rounded-t-lg transition-all cursor-pointer"></div>
      <div className="bg-indigo-400 w-full h-36 rounded-t-lg transition-all cursor-pointer"></div>
      <div className="bg-slate-100 hover:bg-indigo-500 w-full h-16 rounded-t-lg transition-all cursor-pointer"></div>
    </div>

    <div className="flex justify-between px-1 mb-8 text-[9px] font-black text-slate-400 uppercase">
      <span>08am</span><span>12pm</span><span>04pm</span><span>08pm</span>
    </div>

    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
        <p className="text-sm font-extrabold text-emerald-500">98.2%</p>
      </div>
      <div className="text-right">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Fleet</p>
        <p className="text-sm font-extrabold text-slate-800">42 Units</p>
      </div>
    </div>
  </div>
);

export default ActivityChart;