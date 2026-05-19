import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import axiosInstance from '../../../api/axiosapi';
import { toast } from 'react-toastify';

const PartnerRegister = () => {

  const [formData, setFormData] = useState({
    restaurantName: '',
    isVeg: true,
    image: null,
    street: '',
    city: '',
    pincode: '',
    ownerName: '',
    email: '',
    isVerified: false
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'isVeg'
          ? value === 'true'
          : value
    }));

    // Clear errors while typing
    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));

    setServerError('');
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      image: file
    }));

    setErrors((prev) => ({
      ...prev,
      image: ''
    }));
  };

  // Validation
  const validateForm = () => {

    let newErrors = {};

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Restaurant name is required';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Street is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (!formData.image) {
      newErrors.image = 'Restaurant image is required';
    } else {

      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp'
      ];

      if (!allowedTypes.includes(formData.image.type)) {
        newErrors.image = 'Only JPG, PNG, WEBP allowed';
      }

      if (formData.image.size > 2 * 1024 * 1024) {
        newErrors.image = 'Image size should be below 2MB';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      restaurantName: '',
      isVeg: true,
      image: null,
      street: '',
      city: '',
      pincode: '',
      ownerName: '',
      email: '',
      isVerified: false
    });

    setErrors({});
  };

  // Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    setServerError('');

    if (!validateForm()) return;

    try {

      setLoading(true);

      const payLoad = new FormData();

      payLoad.append('restaurant_name', formData.restaurantName);
      payLoad.append('is_veg', formData.isVeg);
      payLoad.append('image', formData.image);
      payLoad.append('street_name', formData.street);
      payLoad.append('city', formData.city);
      payLoad.append('pincode', formData.pincode);

      const res = await axiosInstance.post(
        "/api/register/partner-register/",
        payLoad,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      console.log(res.data);

      toast.success("Restaurant Registered Successfully plaesw wailt for Approval!");

      resetForm();

    } 

    catch (err) {
      console.log("ERROR RESPONSE:", err.response?.data);

      if (err.response?.data) {
        const data = err.response.data;

        let backendErrors = {};

        Object.entries(data).forEach(([key, value]) => {
          const message = Array.isArray(value) ? value[0] : value;

          if (key === "restaurant_name") {
            backendErrors.restaurantName = message;
          } 
          else if (key === "street_name") {
            backendErrors.street = message;
          } 
          else if (key === "city") {
            backendErrors.city = message;
          } 
          else if (key === "pincode") {
            backendErrors.pincode = message;
          } 
          else {
            backendErrors[key] = message;
          }
        });

        setErrors(backendErrors);
      } else {
        setServerError("Something went wrong. Please try again.");
      }


        
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 lg:p-12 font-sans selection:bg-orange-100">

        {/* Background Blur */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-200/20 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-200/10 blur-[100px]" />
        </div>

        <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-12 items-center">

          {/* Left Side */}
          <div className="lg:col-span-5 space-y-10 p-4">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>

              Partner Network 2026
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                More Orders. <br />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                  Zero Stress.
                </span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-md font-medium">
                Join the most reliable delivery infrastructure for local restaurants.
              </p>
            </div>

          </div>

          {/* Form */}
          <div className="lg:col-span-7">

            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 lg:p-14 border border-slate-100">

              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                  Register Store
                </h2>

                <p className="text-slate-500 font-medium italic">
                  Your culinary journey begins here.
                </p>
              </div>

              {/* Server Error */}
              {serverError && (
                <div className="mb-5 bg-red-100 text-red-600 p-3 rounded-xl text-sm">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Restaurant Name + Veg */}
                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <input
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleChange}
                      placeholder="Restaurant Name"
                      className={`w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none border ${
                        errors.restaurantName
                          ? 'border-red-500'
                          : 'border-transparent'
                      }`}
                    />

                    {errors.restaurantName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.restaurantName}
                      </p>
                    )}
                  </div>


                  <select
                    name="isVeg"
                    value={formData.isVeg}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none"
                  >
                    <option value={true}>Veg</option>
                    <option value={false}>Non Veg</option>
                  </select>

                </div>

                {/* Street */}
                <div>
                  <input
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Street"
                    className={`w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none border ${
                      errors.street
                        ? 'border-red-500'
                        : 'border-transparent'
                    }`}
                  />

                  {errors.street && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.street}
                    </p>
                  )}
                </div>

                {/* City + Pincode */}
                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className={`w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none border ${
                        errors.city
                          ? 'border-red-500'
                          : 'border-transparent'
                      }`}
                    />

                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      name="pincode"
                      type="number"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Pincode"
                      className={`w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none border ${
                        errors.pincode
                          ? 'border-red-500'
                          : 'border-transparent'
                      }`}
                    />

                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.pincode}
                      </p>
                    )}
                  </div>

                </div>

                {/* Image */}
                <div>

                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none"
                  />

                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.image}
                    </p>
                  )}

                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold py-5 rounded-2xl transition disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Register Now"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default PartnerRegister;