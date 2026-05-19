import React from 'react';

const Sidebar = ({ items }) => {

  console.log("itemsi", items?.items);

  if (!items || !items.items || items.items.length === 0) {
    return <p>no items...</p>;
  }

  return (
    <aside className="w-full md:w-[350px] bg-white border-t md:border-t-0 md:border-r border-slate-200 flex flex-col order-2 md:order-1">

      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            Current Assignment
          </span>

          <span className="bg-slate-900 text-white text-[10px] px-2 py-1 rounded">
            #{}
          </span>
        </div>

        <h2 className="text-xl font-bold">Priority Delivery</h2>

        <div className="mt-4 grid grid-cols-2 gap-3">
        </div>
      </div>

      <div className="p-6 space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Manifest Content
        </h3>

        <div className="space-y-4">

          {items.items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-start"
            >
              <p className="font-semibold text-sm">
                {item.quantity} x {item.food.name}
              </p>
            </div>
          ))}

        </div>
      </div>

    </aside>
  );
};

export default Sidebar;