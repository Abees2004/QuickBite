import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Redux State
    const cartItems = useSelector((state) => state.cart.items);

    const user = useSelector((state) => state.auth.user);

    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );

    // Default Profile Image
    const profileImage =
        user?.profile_image ||
        "https://ui-avatars.com/api/?name=User&background=f97316&color=fff";

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 py-1 border-gray-100">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">

                        <Link to="/" className="flex items-center gap-2">

                            <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                                <span className="text-white font-black text-xl">
                                    Y
                                </span>
                            </div>

                            <span className="font-bold text-xl text-gray-800 hidden sm:block">
                                Your
                                <span className="text-orange-600">
                                    Logo
                                </span>
                            </span>

                        </Link>

                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">

                        <Link
                            to="/"
                            className="text-gray-700 font-medium hover:text-orange-600 transition-colors"
                        >
                            Home
                        </Link>

                        <Link
                            to="/restaurants"
                            className="text-gray-700 font-medium hover:text-orange-600 transition-colors"
                        >
                            Restaurants
                        </Link>

                        {isAuthenticated && (
                            <Link
                                to="/orders"
                                className="text-gray-700 font-medium hover:text-orange-600 transition-colors"
                            >
                                Orders
                            </Link>
                        )}

                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-6">

                        {/* Cart */}
                        {isAuthenticated && (
                            <Link
                                to="/cart"
                                className="relative group p-2"
                            >

                                <svg
                                    className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>

                                {cartItems?.length > 0 && (
                                    <span className="absolute top-0 right-0 flex h-4 w-4">

                                        <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>

                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-600 text-[10px] text-white items-center justify-center font-bold">
                                            {cartItems.length}
                                        </span>

                                    </span>
                                )}

                            </Link>
                        )}

                        {/* Auth Buttons */}
                        {!isAuthenticated ? (

                            <div className="flex items-center gap-3">

                                <Link
                                    to="/login"
                                    className="text-gray-700 font-semibold hover:text-orange-600"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-orange-700 transition"
                                >
                                    Register
                                </Link>

                            </div>

                        ) : (

                            <Link
                                to="/profile"
                                className="flex items-center"
                            >

                                <img
                                    className="h-10 w-10 rounded-full border-2 border-transparent hover:border-orange-200 transition-all duration-300 object-cover cursor-pointer shadow-sm"
                                    src={profileImage}
                                    alt="Profile"
                                />

                            </Link>

                        )}

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">

                        <button
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >

                            <svg
                                className="w-7 h-7"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >

                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}

                            </svg>

                        </button>

                    </div>

                </div>

            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >

                <div className="px-4 pt-2 pb-6 space-y-2 bg-gray-50 border-t border-gray-100">

                    <Link
                        to="/"
                        className="block py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"
                    >
                        Home
                    </Link>

                    <Link
                        to="/restaurants"
                        className="block py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"
                    >
                        Restaurants
                    </Link>

                    {isAuthenticated && (
                        <>
                            <Link
                                to="/orders"
                                className="block py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"
                            >
                                Orders
                            </Link>

                            <Link
                                to="/cart"
                                className="flex items-center justify-between py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"
                            >
                                <span>My Cart</span>

                                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-lg">
                                    {cartItems?.length || 0} Items
                                </span>
                            </Link>

                            <Link
                                to="/profile"
                                className="block py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"
                            >
                                Profile
                            </Link>
                        </>
                    )}

                    {!isAuthenticated && (

                        <div className="pt-4 flex flex-col gap-2 border-t border-gray-200">

                            <Link
                                to="/login"
                                className="text-center py-3 text-gray-700 font-semibold"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="text-center py-3 bg-orange-600 text-white rounded-xl font-semibold shadow-md shadow-orange-100"
                            >
                                Register
                            </Link>

                        </div>

                    )}

                </div>

            </div>

        </nav>
    );
};

export default Navbar;