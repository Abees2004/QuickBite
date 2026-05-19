import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar.jsx'
import BookingTable from './Components/BookingTable.jsx';
import axios from 'axios';

const AdminBookingsPage = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen  bg-gray-100 font-sans">
            
            <Sidebar 
                isOpen={isMobileSidebarOpen} 
                onClose={() => setIsMobileSidebarOpen(false)} 
                activeSection="Partners"
            />

            <div className="flex-1 flex flex-col overflow-y-auto">
                <header className="bg-white p-4 shadow-md sticky top-0 z-10 lg:p-6">
                <div className="flex items-center justify-between">
                    <button 
                    className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setIsMobileSidebarOpen(true)}
                    >
                    <i className="fa-solid fa-bars"></i>
                    </button>

                    <h1 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
                    Manage Bookings
                    </h1>
                    <div className="w-8 lg:hidden"></div> 
                </div>
                </header>

                <main className="p-6 md:p-10 flex-1 grid grid-cols-1 lg:grid-cols-1 gap-8">
                    
                    <BookingTable />
                    
                </main>
            </div>
        </div>
    );
};

export default AdminBookingsPage;