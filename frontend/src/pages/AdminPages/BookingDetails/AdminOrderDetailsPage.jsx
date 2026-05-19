import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import OrderHeader from './components/OrderHeader';
import LogisticsCard from './components/LogisticsCard';
import OrderItemsCard from './components/OrderItemsCard';
import DeliveryProgressCard from './components/DeliveryProgressCard';
import LiveTrackerCard from './components/LiveTrackerCard';
import FinancialSummaryCard from './components/FinancialSummaryCard';
import DeliveryAddressCard from './components/DeliveryAddressCard';
import axios from 'axios';
import { useParams } from 'react-router';
import axiosInstance from '../../../api/axiosapi';


const CustomStyles = () => (
  <style>
    {`
      /* Custom Styles for shadows and height */
      .shadow-strong { box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05); }
      .map-container-height { height: 280px; } 

      /* Status colors - Adjusted for Admin context */
      .status-badge {
          font-size: 0.75rem; 
          font-weight: 700; 
          padding: 4px 12px;
          border-radius: 9999px; 
          text-transform: uppercase;
          letter-spacing: 0.05em; 
      }
      .status-delivered { background-color: #059669; color: #d1fae5; } /* Green: Delivered */
      .status-preparing { background-color: #f97316; color: #fff; } /* Orange: Active/Preparing/In Transit */
      .status-cancelled { background-color: #dc2626; color: #fee2e2; } /* Red: Issue/Cancelled */

      /* Timeline/Tracker Styling - Enhanced for Admin clarity */
      .timeline-item {
          position: relative;
          padding-left: 25px; /* Increased padding */
          padding-bottom: 1.5rem; /* Increased spacing */
      }
      .timeline-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #d1d5db; /* gray-300 */
          z-index: 1;
      }
      .timeline-item.active::before {
          background-color: #f97316; 
          box-shadow: 0 0 0 3px #fff, 0 0 0 5px #fdbf8d; /* Soft rings for current step */
      }
      .timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 5px;
          top: 18px;
          height: 100%;
          width: 2px;
          background-color: #fbd38d; /* Light orange line */
          z-index: 0;
      }
    `}
  </style>
);

const AdminOrderDetailsPage = () => {
  const {id}=useParams()
  const [orderDetails,setOrderDetails]=useState()
  const [orderItems,setOrderItems]=useState([])
  const [address,setAddress]=useState({
    'street_name':'',
    'city':'',
    'pincode':''
  })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    setLoading(true)
    setError(null)

    axiosInstance.get(`/api/orders/orders/${id}/`,{timeout:5000})
    .then(res=>{
      setOrderDetails(res.data)
      console.log(res.data)
      setAddress({
        street_name:res.data?.street_name || '',
        city:res.data?.city || '',
        pincode:res.data.pincode
      })
      setOrderItems(res.data.items)
      setLoading(false)
    })
    .catch(err=>{
      console.log(err);
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else {
        setError('Failed to load order details.');
      }
      setLoading(false);
    })
  },[])


  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <>
      <CustomStyles /> 
      <div className="bg-gray-50 text-gray-800 flex h-screen">
      <Sidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
        activeSection="Partners"
      />

        <main className="flex-1 overflow-y-auto  space-y-8">
          <header className="bg-white p-4 shadow-md sticky top-0 z-10 lg:p-6">
          <div className="flex items-center justify-between">
            <button 
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
            <i class="fa-solid fa-bars"></i>
            </button>

            <header className="flex justify-between items-center pb-4">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Order Details
              </h1>
            </header>
            
            <div className="w-8 lg:hidden"></div>
          </div>
        </header>


          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mx-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
              {error}
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
          <div className="grid grid-cols-1 p-6 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-8">
              <LogisticsCard details={orderDetails} />
              {orderItems && <OrderItemsCard orderItems={orderItems}/>}
            </div>

            <div className="space-y-8 lg:col-span-1">
              {orderDetails && <DeliveryProgressCard status={orderDetails.status}/>}
            </div>
            
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pb-4">
              {orderDetails && <FinancialSummaryCard total={orderDetails.total}/>}
              {orderDetails && <DeliveryAddressCard location={address}/>}
          </div>
          </>
          )}
          
        </main>
      </div>
    </>
  );
};

export default AdminOrderDetailsPage; 