import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCartItems } from '../../../../ReduxStore/cartSlice';
import axiosInstance from '../../../../api/axiosapi';
import { toast } from "react-toastify";

const MenuItem = ({ item }) => {
  const VegIndicator = ({ is_veg }) => (
    <span 
      className={`text-lg mr-2 ${is_veg ? 'text-green-600' : 'text-red-600'}`} 
      title={is_veg ? "Vegetarian" : "Non-Vegetarian"}
    >
    </span>
  );
  const dispatch=useDispatch()

  return (
    <div className="bg-white p-6 border-b border-gray-100 flex justify-between items-start space-x-6 hover:bg-white/90 transition duration-150 rounded-lg shadow-sm">
      <div className="flex-1">
        <VegIndicator is_veg={item.is_veg} />
        <h3 className="text-xl font-semibold mb-1 inline-block">{item.name}</h3>
        <p className="text-gray-500 mb-2 text-sm">{item.description}</p>
        <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
      </div>
      <div className="relative flex-shrink-0">
        <img 
          className="w-28 h-28 object-cover rounded-lg shadow-md" 
          src={item.image} 
          alt={item.name}
        />
        <button onClick={()=>{
          axiosInstance.post(`/api/cart/cart-food-add/`,{food:item.id})
          .then(res=>{
            toast.success("Food Added To Cart")
            console.log(res.data)
            dispatch(fetchCartItems())
          })
          .catch(err=>{toast.info('Not Added to Cart')
            console.log(err.data)
          })
        }}
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-green-500 text-white font-semibold px-4 py-1 rounded-lg shadow-lg hover:bg-green-600 transition`}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default MenuItem;