import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import DeliverySteps from './components/DeliverySteps';
import axios from 'axios';
import DeliveryNavbar from '../../../components/DeliveryNavbar';
import { useParams } from 'react-router';
import axiosInstance from '../../../api/axiosapi';

const DeliveryTerminal = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get(
        `/api/delivery/my-orders/${id}/`
      );

      console.log(res.data);

      setOrder(res.data);
      setOrderItems(res.data?.items || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  return (
    <div className="bg-[#fafafa] text-slate-900 flex flex-col min-h-screen">
      <DeliveryNavbar />

      <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">

        {/* Sidebar */}
        <Sidebar items={orderItems} />

        <main className="flex-grow overflow-y-auto p-6 md:p-12 order-1 md:order-2">

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

          {!loading && !error && order && (
            <DeliverySteps
              order={order}
              onStatusChange={fetchOrder}
            />
          )}

        </main>
      </div>
    </div>
  );
};

export default DeliveryTerminal;
