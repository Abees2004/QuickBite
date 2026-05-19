import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../api/axiosapi';
import { toast } from 'react-toastify';

const ProfileForm = ({refresh}) => {

    const [formData, setFormData] = useState({
    name: "",
    image:null,
    street_name: "",
    city:"",
    pincode: "",
    description: ""
  });

useEffect(()=>{
    axiosInstance.get(`/api/resturants/restaurant-profile/`)
    .then(res=>{
      console.log(res.data)
      setFormData({
        name:res.data.name,
        street_name:res.data.street_name,
        image:res.data.image,
        city:res.data.city,
        pincode:res.data.pincode,
        description:res.data.description

      })
    })
    .catch(err=>console.log(err))
},[])




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData({...formData,image:e.target.files[0]})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Data:", formData);

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('street_name', formData.street_name);
    payload.append('city', formData.city);
    payload.append('pincode', formData.pincode);
    if (formData.image) {
      payload.append('image', formData.image);
    }

   axiosInstance.patch(`/api/resturants/restaurant-profile/`,payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
   .then(res=>{
    console.log(res.data)
    toast.success("Profile Updated Successfully!");
    refresh(prev=>!prev)
   })
   .catch(err=>console.log(err))

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-slate-200">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Update Profile</h3>
            <p className="text-sm text-slate-500">Edit your restaurant's public information</p>
          </div>
          <button 
            type="submit" 
            className="w-full sm:w-auto bg-orange-600 text-white px-8 py-3 rounded-xl hover:bg-orange-700 transition-all font-bold text-sm shadow-lg shadow-orange-200 active:scale-95"
          >
            SAVE CHANGES
          </button>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          <UnderlinedInput 
            label="Restaurant Name" 
            name="name"
            value={formData.name} 
            onChange={handleChange}
            className="md:col-span-2" 
          />

        <input
          className="border-0 border-b-2 border-slate-200 focus:border-orange-500 py-3 block w-full bg-transparent outline-none transition-all duration-300 text-slate-800 font-medium text-base"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />

          
          <UnderlinedInput 
            label="Street" 
            name="street_name"
            value={formData.street_name} 
            onChange={handleChange}
          />

          <UnderlinedInput 
            label="city" 
            name="city"
            value={formData.city} 
            onChange={handleChange}
          />
          
          <UnderlinedInput 
            label="pincode" 
            name="pincode"
            type="tel" 
            value={formData.pincode} 
            onChange={handleChange}
          />

          <div className="md:col-span-2 relative group">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
              About the Restaurant
            </label>
            <textarea 
              name="description"
              rows="4" 
              value={formData.description}
              onChange={handleChange}
              className="block w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-slate-900 focus:border-orange-500 focus:ring-0 transition-all duration-300 outline-none resize-none placeholder-slate-300 text-base"
              placeholder="Tell customers about your kitchen..."
            />
            <p className="mt-2 text-xs text-slate-400 italic">
              Briefly describe your cuisine, atmosphere, and signature dishes.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

/**
 * Reusable Underlined Input Component
 */
const UnderlinedInput = ({ label, className = "", ...props }) => (
  <div className={`relative group ${className}`}>
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors mb-1">
      {label}
    </label>
    <input 
      {...props}
      className="border-0 border-b-2 border-slate-200 focus:border-orange-500 py-3 block w-full bg-transparent outline-none transition-all duration-300 text-slate-800 font-medium text-base"
    />
  </div>
);

export default ProfileForm;