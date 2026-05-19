import { useEffect, useState } from 'react';
import ResturantSidebar from '../../../components/ResturantSidebar';
import CategoryForm from './Components/CategoryForm';
import CategoryTable from './Components/CategoryTable';
import FoodModal from './Components/FoodModal';
import axios from 'axios';
import axiosInstance from '../../../api/axiosapi';

const AddFoodPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // State for Modal Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foods,setFoods]=useState([])
  const [refresh,setRefresh]=useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    setLoading(true)
    setError(null)
    axiosInstance.get(`/api/products/resturant-food-items/`,{timeout:5000})
    .then(res=>{
      console.log(res.data)
      setFoods(res.data)
      setLoading(false)
    })
    .catch(err=>{
      console.error(err);
      setError("Failed to load food items");
      setLoading(false)
    })
  },[refresh])

  // Function to open modal with specific food data
  const handleViewFood = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

    


  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans relative">
      
      {/* 1. Sidebar Component */}
      <ResturantSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
        activeSection="Partners"
      />


      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Unified Responsive Header */}
        <header className="bg-white p-4 md:p-6 shadow-md sticky top-0 z-10 flex items-center gap-4">
          <button 
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <i className="fa-solid fa-bars"></i> 
          </button>

          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            Food Management 🍔
          </h1>
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
        <main className="p-4 md:p-10 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* Table Area (Now passes the handleViewFood function) */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <CategoryTable onView={handleViewFood} foods={foods} />
            </div>

            {/* Form Area */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <CategoryForm refresh={setRefresh}/>
            </div>
            
          </div>
        </main>
        )}
      </div>

      {/* 4. Pop-up Modal (Update/View Food) */}
      <FoodModal 
        isOpen={isModalOpen}
        refresh={setRefresh} 
        onClose={() => setIsModalOpen(false)} 
        food={selectedFood}
      />

      {/* 5. Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AddFoodPage;