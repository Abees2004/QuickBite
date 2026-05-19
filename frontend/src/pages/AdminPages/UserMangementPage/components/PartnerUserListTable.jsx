import axios from 'axios';
import React from 'react';
import axiosInstance from '../../../../api/axiosapi';

const PartnerUserListTable = ({ users, onToggleBlock, onShowDetails }) => {
    if (!Array.isArray(users)) {
        // alert("Users is not array:", users);
        return <p>No users found</p>;
    }

    const handleApiToggleBlock = (user, newIsActive) => {
        const action = newIsActive ? 'unblock' : 'block';
        
        axiosInstance
            .patch(
                `/api/users/users/${user.id}/`, 
                { is_active: newIsActive }
            )
            .then(res => {
                console.log(`User ${user.id} status updated successfully via API: ${action}`);
                // Update the parent component's state upon successful API call
                onToggleBlock(user.id, action); 
            })
            .catch(err => console.error(`Error toggling block status for user ${user.id}:`, err));
    };

    return (
        <section className="mb-10 bg-white p-4 md:p-6 rounded-xl card-shadow border-t-4 border-primary">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                Registered Platform Partners
                <a href="#" className="text-sm text-primary font-medium hover:text-blue-700 mt-2 sm:mt-0">Export Data</a>
            </h2>

            {/* Desktop Table: Hidden on small screens */}
            <div className="overflow-x-auto hidden sm:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => {
                            const isBlocked = user.is_active === false;
                            
                            const statusBadge = isBlocked 
                                ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Blocked</span>
                                : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>;
                            
                            const actionButton = isBlocked
                                ? (
                                    <button 
                                        onClick={() => handleApiToggleBlock(user,true)} // Unblock = is_active: true
                                        className="text-green-500 hover:text-green-700"
                                    >
                                        Unblock
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleApiToggleBlock(user, false)} // Block = is_active: false
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Block
                                    </button>
                                );

                            return (
                                <tr key={user.id} className="hover:bg-gray-50 transition duration-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{statusBadge}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                        <button 
                                            onClick={() => onShowDetails(user)} 
                                            className="text-blue-500 hover:text-blue-700 mr-4"
                                        >
                                            View
                                        </button>
                                        {actionButton}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards: Hidden on medium/large screens */}
            <div className="sm:hidden space-y-4">
                {users.map((user) => {
                    const isBlocked = user.is_active === false;
                    const statusBadge = isBlocked 
                        ? <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Blocked</span>
                        : <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>;
                    
                    const actionButton = isBlocked
                        ? (
                            <button 
                                onClick={() => handleApiToggleBlock(user,true)}
                                className="text-green-500 hover:text-green-700 font-medium ml-4"
                            >
                                Unblock
                            </button>
                        ) : (
                            <button 
                                onClick={() => handleApiToggleBlock(user, false)}
                                className="text-red-500 hover:text-red-700 font-medium ml-4"
                            >
                                Block
                            </button>
                        );

                    return (
                        <div key={user.id} className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-semibold text-gray-800">#{user.id}</p>
                                {statusBadge}
                            </div>
                            <p className="text-base font-bold text-gray-900 mb-2">{user.username}</p>
                            
                            <div className="flex justify-end pt-3 border-t border-gray-100">
                                <button 
                                    onClick={() => onShowDetails(user)} 
                                    className="text-primary hover:text-blue-700 font-medium"
                                >
                                    View Details
                                </button>
                                {actionButton}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default PartnerUserListTable;