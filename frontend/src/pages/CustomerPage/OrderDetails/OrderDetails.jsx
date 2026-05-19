import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import OrderItem from './components/OrderItem';
import PaymentSummary from './components/PaymentSummary';
import DeliveryAddress from './components/DeliveryAddress';
import axios from 'axios';
import DeliveryProgressCard from './components/DeliveryProgressCard';
import { useParams } from 'react-router';
import axiosInstance from '../../../api/axiosapi';

const OrderDetails = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  const [location, setLocation] = useState({
    street_name: '',
    city: '',
    pincode: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axiosInstance
      .get(`/api/orders/orders/${id}/`, {
        timeout: 5000,
      })
      .then((res) => {
        console.log(res.data);

        setOrderDetails(res.data);
        setItems(res.data.items || []);

        setLocation({
          street_name: res.data.street_name || '',
          city: res.data.city || '',
          pincode: res.data.pincode || '',
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        if (err.code === 'ECONNABORTED') {
          setError('The request timed out. Please try again.');
        } else {
          setError('Failed to fetch orders. Please check your connection.');
        }

        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Loading State */}
        {loading && (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>

            <p className="mt-4 text-gray-600">
              Loading your orders...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="col-span-full bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded">
            <p>{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm underline font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && (
          <>
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">

              {orderDetails && (
                <header className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-600 text-sm">
                    Order #{id}
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {orderDetails.restaurant?.name}
                  </h2>

                  <p className="text-gray-600 text-sm">
                    {orderDetails.restaurant?.street_name},{' '}
                    {orderDetails.restaurant?.city}{' '}
                    {orderDetails.restaurant?.pincode}
                  </p>
                </header>
              )}

              {/* Order Items */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                  Order Items ({items.length})
                </h3>

                <ul className="divide-y divide-gray-100">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <OrderItem key={item.id} {...item} />
                    ))
                  ) : (
                    <p className="text-gray-500 py-4">
                      No items found.
                    </p>
                  )}
                </ul>
              </section>

              {/* Payment Summary */}
              {orderDetails && (
                <PaymentSummary total={orderDetails.total} />
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">

              {orderDetails && (
                <DeliveryProgressCard
                  status={orderDetails.status}
                />
              )}

              {orderDetails && (
                <DeliveryAddress location={location} />
              )}

            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default OrderDetails;