import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Sidebar from './components/Sidebar';
import OverviewTab from './components/OverviewTab';
import EditProfileTab from './components/EditProfileTab';
import PartnerRegister from '../PartnerRegister/PartnerRegister';
import DeliveryPartnerRegister from '../DeliveryPartnerRegister/DeliveryPartnerRegister';
import axios from 'axios';
import axiosInstance from '../../../api/axiosapi';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userDetails,setUserDetails]=useState()
  const [refresh,setRefresh]=useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    setLoading(true);
    setError(null);

    axiosInstance.get(`/api/users/user-profile/`,{timeout:5000})
    .then(res=>{
      setUserDetails(res.data)
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);

      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else if (err.response?.status === 401) {
        setError('You are not authorized. Please login again.');
      } else {
        setError('Failed to load profile details.');
      }

      setLoading(false);
    })
  },[refresh])

  return (
    <div className="min-h-screen antialiased text-slate-900 bg-[radial-gradient(circle_at_top_right,_#fff7ed,_#f8fafc)]">
      <Navbar />

      <div className="relative pt-12 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[80%] bg-orange-300 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[80%] bg-rose-300 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Profile</h1>
          <p className="text-slate-500 mt-2 font-medium">Customize your ordering experience and security.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 mb-20">

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>

            <p className="mt-4 text-slate-600">
              Loading profile...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <p>{error}</p>

            <button
              onClick={() => setRefresh((prev) => !prev)}
              className="mt-2 text-sm underline font-semibold"
            >
              Retry
            </button>
          </div>
        )}
        {/* Success State */}
        {!loading && !error && (
        <div className="flex flex-col lg:flex-row gap-8 lg:px-10">
          
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={userDetails} />

          <div className="lg:w-3/4">
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-2xl shadow-black/5 rounded-[26px] p-8 md:p-12 min-h-[500px]">

              {activeTab === 'overview' && <OverviewTab user={userDetails}/>}

              {activeTab === 'edit' && <EditProfileTab refresh={setRefresh}/>}

              {activeTab === 'partner' && <PartnerRegister/>}

              {activeTab === 'delivery' && <DeliveryPartnerRegister/>}

            </div>
          </div>

        </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;