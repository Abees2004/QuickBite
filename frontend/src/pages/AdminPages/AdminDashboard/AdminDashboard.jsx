import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import StatsGrid from './components/StatsGrid';
import DispatchItem from './components/DispatchItem';
import ActivityChart from './components/ActivityChart';
import axios from 'axios';
import axiosInstance from '../../../api/axiosapi';

const AdminDashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [statsDetails, setStatsDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);
  // Dashboard Stats
  useEffect(() => {
    setLoadingStats(true);
    setError(null);

    axiosInstance.get('/api/orders/admin-dashboard/', {
        timeout: 5000,
      })
      .then((res) => {
        setStatsDetails(res.data);
        setLoadingStats(false);
      })
      .catch((err) => {
        console.log(err);

        setError('Failed to load dashboard stats.');
        setLoadingStats(false);
      });
  }, []);

  // Orders
  useEffect(() => {
    setLoadingOrders(true);

    axiosInstance
      .get('/api/orders/orders/', {
        timeout: 5000,
      })
      .then((res) => {
        setOrders(res.data || []);
        setLoadingOrders(false);
      })
      .catch((err) => {
        console.log(err);

        setError('Failed to load orders.');
        setLoadingOrders(false);
      });
  }, []);

  const loading = loadingStats || loadingOrders;

  return (
    <div className="flex h-screen bg-[#fcfcfd] text-slate-800 font-sans overflow-hidden">

      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeSection="Dashboard"
      />

      <main className="flex-1 overflow-y-auto min-w-0">

        <div className="p-6 lg:p-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">

            <div className="flex items-center gap-4 w-full md:w-auto">

              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-3 bg-white border border-slate-100 rounded-2xl shadow-sm"
              >
                <i className="fa-solid fa-bars-staggered"></i>
              </button>

              <div className="relative flex-1 md:w-96">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>

                <input
                  type="text"
                  placeholder="Search orders, partners..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
                />
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="hidden sm:block text-right">
                <p className="text-sm font-black text-slate-900">
                  Super Admin
                </p>

                <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1">
                  System Online
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=0f172a&color=fff"
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              </div>

            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
              {error}

              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm underline font-semibold block"
              >
                Retry
              </button>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              <StatsGrid stats={statsDetails} />

              <div className="flex flex-col lg:flex-row gap-8">

                {/* Dispatch */}
                <div className="lg:w-[60%]">

                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-extrabold text-slate-800">
                      Active Dispatch
                    </h2>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-white border rounded-xl text-[10px] font-black uppercase text-slate-500">
                        Filter
                      </button>

                      <button className="px-4 py-2 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white">
                        Live Map
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden">

                    {orders.length > 0 ? (
                      orders.map((ord) => (
                        <DispatchItem key={ord.id} order={ord} />
                      ))
                    ) : (
                      <p className="p-6 text-gray-500">
                        No active orders
                      </p>
                    )}

                  </div>
                </div>

                {/* Activity */}
                <div className="lg:w-[40%]">

                  <div className="flex items-center justify-between mb-6 px-2">

                    <div>
                      <h2 className="text-xl font-extrabold text-slate-800">
                        System Activity
                      </h2>

                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                        Orders per hour
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-black text-indigo-600">
                        1,240
                      </p>

                      <p className="text-[9px] font-bold text-slate-400 uppercase">
                        Total Today
                      </p>
                    </div>

                  </div>

                  <ActivityChart />

                </div>

              </div>
            </>
          )}

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;