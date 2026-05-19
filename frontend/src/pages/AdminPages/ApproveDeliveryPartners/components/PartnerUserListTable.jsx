import axios from 'axios';
import React from 'react';
import axiosInstance from '../../../../api/axiosapi';

const PartnerUserListTable = ({ users, onStatusUpdate, onShowDetails }) => {
    if (!Array.isArray(users) || users.length === 0) {
        return <div className="p-10 text-center bg-white rounded-xl shadow">No partner requests found.</div>;
    }

    const handleApiAction = (user, newStatus) => {
        axiosInstance.patch(`/admin/manage_user/${user.id}/`, { status: newStatus })
            .then(() => {
                onStatusUpdate(user.id, newStatus); 
                
            })
            .catch(err => console.error("Update error:", err));
    };

    const StatusBadge = ({ status }) => {
        let classes = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full ";
        if (status === 'A') classes += "bg-green-100 text-green-800";
        else if (status === 'R') classes += "bg-red-100 text-red-800";
        else classes += "bg-yellow-100 text-yellow-800";
        
        return <span className={classes}>{'Pending'}</span>;
    };

    return (
        <section className="mb-10 bg-white p-4 md:p-6 rounded-xl shadow-md border-t-4 border-blue-500">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6 flex justify-between items-center">
                Partner Approval Queue
                <span className="text-sm font-normal text-gray-500">{users.length} Total Requests</span>
            </h2>

            {/* Desktop View */}
            <div className="overflow-x-auto hidden sm:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partner Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partner Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.delivery_partner.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.delivery_partner.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={user.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right space-x-3">
                                    <button onClick={() => onShowDetails(user)} className="text-blue-600 hover:text-blue-900">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="sm:hidden space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-white p-4 shadow rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-gray-400">#{user.id}</span>
                            <StatusBadge status={user.status} />
                        </div>
                        <p className="font-bold text-gray-900 mb-4">{user.username}</p>
                        <div className="flex justify-between items-center pt-3 border-t">
                            <button onClick={() => onShowDetails(user)} className="text-blue-600 text-sm">Details</button>
                            <div className="space-x-3">
                                <button onClick={() => handleApiAction(user, 'APPROVED')} className="text-green-600 text-sm font-bold">Approve</button>
                                <button onClick={() => handleApiAction(user, 'REJECTED')} className="text-red-600 text-sm font-bold">Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PartnerUserListTable;