import React from 'react';

const OverviewTab = ({user}) => {

if (!user) {
    return (
      <div className="p-8 text-center text-slate-500 italic">
        Loading user details...
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="text-2xl font-black mb-10 text-slate-800">Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Name</label>
            <p className="font-bold text-slate-700">{user.username}</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</label>
            <p className="font-bold text-slate-700">{user.email}</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone No</label>
            <p className="font-bold text-slate-700">{user.phno}</p>
          </div>
  
      </div>
      <div className="pt-6 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bio Description</label>
        <p className="mt-2 font-medium text-slate-600 leading-relaxed max-w-2xl">
          {user.bio}
        </p>
      </div>
    </div>
  );
};

export default OverviewTab;