import React, { useEffect, useState } from 'react';
import StatsGrid from './components/StatsGrid';
import JobSection from './components/JobSection';
import SidebarActivity from './components/SidebarActivity';
import DeliveryNavbar from '../../../components/DeliveryNavbar';
import CurrentJobSection from './components/CurrentJobSection';
import axios from 'axios';
import axiosInstance from '../../../api/axiosapi';

const DeliveryDashboard = () => {
  const [currentJob, setCurrentJob] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [deliveredJobs, setDeliveredJobs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [activeRes, availableRes, deliveredRes] = await Promise.all([
          axiosInstance.get(`/api/delivery/active-orders/`),
          axiosInstance.get(`/api/delivery/available-orders/`),
          axiosInstance.get(`/api/delivery/delivered-orders/`),
        ]);

        setCurrentJob(activeRes.data || []);
        setAvailableJobs(availableRes.data || []);
        setDeliveredJobs(deliveredRes.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <DeliveryNavbar />

      <main className="max-w-7xl mx-auto p-6 lg:p-10">

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
          <>
            <StatsGrid />

            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Left side */}
              <div className="flex-1">
                {currentJob.length > 0 ? (
                  <CurrentJobSection order={currentJob[0]} />
                ) : (
                  availableJobs.map(job => (
                    <JobSection key={job.id} order={job} refresh={setRefresh} />
                  ))
                )}
              </div>

              {/* Right side */}
              <SidebarActivity order={deliveredJobs?.[0]} />
            </div>
          </>
        )}

      </main>
    </div>
  );
};

export default DeliveryDashboard;