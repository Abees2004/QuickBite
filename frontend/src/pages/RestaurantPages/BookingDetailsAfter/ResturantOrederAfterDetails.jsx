import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

import ResturantSidebar from '../../../components/ResturantSidebar';
import OrderItemsCard from './components/OrderItemsCard';
import DeliveryProgressCard from './components/DeliveryProgressCard';
import FinancialSummaryCard from './components/FinancialSummaryCard';
import DeliveryAddressCard from './components/DeliveryAddressCard';
import OrderStatusCard from './components/OrderStatusCard';
import axiosInstance from '../../../api/axiosapi';

const ResturantOrderDetailsAfter = () => {
  const { id } = useParams();

  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [address, setAddress] = useState({
    street_name: '',
    city: '',
    pincode: ''
  });

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axiosInstance
      .get(`/api/orders/orders/${id}/`, {
        timeout: 5000
      })
      .then((res) => {
        const data = res.data;

        setOrderDetails(data);
        setOrderItems(data?.items || []);

        setAddress({
          street_name: data?.street_name || '',
          city: data?.city || '',
          pincode: data?.pincode || ''
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to load order details');
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <style>{`
        .shadow-strong { box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 10px -2px rgba(0,0,0,0.05); }
        .map-container-height { height: 280px; }
      `}</style>

      <div className="bg-gray-50 text-gray-800 flex h-screen">

        {/* Sidebar */}
        <ResturantSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          activeSection="Orders"
        />

        <main className="flex-1 overflow-y-auto space-y-8">

          {/* Header */}
          <header className="bg-white p-4 shadow-md sticky top-0 z-10 lg:p-6">

            <div className="flex items-center justify-between">

              <button
                className="lg:hidden p-2 text-gray-600"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <i className="fa-solid fa-bars"></i>
              </button>

              <h1 className="text-3xl font-extrabold text-gray-900">
                Order Details
              </h1>

              <div className="w-8 lg:hidden"></div>
            </div>

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

          {/* Content */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 p-6 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-8">

                  {orderDetails && (
                    <OrderStatusCard orderDetails={orderDetails} />
                  )}

                  {orderItems.length > 0 && (
                    <OrderItemsCard orderItems={orderItems} />
                  )}

                </div>

                <div className="space-y-8 lg:col-span-1">

                  {orderDetails && (
                    <DeliveryProgressCard status={orderDetails.status} />
                  )}

                </div>

              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pb-4">

                {orderDetails && (
                  <FinancialSummaryCard total={orderDetails.total} />
                )}

                <DeliveryAddressCard location={address} />

              </div>
            </>
          )}

        </main>
      </div>
    </>
  );
};

export default ResturantOrderDetailsAfter;