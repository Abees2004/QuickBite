import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AppNavbar from '../../../components/Navbar';
import RestaurantCard from './components/RestaurantCard';
import FilterSidebar from './components/FilterSidebar';
import axiosInstance from '../../../api/axiosapi';

const RestaurantListings = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState({});
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    
    const searchRef = useRef(null);
    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/api/resturants/restaurants/`, {
            params: {
                search: searchText,
                ...filters
            }
        })
        .then(res => {
            setRestaurants(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching restaurants:", err);
            setLoading(false);
        });
    }, [searchText, filters]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(searchRef.current.value);
    };

    const handleFilters = (dataFromFilter) => {
        setFilters(dataFromFilter);
    };

    const toggleFilterSidebar = () => {
        setIsFilterSidebarOpen(!isFilterSidebarOpen);
        document.body.classList.toggle('overflow-hidden', !isFilterSidebarOpen);
    };

    const filterBtnClass = "px-4 py-2 rounded-full font-medium text-sm bg-white border border-gray-200 text-gray-600 transition-all duration-200 hover:border-orange-500 hover:text-orange-600";

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            <AppNavbar />

            {/* Filter Sidebar */}
            <FilterSidebar 
                onApply={handleFilters} 
                isOpen={isFilterSidebarOpen} 
                onClose={toggleFilterSidebar} 
            />

            <section className="container mx-auto max-w-6xl px-4 pt-8 pb-16">
                
                {/* Header Actions: Filters + Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    
                    {/* Left: Filter Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button 
                            className={`${filterBtnClass} flex items-center gap-2`} 
                            onClick={toggleFilterSidebar}
                        >
                            <i className="fa-solid fa-filter"></i>
                            Filter
                        </button>
                        
                    </div>

                    {/* Right: Search Field */}
                    <form onSubmit={handleSearch} className="flex w-full md:w-96 items-center">
                        <div className="relative flex-grow">
                            <input 
                                type="text" 
                                placeholder="Search restaurants..." 
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
                                ref={searchRef}
                            />
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                        <button 
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-r-lg font-medium transition-colors"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <h3 className="text-2xl font-bold text-black mb-6">Restaurants to explore</h3>

                {/* Restaurant Cards Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                        <p className="mt-4 text-gray-500">Finding delicious food...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {restaurants.length > 0 ? (
                            restaurants.map(restaurant => (
                                <RestaurantCard 
                                    key={restaurant.id}
                                    {...restaurant}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                No restaurants found matching your criteria.
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default RestaurantListings;