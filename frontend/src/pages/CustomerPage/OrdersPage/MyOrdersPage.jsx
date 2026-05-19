import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import OrderCard from './components/OrderCard';
import axios from 'axios';
import axiosInstance from '../../../api/axiosapi';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/api/orders/orders/`, { timeout: 5000 })
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (err.code === 'ECONNABORTED') {
          setError("The request timed out. Please try again.");
        } else {
          setError("Failed to fetch orders. Please check your connection.");
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 pb-2">
          My Recent Orders 
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading your orders...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
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

        {/* Data State */}
        {!loading && !error && (
          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <p className="text-center text-gray-500">No orders found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyOrdersPage;