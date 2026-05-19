import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../../../api/axiosapi";

const JobSection = ({order,refresh}) => {
  return (
    <div className="lg:w-[60%]">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          Available Jobs 
          <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
        </h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-tight">3 nearby</span>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[12px] shadow-sm overflow-hidden">
        {/* Job Item 1 */}
        <div className="group flex items-center gap-6 p-6 transition-all hover:bg-slate-50/50 border-b border-slate-100 last:border-0">
          <div className="relative">
            <img src={order.restaurant?.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm border-2 border-white" />
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">${order.total}</div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-start gap-3 relative">
              <div className="absolute left-[5px] top-[14px] bottom-[-18px] w-[1.5px] bg-slate-100"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1 ring-4 ring-indigo-50"></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Pick up</p>
                <h3 className="text-sm font-extrabold text-slate-800">{order.restaurant?.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1">{order.restaurant?.street_name},{order.restaurant?.city},{order.restaurant?.pincode}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 ring-4 ring-emerald-50"></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Drop off</p>
                <h3 className="text-sm font-extrabold text-slate-800">{order.customer?.username}</h3>
                <p className="text-[11px] text-slate-500 mt-1">{order.street_name},{order.city},{order.pincode}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase">#{order.id}</p>
              </div>
            </div>
          </div>
          <button onClick={()=>{
            axiosInstance.patch(`/api/delivery/assign-order/${order.id}/`,{status:"ASSIGNED"})
            .then(res=>{
              toast.success('Order was Assigned to You')
              console.log(res.data)
              refresh(prev=>!prev)
            })
            .catch(err=>{
            console.log(err)
            toast.info(JSON.stringify(err.response.data));

            })
          }}
          
          className="h-10 px-6 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default JobSection;