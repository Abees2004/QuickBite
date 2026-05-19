import React, { useEffect, useState } from 'react';
import ResturantSidebar from '../../../components/ResturantSidebar';
import ProfileDisplay from './components/ProfileDisplay';
import ProfileForm from './components/ProfileForm';
import axios from 'axios';
import axiosInstance from '../../../api/axiosapi';

const RestaurantProfile = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [resturantDetails, setResturantDetails] = useState(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await axiosInstance.get(
          '/api/resturants/restaurant-profile/'
        );

        setResturantDetails(res.data);

      } catch (err) {
        console.log(err);
        setError('Failed to load restaurant details');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantProfile();

  }, [refreshTrigger]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans relative">

      {/* Sidebar */}
      <ResturantSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeSection="Partners"
      />

      {/* Main */}
      <main className="flex-1 h-full overflow-y-auto transition-all duration-300">

        {/* Mobile Header */}
        <div className="sm:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-30">
          <span className="font-bold text-blue-600">
            RestaurantPanel
          </span>

          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 bg-slate-100 rounded-lg text-slate-600"
          >
            <i className="fa-solid fa-bars-staggered text-xl"></i>
          </button>
        </div>

        <div className="p-4 md:p-12 max-w-5xl mx-auto">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>

              <p className="mt-4 text-gray-600">
                Loading restaurant details...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded-lg">
              <p>{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm underline font-bold"
              >
                Retry
              </button>
            </div>
          )}

          {/* Main Content */}
          {!loading && !error && (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                  {resturantDetails?.name || 'Restaurant'}
                </h1>

                <p className="text-slate-500">
                  Manage how your customers see your business.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-200 mb-8 space-x-8 overflow-x-auto no-scrollbar">

                <button
                  onClick={() => setActiveTab('view')}
                  className={`pb-4 text-sm font-medium border-b-2 transition ${
                    activeTab === 'view'
                      ? 'text-orange-600 border-orange-600 font-bold'
                      : 'text-slate-500 border-transparent'
                  }`}
                >
                  VIEW DETAILS
                </button>

                <button
                  onClick={() => setActiveTab('edit')}
                  className={`pb-4 text-sm font-medium border-b-2 transition ${
                    activeTab === 'edit'
                      ? 'text-orange-600 border-orange-600 font-bold'
                      : 'text-slate-500 border-transparent'
                  }`}
                >
                  EDIT DETAILS
                </button>

              </div>

              {/* Tab Content */}
              <div className="animate-in fade-in duration-300">

                {activeTab === 'view' ? (

                  <ProfileDisplay
                    resturant={resturantDetails}
                  />

                ) : (

                  <ProfileForm
                    resturant={resturantDetails}
                    onSuccess={() => {
                      setRefreshTrigger(prev => prev + 1);
                      setActiveTab('view');
                    }}
                  />

                )}

              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default RestaurantProfile;