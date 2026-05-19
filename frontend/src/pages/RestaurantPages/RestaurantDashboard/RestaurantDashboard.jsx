import React, { useEffect, useState } from 'react';
import ResturantSidebar from '../../../components/ResturantSidebar';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import PendingRequests from './components/PendingRequests';
import RecentOrders from './components/RecentOrders';
import axios from 'axios';
import axiosInstance from '../../../api/axiosapi';

const RestaurantDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [statsDetails, setStatsDetails] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dashboard Stats
  useEffect(() => {
    setError(null);

    axiosInstance
      .get('/api/resturants/dashboard/', {
        timeout: 5000,
      })
      .then((res) => {
        setStatsDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to load dashboard stats');
      });
  }, [refresh]);

  // Pending Orders
  useEffect(() => {
    axiosInstance
      .get('/api/orders/request-orders/', {
        timeout: 5000,
      })
      .then((res) => {
        setPendingOrders(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  // Recent Orders
  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get('/api/orders/orders/', {
        timeout: 5000,
      })
      .then((res) => {
        setRecentOrders(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">

      {/* Sidebar */}
      <ResturantSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <main className="flex-1 overflow-y-auto relative">

        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-4 md:p-8 max-w-[1600px] mx-auto">

          {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading your orders...</p>
          </div>
          )}

          {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-sm underline font-bold"
            >
              Retry
            </button>
          </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
          <StatsGrid statsDetails={statsDetails} />

          {/* Content */}
          <div className="space-y-10 mt-6">

            <PendingRequests
              pendingOrders={pendingOrders}
              refresh={setRefresh}
            />

            <RecentOrders orders={recentOrders} />

          </div>
          </>
          )}

        </div>
      </main>
    </div>
  );
};

export default RestaurantDashboard;