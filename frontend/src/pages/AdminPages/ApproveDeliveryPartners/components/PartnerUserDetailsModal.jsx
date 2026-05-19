import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../api/axiosapi';

const PartnerUserDetailsModal = ({ user, onClose, onStatusUpdate ,refresh }) => {
    if (!user) return null;

    const handleAction = async (newStatus) => {
        try {
            await axiosInstance.patch(
                `/api/register/delivery-partner-approve/${user.id}/`,
                { status: newStatus }
            );

            onStatusUpdate(user.id, newStatus);
            toast.info("Request ",newStatus)
            onClose();
            refresh(prev=>!prev)
        } catch (err) {
            console.error("PATCH ERROR:", err?.response?.data || err);
            alert(`Failed to update user to ${newStatus}.`);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED': return 'text-green-600';
            case 'REJECTED': return 'text-red-600';
            case 'PENDING': return 'text-yellow-600';
            default: return 'text-yellow-600';
        }
    };



    return (
        <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-lg"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Review Partner Request
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">User ID:</span>
                            <span className="text-gray-900 font-medium"> #{user.id}</span>
                        </p>
                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">Name:</span>
                            <span className="text-gray-900 font-medium">{user.delivery_partner.username}</span>
                        </p>
                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">Email:</span>
                            <span className="text-primary truncate ml-2 font-medium">{user.delivery_partner.email}</span>
                        </p>
                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">Age:</span>
                            <span className="text-primary truncate ml-2 font-medium">{user.age}</span>
                        </p>
                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">Location:</span>
                            <span className="text-primary truncate ml-2 font-medium">{user.location}</span>
                        </p>
                        <p className="text-sm flex justify-between">
                            <span className="font-semibold text-gray-600">Current Status:</span>
                            <span className={`font-bold capitalize ${getStatusColor(user.status)}`}>
                                {(user.status)}
                            </span>
                        </p>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button 
                            onClick={onClose} 
                            className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                        >
                            Cancel
                        </button>

                        <button 
                            onClick={() => handleAction('REJECTED')} 
                            className="py-2 px-4 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                        >
                            Reject Partner
                        </button>

                        <button 
                            onClick={() => handleAction('APPROVED')} 
                            className="py-2 px-4 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition"
                        >
                            Approve Partner
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerUserDetailsModal;