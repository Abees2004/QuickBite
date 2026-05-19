import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../api/axiosapi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchCartItems } from '../../../../ReduxStore/cartSlice';
import { setCredentials } from "../../../../ReduxStore/authSlice"

const ModernLoginComponent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });

        setErrors(prev => ({
            ...prev,
            [e.target.name]: '',
            detail: '',
            non_field_errors: '',
            general: '',
        }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!data.username.trim())
            newErrors.username = 'Username is required';

        if (!data.password.trim())
            newErrors.password = 'Password is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async e => {

        e.preventDefault();

        if (!validateForm()) return;

        try {

            setLoading(true);

            const form = new FormData();

            form.append('username', data.username);
            form.append('password', data.password);

            const response = await axiosInstance.post(
                '/api/users/login/',
                form
            );

            localStorage.setItem('access', response.data.data.access);
            localStorage.setItem('refresh', response.data.data.refresh);
            localStorage.setItem("role",response.data.data.user.role)
            localStorage.setItem("user",JSON.stringify(response.data.data.user));

            dispatch(
                setCredentials({
                user: response.data.data.user,
                access: response.data.data.access,
                refresh: response.data.data.refresh,
                })
            );

            dispatch(fetchCartItems());


            const role = response.data.data.user.role;

            if (role === 'admin') navigate('/admin/dashboard');
            else if (role === 'restaurant') navigate('/resturant/dashboard');
            else if (role === 'delivery_partner') navigate('/delivery/dashboard');
            else if (role === 'user') navigate('/');
            else navigate('/login');

        } catch (err) {

            console.log(err.response?.data);
            toast.error("Login Failed")

            if (err.response?.data) {

                const backendErrors = {};

                Object.entries(err.response.data).forEach(([key, value]) => {
                    backendErrors[key] = Array.isArray(value)
                        ? value[0]
                        : value;
                });

                setErrors(backendErrors);

            } else {

                setErrors({
                    general: 'Something went wrong. Please try again.',
                });
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">

            <div className="flex shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full">

                {/* LEFT SIDE */}
                <div className="hidden lg:block w-full max-w-sm min-h-[560px] overflow-hidden">

                    <div className="h-full p-12 flex flex-col justify-between bg-orange-500 text-white">

                        <div className="text-3xl font-extrabold tracking-wider">
                            ServicePro
                        </div>

                        <div className="space-y-4">

                            <h1 className="text-3xl font-bold leading-snug">
                                Data-driven insights.
                                <br />
                                Future-proof solutions.
                            </h1>

                            <p className="text-white text-opacity-80 text-base">
                                Access your professional dashboard and manage all your services in one place.
                            </p>

                        </div>

                        <div className="text-xs text-white opacity-75">
                            © 2026 ServicePro. All rights reserved.
                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="w-full lg:max-w-lg min-h-[560px] flex items-center justify-center bg-white p-8 sm:p-12">

                    <div className="w-full max-w-md">

                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                            Welcome Back
                        </h2>

                        <p className="text-base text-gray-600 mb-8">
                            Sign in to continue to your dashboard.
                        </p>

                        {/* GENERAL ERRORS */}
                        {['detail', 'non_field_errors', 'general'].map(
                            key =>
                                errors[key] && (
                                    <div
                                        key={key}
                                        className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                                    >
                                        {errors[key]}
                                    </div>
                                )
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>

                            {/* USERNAME */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700">
                                    Username
                                </label>

                                <div className="mt-2">

                                    <input
                                        onChange={handleChange}
                                        value={data.username}
                                        name="username"
                                        type="text"
                                        placeholder="Enter username"
                                        className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:outline-none transition duration-200 ${
                                            errors.username
                                                ? 'border-red-500 focus:ring-red-300'
                                                : 'border-gray-300 focus:ring-orange-300'
                                        }`}
                                    />

                                    {errors.username && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.username}
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* PASSWORD */}
                            <div>

                                <div className="flex justify-between items-center">

                                    <label className="block text-sm font-semibold text-gray-700">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-sm font-medium text-orange-600 hover:text-orange-700 transition duration-200"
                                    >
                                        Forgot password?
                                    </button>

                                </div>

                                <div className="mt-2">

                                    <input
                                        onChange={handleChange}
                                        value={data.password}
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:outline-none transition duration-200 ${
                                            errors.password
                                                ? 'border-red-500 focus:ring-red-300'
                                                : 'border-gray-300 focus:ring-orange-300'
                                        }`}
                                    />

                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.password}
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* BUTTON */}
                            <div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-bold text-white bg-orange-600 hover:bg-orange-700 transition duration-300 disabled:opacity-50"
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </button>

                            </div>

                        </form>

                        {/* REGISTER */}
                        <div className="mt-8 text-center text-sm text-gray-500">

                            Don't have an account?

                            <Link
                                to="/register"
                                className="ml-1 font-bold text-orange-600 hover:text-orange-700"
                            >
                                Create an account
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ModernLoginComponent;