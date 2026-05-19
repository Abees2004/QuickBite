import React, { useEffect, useState } from 'react';
import OrderCard from './components/OrderCard';
import axios from 'axios';
import DeliveryNavbar from '../../../components/DeliveryNavbar';
import axiosInstance from '../../../api/axiosapi';

const DeliveryOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get(
          `/api/delivery/available-orders/`
        );

        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [refresh]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-24">
      <DeliveryNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        <header className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Partner Feed
          </h2>
          <p className="text-slate-500 font-medium">
            Available opportunities for delivery partners
          </p>
        </header>

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

        {!loading && !error && (
          <div className="flex flex-col gap-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  refresh={setRefresh}
                />
              ))
            ) : (
              <p className="text-slate-400 text-sm">
                No orders available right now.
              </p>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default DeliveryOrdersPage;