import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axiosInstance from '../../../../api/axiosapi';

const PendingRequests = ({ pendingOrders = [], setRefresh }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if parent already provides data, stop loading
    if (pendingOrders) {
      setLoading(false);
    }
  }, [pendingOrders]);

  const handleAction = async (id, status, successMsg, errorMsg) => {
    try {
      setError(null);

      const res = await axiosInstance.patch(
        `/api/orders/orders-status/${id}/`,
        { status }
      );

      console.log(res.data);
      alert(successMsg);
      setRefresh(prev => !prev);

    } catch (err) {
      console.log(err);
      setError(errorMsg);
    }
  };

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <div className="py-10 text-center text-slate-500">
        <div className="w-6 h-6 mx-auto mb-2 border-2 border-slate-300 border-t-orange-500 rounded-full animate-spin"></div>
        Loading pending requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between px-2">
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-[2px]">
          Pending Requests
        </h2>

        <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
          {pendingOrders.length} NEW
        </span>
      </div>

      {pendingOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4"
        >

          <div className="flex items-center gap-3 w-full md:w-1/4">
            <div>
              <p className="text-[10px] font-black text-slate-400">#{order.id}</p>
              <p className="text-sm text-slate-800 font-bold">
                {order.customer?.username}
              </p>
            </div>
          </div>

          <div className="flex-1 w-full md:px-4 md:border-l border-slate-100">
            <p className="text-[11px] text-slate-500 font-medium mb-1">
              <i className="fa-solid fa-location-dot mr-1"></i>
              {order.street_name}, {order.city}, {order.pincode}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 pt-3 md:pt-0">

            <p className="text-xl font-black text-slate-800">
              ${Number(order.total || 0).toFixed(2)}
            </p>

            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  handleAction(order.id, 'APPROVED', 'Order Accepted', 'Failed')
                }
                className="px-4 py-2 bg-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  handleAction(order.id, 'REJECTED', 'Order Rejected', 'Failed')
                }
                className="px-4 py-2 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600"
              >
                Reject
              </button>

              <Link
                to={`/resturant/bookings/request/${order.id}`}
                className="text-blue-600 text-xs font-bold hover:underline"
              >
                View
              </Link>

            </div>
          </div>
        </div>
      ))}

      {pendingOrders.length === 0 && (
        <p className="text-center text-slate-400 text-sm py-10">
          No pending requests.
        </p>
      )}

    </div>
  );
};

export default PendingRequests;