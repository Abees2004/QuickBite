import React from 'react';

const Header = ({ onMenuClick }) => (
  <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 flex justify-between items-center sticky top-0 z-40">
    <div className="flex items-center gap-4">
      {/* Mobile Toggle Icon */}
      <button 
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <i className="fa-solid fa-bars-staggered text-xl"></i>
      </button>

      <h1 className="text-lg font-black text-slate-800 tracking-tight">Overview</h1>
      <div className="hidden md:flex items-center bg-slate-100 px-3 py-1 rounded-full">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Store Open</span>
      </div>
    </div>

    <div className="flex items-center space-x-6">
      <div className="relative cursor-pointer">
        <i className="fa-solid fa-bell text-slate-400 text-lg"></i>
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">3</span>
      </div>
      <div className="relative hidden sm:block">
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
        <input 
          type="text" 
          placeholder="Search orders..." 
          className="bg-slate-50 border-none rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-orange-500 w-64 transition-all" 
        />
      </div>
    </div>
  </header>
);

export default Header;