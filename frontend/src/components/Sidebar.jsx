import React from 'react';
import { Link, useLocation } from 'react-router';
import { logout } from '../ReduxStore/authSlice';
import { useDispatch } from 'react-redux';

const Sidebar = ({ isOpen, onClose }) => {
    const dispatch= useDispatch()
    const location = useLocation();
    const PRIMARY_COLOR = 'text-blue-500';
    const ACCENT_BG = 'bg-gray-800';

    const getLinkStyle = (path) => {
        const base = "flex items-center space-x-3 p-3 rounded-lg transition duration-150 ";
        return location.pathname === path
            ? base + "bg-blue-600 text-white shadow-lg"
            : base + "text-gray-300 hover:bg-gray-700 hover:text-white";
    };

      const handleLogout = () => {
        localStorage.clear();
        dispatch(logout())
        navigate("/login");
      };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden"
                    onClick={onClose}
                ></div>
            )}

            <div
                className={`
                    fixed top-0 left-0 h-screen
                    w-64 ${ACCENT_BG} text-white
                    flex flex-col p-6 shadow-xl z-50
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    sm:static sm:translate-x-0 sm:shadow-none
                `}
            >
                <div className={`text-2xl font-black mb-10 tracking-tight ${PRIMARY_COLOR}`}>
                    Admin<span className="text-white">Panel</span>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white sm:hidden p-2 rounded-full hover:bg-gray-700"
                >
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <nav className="space-y-1 flex-grow overflow-y-auto custom-scrollbar">
                    <Link to="/admin/dashboard" className={getLinkStyle('/admin/dashboard')}>
                        <i className="fa-solid fa-chart-line w-5"></i>
                        <span className="text-sm font-bold">Dashboard</span>
                    </Link>


                    <Link to="/admin/bookings" className={getLinkStyle('/admin/bookings')}>
                        <i className="fa-solid fa-arrow-down-a-z w-5"></i>
                        <span className="text-sm font-bold">Bookings</span>
                    </Link>

                    <Link to="/admin/approveresturant" className={getLinkStyle('/admin/approveresturant')}>
                        <i className="fa-solid fa-house-medical-check w-5"></i>
                        <span className="text-sm font-bold">Approve Restaurant</span>
                    </Link>

                    <Link to="/admin/approvedeliverypartners" className={getLinkStyle('/admin/approvedeliverypartners')}>
                        <i className="fa-solid fa-truck-ramp-box w-5"></i>
                        <span className="text-sm font-bold">Approve Delivery</span>
                    </Link>

                    <Link to="/admin/mangeusers" className={getLinkStyle('/admin/mangeusers')}>
                        <i className="fa-solid fa-users w-5"></i>
                        <span className="text-sm font-bold">Users</span>
                    </Link>

                    <Link to="/admin/mangepartners" className={getLinkStyle('/admin/mangepartners')}>
                        <i className="fa-solid fa-handshake w-5"></i>
                        <span className="text-sm font-bold">Partners</span>
                    </Link>

                    <Link to="/admin/mangedeliverypartners" className={getLinkStyle('/admin/mangedeliverypartners')}>
                        <i className="fa-solid fa-handshake w-5"></i>
                        <span className="text-sm font-bold">Delivery Partners</span>
                    </Link>
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-700">
                    <button onClick={handleLogout} className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition">
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;