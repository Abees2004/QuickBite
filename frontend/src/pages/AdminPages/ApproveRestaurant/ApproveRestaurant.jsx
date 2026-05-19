import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import PartnerUserDetailsModal from './components/PartnerUserDetailsModal';
import PartnerUserListTable from './components/PartnerUserListTable';
import axios from 'axios';
import axiosInstance from '../../../api/axiosapi';

const ApproveRestaurant = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [refresh,setRefresh]=useState(false)
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true)
        setError(null)

        axiosInstance.get(`/api/register/partner-requests/`,{timeout:5000})
            .then(res =>{ 
                setUsers(res.data)
                setLoading(false)
            })
            .catch(err =>{
                if (err.code === 'ECONNABORTED') {
                    setError('Request timed out. Please try again.');
                    } 
                else {
                    setError('Failed to load partner requests.');
                }
                setLoading(false);
                });
        },[refresh]);

    const handleStatusUpdate = (userId, newStatus) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, status: newStatus } : user
            )
        );

        setSelectedUser(prev => {
            if (prev && prev.id === userId) {
                return { ...prev, status: newStatus };
            }
            return prev;
        });
    };

    const handleShowDetails = (user) => setSelectedUser(user);
    const handleCloseModal = () => setSelectedUser(null);
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    return (
        <div className="bg-gray-100 font-sans min-h-screen">
            <div className="flex h-screen overflow-hidden">
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    onClose={() => setIsSidebarOpen(false)} 
                    activeSection="Partners" 
                />
                
                <div className="flex-1 flex flex-col overflow-y-auto">
                    <header className="bg-white p-4 md:p-6 shadow-md flex justify-between items-center sticky top-0 z-10">
                        <div className="flex items-center">
                            <button onClick={toggleSidebar} className="sm:hidden p-2 mr-2 text-gray-600">
                                <i className="fa-solid fa-bars"></i>
                            </button>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Restaurant Approval Portal 👥</h1>
                        </div>
                        <div className="text-xs text-gray-500 hidden md:block">
                            System Date: {new Date().toLocaleDateString()}
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
                        <div className="m-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                        {error}

                        <button
                            onClick={() => setRefresh((prev) => !prev)}
                            className="mt-2 text-sm underline font-semibold block"
                        >
                            Retry
                        </button>
                        </div>
                    )}

                    {/* Table */}
                    {!loading && !error && (

                    <main className="p-4 md:p-10 flex-1">
                        <PartnerUserListTable
                            users={users}
                            onStatusUpdate={handleStatusUpdate}
                            onShowDetails={handleShowDetails}
                        />
                    </main>
                    )}
                </div>
            </div>

            <PartnerUserDetailsModal
                user={selectedUser}
                onClose={handleCloseModal}
                onStatusUpdate={handleStatusUpdate}
                refresh={setRefresh}
            />
        </div>
    );
};

export default ApproveRestaurant;