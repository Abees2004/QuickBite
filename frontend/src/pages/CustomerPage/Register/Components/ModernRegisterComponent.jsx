import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../api/axiosapi';
import { toast } from 'react-toastify';

const ModernRegisterComponent = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors(prev => ({
            ...prev,
            [e.target.name]: '',
            detail: '',
            non_field_errors: '',
            general: '',
        }));
    };

    // VALIDATION
    const validateForm = () => {

        let newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (formData.password.length < 6) {
            newErrors.password =
                'Password must be at least 6 characters';
        }

        if (
            formData.password !== formData.confirm_password
        ) {
            newErrors.confirm_password =
                'Passwords do not match';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) return;

        try {

            setLoading(true);

            const res = await axiosInstance.post(
                '/api/users/user-register/',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                }
            );

            toast.success("Registration Completed")

            console.log(res.data);

            navigate('/login');

        } catch (err) {

            console.log(err.response?.data);
            toast.error("Registration Failed")

            if (err.response?.data) {

                const backendErrors = {};

                Object.entries(err.response.data).forEach(
                    ([key, value]) => {

                        backendErrors[key] = Array.isArray(value)
                            ? value[0]
                            : value;
                    }
                );

                setErrors(backendErrors);

            } else {

                setErrors({
                    general:
                        'Something went wrong. Please try again.',
                });
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 font-inter">

            <div className="flex shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full">

                {/* LEFT SIDE */}
                <div className="hidden lg:block w-full max-w-sm min-h-[640px] overflow-hidden">

                    <div className="h-full p-12 flex flex-col justify-between bg-orange-600 text-white">

                        <div className="text-3xl font-extrabold tracking-wider">
                            ServicePro
                        </div>

                        <div className="space-y-4">

                            <h1 className="text-3xl font-bold leading-snug">
                                Join us now.
                                <br />
                                Start your journey today.
                            </h1>

                            <p className="text-white text-opacity-80 text-base">
                                Create your account to access professional tools and management dashboard.
                            </p>

                        </div>

                        <div className="text-xs text-white opacity-60">
                            © 2026 ServicePro. All rights reserved.
                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="w-full lg:max-w-lg min-h-[640px] flex items-center justify-center bg-white p-8 sm:p-12">

                    <div className="w-full max-w-md">

                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                            Create Account
                        </h2>

                        <p className="text-base text-gray-600 mb-8">
                            Enter your details to register.
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

                        <form
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >

                            {/* USERNAME */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>

                                <div className="mt-2">

                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="Jane Doe"
                                        value={formData.username}
                                        onChange={handleChange}
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

                            {/* EMAIL */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>

                                <div className="mt-2">

                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:outline-none transition duration-200 ${
                                            errors.email
                                                ? 'border-red-500 focus:ring-red-300'
                                                : 'border-gray-300 focus:ring-orange-300'
                                        }`}
                                    />

                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.email}
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* PASSWORD */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700">
                                    Password
                                </label>

                                <div className="mt-2">

                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
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

                            {/* CONFIRM PASSWORD */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700">
                                    Confirm Password
                                </label>

                                <div className="mt-2">

                                    <input
                                        name="confirm_password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:outline-none transition duration-200 ${
                                            errors.confirm_password
                                                ? 'border-red-500 focus:ring-red-300'
                                                : 'border-gray-300 focus:ring-orange-300'
                                        }`}
                                    />

                                    {errors.confirm_password && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.confirm_password}
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
                                    {loading
                                        ? 'Creating Account...'
                                        : 'Create Account'}
                                </button>

                            </div>

                        </form>

                        {/* LOGIN */}
                        <div className="mt-8 text-center text-sm text-gray-500">

                            Already have an account?

                            <Link
                                to="/login"
                                className="ml-1 font-bold text-orange-600 hover:text-orange-700"
                            >
                                Sign In
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ModernRegisterComponent;