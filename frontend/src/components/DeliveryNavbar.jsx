import React, { useState } from 'react';
import { Links } from 'react-router';
import { Link } from 'react-router-dom';

const DeliveryNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 py-1 border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                                <span className="text-white font-black text-xl">Y</span>
                            </div>
                            <span className="font-bold text-xl text-gray-800 hidden sm:block">
                                Your<span className="text-orange-600">Logo</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to='/delivery/dashboard' className="text-gray-700 font-medium hover:text-orange-600 transition-colors">Dashboard</Link>
                        <Link to='/delivery/waitingOrders' className="text-gray-700 font-medium hover:text-orange-600 transition-colors">Waiting Orders</Link>
                        <Link to='/delivery/orders' className="text-gray-700 font-medium hover:text-orange-600 transition-colors">Orders</Link>
                    
                    
                    </div>

                    {/* Desktop Actions (Cart & Profile) */}
                    <div className="hidden md:flex items-center space-x-6">

                        {/* Profile Picture */}
                        <Link to="/delivery/profile" className="flex items-center">
                            <img 
                                className="h-10 w-10 rounded-full border-2 border-transparent hover:border-orange-200 transition-all duration-300 object-cover cursor-pointer shadow-sm"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
                                alt="Profile" 
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none" 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pt-2 pb-6 space-y-2 bg-gray-50 border-t border-gray-100">
                    <Link to='/' className="block py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all">Home</Link>
                    <Link to='/restaurants' className="block py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all">Restaurants</Link>

                    <div className="pt-4 flex flex-col gap-2 border-t border-gray-200">
                        <Link to='/login' className="text-center py-3 text-gray-700 font-semibold">Login</Link>
                        <Link to='/register' className="text-center py-3 bg-orange-600 text-white rounded-xl font-semibold shadow-md shadow-orange-100">Register</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DeliveryNavbar;