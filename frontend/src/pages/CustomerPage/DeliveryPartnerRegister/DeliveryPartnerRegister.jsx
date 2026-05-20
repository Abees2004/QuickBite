import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import axiosInstance from "../../../api/axiosapi";
import { toast } from "react-toastify";

const DeliveryPartnerRegister = () => {
  const [formData, setFormData] = useState({
    licenseImage: null,
    age: "",
    location: "",
    vehicleType: "Bike",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (Number(formData.age) < 18) {
      newErrors.age = "You must be at least 18 years old";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.licenseImage) {
      newErrors.licenseImage = "License image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const payLoad = new FormData();
      payLoad.append("age", formData.age);
      payLoad.append("location", formData.location);
      payLoad.append("license", formData.licenseImage);
      payLoad.append("vehicle_type", formData.vehicleType);

      const res = await axiosInstance.post(
        "/api/register/delivery-partner-register/",
        payLoad,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(res.data);
      toast.success("Application Submitted Successfully!");

      // reset form
      setFormData({
        licenseImage: null,
        age: "",
        location: "",
        vehicleType: "Bike",
      });
      
    } catch (err) {
      console.error(err);

      if (err.response) {
        const data = err.response.data;

        // backend field errors (DRF style)
        if (typeof data === "object") {
          setErrors(data);
        } else {
          toast.info(data?.message || "Submission failed");
        }
      } else if (err.request) {
        toast.info("No response from server. Check your internet connection.");
      } else {
        toast.info("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="flex items-center justify-center p-4 lg:p-12 font-sans">
        <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-5">
            <h1 className="text-5xl font-bold">
              Delivery Partner Registration
            </h1>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-7 bg-white p-10 rounded-3xl shadow">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* VEHICLE */}
              <div>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 rounded-xl"
                >
                  <option value="Bike">Bike</option>
                  <option value="Car">Car</option>
                  <option value="Scooter">Scooter</option>
                </select>
              </div>

              {/* AGE */}
              <div>
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="w-full p-4 bg-slate-50 rounded-xl"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                )}
              </div>

              {/* LOCATION */}
              <div>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full p-4 bg-slate-50 rounded-xl"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location}
                  </p>
                )}
              </div>

              {/* LICENSE */}
              <div>
                <input
                  type="file"
                  name="licenseImage"
                  onChange={handleFileChange}
                  className="w-full"
                />
                {errors.licenseImage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.licenseImage}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-4 rounded-xl font-bold text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-orange-600"
                }`}
              >
                {loading ? "Submitting..." : "Register Now"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerRegister;