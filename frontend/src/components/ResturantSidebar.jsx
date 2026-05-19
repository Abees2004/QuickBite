import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../ReduxStore/authSlice';

const ResturantSidebar = ({ isOpen, onClose }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch=useDispatch()

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
                    Resturant<span className="text-white">Panel</span>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white sm:hidden p-2 rounded-full hover:bg-gray-700"
                >
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <nav className="space-y-2 flex-grow">

                    <Link to="/resturant/dashboard" className={getLinkStyle('/resturant/dashboard')}>
                        <i className="fa-solid fa-chart-line w-5"></i>
                        <span className="text-sm font-bold">Dashboard</span>
                    </Link>

                    <Link to="/resturant/addfood" className={getLinkStyle('/resturant/addfood')}>
                        <i className="fa-solid fa-utensils w-5"></i>
                        <span className="text-sm font-bold">Add Food</span>
                    </Link>

                    <Link to="/resturant/orderrequest" className={getLinkStyle('/resturant/orderrequest')}>
                        <i className="fa-solid fa-calendar-check w-5"></i>
                        <span className="text-sm font-bold">Order Request</span>
                    </Link>

                    <Link to="/resturant/bookings" className={getLinkStyle('/resturant/bookings')}>
                        <i className="fa-solid fa-arrow-down-a-z w-5"></i>
                        <span className="text-sm font-bold">Bookings</span>
                    </Link>


                </nav>

                <div className="mt-auto pt-6 border-t border-gray-700">
                    <Link
                        to="/resturant/profile"
                        className="flex items-center space-x-3 p-3 rounded-lg bg-black/30 hover:bg-black/50 transition"
                    >
                        <img
                            src="
                            
                            data:image/jpeg;base64,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
                            
                            "
                            alt="profile"
                            className="w-10 h-10 rounded-full border-2 border-blue-500"
                        />

                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">
                                Restaurant Owner
                            </p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                Manager
                            </p>
                        </div>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition"
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                    </button>

                </div>

            </div>
        </>
    );
};

export default ResturantSidebar;