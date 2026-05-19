import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EditAddressModal from './components/EditAddressModal';
import axios from 'axios';
import axiosInstance from '../../../api/axiosapi';

const CartView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cartItemsData, setcartItemsData] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // Fetch Cart Items
  useEffect(() => {
    setLoading(true);
    setError(null);

    axiosInstance.get('/api/cart/cart/', {timeout: 5000,})
      .then((res) => {
        setcartItemsData(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        if (err.code === 'ECONNABORTED') {
          setError('Request timed out. Please try again.');
        } else {
          setError('Failed to load cart items.');
        }

        setLoading(false);
      });
  }, [refresh]);

  // Calculate Total
  useEffect(() => {
    const totalbill = cartItemsData.reduce(
      (sum, item) => sum + item.quantity * item.food.price,
      0
    );

    setTotal(totalbill);
  }, [cartItemsData]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10 lg:py-16">

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>

            <p className="mt-4 text-gray-600">
              Loading your cart...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700">
            <p>{error}</p>

            <button
              onClick={() => setRefresh((prev) => !prev)}
              className="mt-2 text-sm font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty Cart */}
        {!loading && !error && cartItemsData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-bold text-gray-800">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-2">
              Add some delicious food to continue.
            </p>
          </div>
        )}

        {/* Cart Content */}
        {!loading && !error && cartItemsData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left Section */}
            <div className="lg:col-span-7">
              <h1 className="text-3xl font-bold mb-10">
                Your Basket
              </h1>

              <div className="border-t border-gray-100">
                {cartItemsData.map((item) => (
                  <CartItem
                    key={item.id}
                    items={item}
                    setrefresh={setRefresh}
                  />
                ))}
              </div>
            </div>

            {/* Right Section */}
            <OrderSummary
              onEditAddress={() => setIsModalOpen(true)}
              price={total}
              setrefresh={setRefresh}
            />
          </div>
        )}
      </main>

      {/* Address Modal */}
      <EditAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CartView;