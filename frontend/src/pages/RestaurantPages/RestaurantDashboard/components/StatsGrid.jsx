import React from 'react';

const StatsGrid = ({statsDetails}) => {
    if (!statsDetails) {
    return <div>Loading stats...</div>;
  }
  return (
    <section className="sticky top-[73px] z-10 bg-[#F8FAFC] pt-2 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Revenue */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-100 shadow-sm">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-sack-dollar text-sm"></i>
          </div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[1.5px]">Total Revenue</span>
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-1">${statsDetails?.total_revenue}</h3>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-100 shadow-sm">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-cart-shopping text-sm"></i>
          </div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[1.5px]">Total Orders</span>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">{statsDetails?.total_orders}</h3>
          </div>
        </div>

        {/* Card 3: Pending */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-100 shadow-sm">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-clock-rotate-left text-sm"></i>
          </div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[1.5px]">Pending Orders</span>
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-1">{statsDetails?.pending_orders}</h3>
        </div>

        {/* Card 4: Rating */}
        <div className="bg-white p-6 rounded-[16px] border border-slate-100 shadow-sm">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-star-half-stroke text-sm"></i>
          </div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[1.5px]">Rating</span>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">{statsDetails?.average_rating}</h3>
            <span className="text-slate-400 text-[9px] font-bold uppercase">{statsDetails?.total_reviews} Reviews</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsGrid;