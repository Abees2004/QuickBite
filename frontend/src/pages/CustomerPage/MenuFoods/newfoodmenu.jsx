import React, { useState, useEffect } from 'react';
import RestaurantHero from './components/RestaurantHero';
import MenuItem from './components/MenuItem';
import RatingsSection from './components/ratings';
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router';
import axiosInstance from '../../../api/axiosapi';


const primaryColor = '#ff5722';

const FoodMenu = () => {
  const { id } = useParams();

  const [restaurantDetails, setRestaurantDetails] = useState(null);

  const [foodItems, setFoodItems] = useState([]);

  const [loadingRestaurant, setLoadingRestaurant] = useState(true);

  const [loadingFoods, setLoadingFoods] = useState(true);

  const [error, setError] = useState(null);

  // Fetch Restaurant Details
  useEffect(() => {
    setLoadingRestaurant(true);
    setError(null);

    axiosInstance
      .get(`/api/resturants/restaurants/${id}/`, {
        timeout: 5000,
      })
      .then((res) => {
        setRestaurantDetails(res.data);
        setLoadingRestaurant(false);
      })
      .catch((err) => {
        console.log(err);

        if (err.code === 'ECONNABORTED') {
          setError('Restaurant request timed out.');
        } else {
          setError('Failed to load restaurant details.');
        }

        setLoadingRestaurant(false);
      });
  }, [id]);

  // Fetch Food Items
  useEffect(() => {
    setLoadingFoods(true);

    axiosInstance
      .get(
        `/api/products/restaurant-foods-list/${id}/`,
        {
          timeout: 5000,
        }
      )
      .then((res) => {
        setFoodItems(res.data || []);
        setLoadingFoods(false);
      })
      .catch((err) => {
        console.log(err);

        if (err.code === 'ECONNABORTED') {
          setError('Food items request timed out.');
        } else {
          setError('Failed to load food items.');
        }

        setLoadingFoods(false);
      });
  }, [id]);

  const loading = loadingRestaurant || loadingFoods;

  const heroData = restaurantDetails
    ? { ...restaurantDetails }
    : {};

  return (
    <div className="font-sans antialiased bg-gray-50 text-gray-800 min-h-screen">
      <Navbar />

      <main className="container mx-auto px-6 py-8">

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>

            <p className="mt-4 text-gray-600">
              Loading restaurant menu...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700">
            <p>{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && (
          <>
            {/* Restaurant Hero */}
            <RestaurantHero
              data={heroData}
              primaryColor={primaryColor}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              <div className="lg:col-span-10">

                {/* Menu Items */}
                <section className="space-y-8">

                  <h2 className="text-3xl font-bold pt-4 pb-2 border-b border-gray-200">
                    All Items
                  </h2>

                  {foodItems.length > 0 ? (
                    foodItems.map((item) => (
                      <MenuItem
                        key={item.id}
                        item={item}
                        primaryColor={primaryColor}
                      />
                    ))
                  ) : (
                    <div className="bg-white p-6 rounded-lg shadow-sm text-gray-500 italic">
                      No food items are currently available.
                    </div>
                  )}

                  {/* Reviews */}
                  <RatingsSection />

                </section>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default FoodMenu;