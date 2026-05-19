import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../api/axiosapi';
import { toast } from 'react-toastify';

const EditAddressModal = ({ isOpen, onClose }) => {

  const [address, setAddress] = useState({
    street_name: '',
    city: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // GET ADDRESS
  useEffect(() => {
    if (!isOpen) return;

    axiosInstance.get(`/api/orders/address/`)
      .then(res => {
        console.log(res.data);

        setAddress(res.data?.[0] || {
          street_name: '',
          city: '',
          pincode: ''
        });
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed to load address");
      });

  }, [isOpen]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress(prev => ({
      ...prev,
      [name]: value
    }));

    // clear field error while typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validate = () => {
    let newErrors = {};

    const street = (address.street_name || "").toString().trim();
    const city = (address.city || "").toString().trim();
    const pincode = (address.pincode || "").toString().trim();

    if (!street) {
      newErrors.street_name = "Street is required";
    }

    if (!city) {
      newErrors.city = "City is required";
    }

    if (!pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await axiosInstance.patch(
        `/api/orders/address/`,
        address
      );

      console.log("Success:", res.data);

      toast.success("Address updated!");

      setErrors({});
      onClose();

    } catch (err) {
      console.error("Update failed:", err.response?.data);

      if (err.response?.data) {

        let backendErrors = {};

        Object.entries(err.response.data).forEach(([key, value]) => {
          backendErrors[key] = Array.isArray(value) ? value[0] : value;
        });

        setErrors(backendErrors);

      } else {
        toast.error("Error updating address");
      }

    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Edit Address</h3>

          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="space-y-4">

          {/* STREET */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">
              Street Address
            </label>

            <input
              type="text"
              name="street_name"
              value={address.street_name || ''}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none mt-1"
            />

            {errors.street_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.street_name}
              </p>
            )}
          </div>

          {/* CITY + PIN */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">
                City
              </label>

              <input
                type="text"
                name="city"
                value={address.city || ''}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none mt-1"
              />

              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">
                Zip Code
              </label>

              <input
                type="text"
                name="pincode"
                value={address.pincode || ''}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none mt-1"
              />

              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.pincode}
                </p>
              )}
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold mt-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Address"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default EditAddressModal;