import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import PartnerUserDetailsModal from './components/PartnerUserDetailsModal';
import PartnerUserListTable from './components/PartnerUserListTable'; 
import axios from 'axios';
import axiosInstance from '../../../api/axiosapi';

const ManagePartners = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true)
        setError(null)
        axiosInstance.get(`/api/users/partners-list/`,{timeout:5000})
            .then(res => {
                console.log(res.data);
                setUsers(res.data);
                setLoading(false)
            })
            .catch(err =>{
                console.log(err);
                if (err.code === 'ECONNABORTED') {
                    setError('Request timed out. Please try again.');
                } 
                else {
                    setError('Failed to load Partners.');
                }
                setLoading(false);}
            );
    }, []);

    const handleToggleBlock = (userId, action) => {
        const newIsActive = action === 'unblock'; 

        // 1. Update the main users list state
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId
                    ? { ...user, is_active: newIsActive }
                    : user
            )
        );

        // 2. Update the selected user state for the modal, if it's open for this user
        setSelectedUser(prev => {
            if (prev && prev.id === userId) {
                return { ...prev, is_active: newIsActive };
            }
            return prev;
        });
    };

    const handleShowDetails = (user) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev); // Toggle function

    return (
        <div className="bg-gray-100 font-sans min-h-screen">
            <div className="flex h-screen overflow-hidden">
                {/* --- Sidebar Component --- */}
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    onClose={() => setIsSidebarOpen(false)} 
                    activeSection="Partners" // Explicitly pass active section
                />
                
                {/* --- Main Content Area --- */}
                <div className="flex-1 flex flex-col overflow-y-auto">
                    
                    <header className="bg-white p-4 md:p-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center sticky top-0 z-10">
                        
                        <div className="flex items-center">
                            {/* --- Mobile Menu Button --- */}
                            <button 
                                onClick={toggleSidebar} 
                                className="sm:hidden p-2 mr-2 text-gray-600 hover:text-gray-900"
                            >
                                <i class="fa-solid fa-bars"></i>
                            </button>
                            {/* --- Page Title --- */}
                            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-0">Partner Management 👥</h1>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2 sm:mt-0">
                            <div className="text-xs sm:text-sm text-gray-500 font-medium">Last Updated: Nov 15, 2025</div>
                            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition duration-150">
                                Add New User
                            </button>
                        </div>
                    </header>



                    {/* Loading */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="m-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                        {error}

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-2 text-sm underline font-semibold block"
                        >
                            Retry
                        </button>
                        </div>
                    )}




            
                    { !loading && !error && (
                    <main className="p-4 md:p-10 flex-1">
                        <PartnerUserListTable
                            users={users}
                            onToggleBlock={handleToggleBlock}
                            onShowDetails={handleShowDetails}
                        />
                    </main>
                    )}
                </div>
            </div>

            {/* Modal */}
            <PartnerUserDetailsModal
                user={selectedUser}
                onClose={handleCloseModal}
                onToggleBlock={handleToggleBlock}
            />
        </div>
    );
};

export default ManagePartners;