import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axiosInstance from '../../../../api/axiosapi';

const BookingTable = () => {




    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'text-yellow-500';
            case 'PLACED': return 'text-yellow-500';
            case 'FAILED': return 'text-red-500';
            case 'APPROVED': return 'text-blue-500';
            case 'ASSIGNED': return 'text-aqua-500';
            case 'PICKED': return 'text-green-500';
            case 'DELIVERED': return 'text-green-600';
            case 'REJECTED': return 'text-red-500';
            default: return 'text-yellow-500';
        }
    };

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};




    const [orders,setOrders]=useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true)
        setError(null)
        axiosInstance.get(`/api/orders/orders/`,{timeout:5000})
        .then(res=>{
            console.log(res.data)
            setOrders(res.data)
            setLoading(false)
        }
        )
        .catch(err=>{
            setError('Failed to load bookings.');
            setLoading(false);
        })
    },[])
    return (
    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-6">All Bookings</h2>


        {/* Loading */}
        {loading && (
            <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
        )}

        {/* Error */}
        {!loading && error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
            {error}
            </div>
        )}

        {/* Empty
        {!loading && !error && orders.length === 0 && (
            <p className="text-gray-500 text-center py-10">
            No bookings found
            </p>
        )} */}

        
        {/* Table Container */}
        {!loading && !error && (
        <>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 transition duration-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.customer.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(order.creadted_at)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex ${getStatusColor(order.status)} text-xs leading-5 font-semibold rounded-full ${order.statusColor}`}>
                                    {(order.status)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link to={`/resturant/bookings/${order.id}`} className='text-blue-500'>View</Link>             
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Pagination */}
        {/* <div className="mt-6 flex justify-between items-center text-sm">
            <p className="text-gray-600">Showing 1 to 7 of 45 bookings</p>
            <div className="flex space-x-1">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">Previous</button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-white bg-blue-500">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">Next</button>
            </div>
        </div> */}

            </>
        )}
    </div>

       )
};

export default BookingTable;