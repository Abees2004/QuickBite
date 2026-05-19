import React, { useEffect, useState } from 'react';
import OrderCard from './components/OrderCard';
import DeliveryNavbar from '../../../components/DeliveryNavbar';
import axios from 'axios';
import axiosInstance from '../../../api/axiosapi';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get(
          `/api/delivery/my-orders/`
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
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <DeliveryNavbar />

      <main className="w-full px-4 md:px-10 py-10">

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-black tracking-tight mb-2">
            Orders Management
          </h2>
        </div>

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
          <div className="flex flex-col gap-8">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                />
              ))
            ) : (
              <p className="text-gray-400 text-sm">
                No orders found.
              </p>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default AllOrders;