import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../api/axiosapi';

const PartnerUserDetailsModal = ({ user, onClose, onToggleBlock }) => {
    if (!user) return null;

    const isBlocked = user.is_active === false;
    const actionText = isBlocked ? 'Unblock User' : 'Block User';
    const actionColorClass = isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';
    const statusColorClass = isBlocked ? 'text-danger' : 'text-green-600';
    // is_active will be the opposite of the current blocked status
    const newIsActive = isBlocked; 

    const handleAction = async () => {
        const action = isBlocked ? "unblock" : "block";

        try {
            const res = await axiosInstance.patch(
                `/api/users/users/${user.id}/`,
                { is_active: newIsActive },
            );
            toast.info("User ",action )
            onToggleBlock(user.id, action);
            onClose();

        } catch (err) {
            console.error("PATCH ERROR:", err?.response?.data || err);
            alert("Failed to update user status.");
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4" // Added p-4 for padding on tiny screens
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-lg" // Adjusted max-width for small screens
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Partner Details
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">User ID:</span>
                            <span className="text-gray-900 font-medium"> #{user.id}</span>
                        </p>

                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">Name:</span>
                            <span className="text-gray-900 font-medium">{user.username}</span>
                        </p>

                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">Email:</span>
                            <span className="text-primary truncate ml-2 font-medium" title={user.email}>{user.email}</span>
                        </p>

                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">Resturant:</span>
                            <span className="text-primary truncate ml-2 font-medium" title={user.resturant}>{user.resturant}</span>
                        </p>

                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">Current Status:</span>
                            <span className={`font-bold ${statusColorClass} font-medium`}>
                                {user.is_active ? 'Active' : 'Blocked'}
                            </span>
                        </p>

                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">Last Login:</span>
                            <span className="text-gray-900 font-medium">{user.lastLogin || 'N/A'}</span>
                        </p>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button 
                            onClick={onClose} 
                            className="py-2 px-3 sm:px-4 bg-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm hover:bg-gray-300"
                        >
                            Close
                        </button>

                        <button 
                            onClick={handleAction} 
                            className={`py-2 px-3 sm:px-4 text-white rounded-lg text-xs sm:text-sm ${actionColorClass}`}
                        >
                            {actionText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerUserDetailsModal;