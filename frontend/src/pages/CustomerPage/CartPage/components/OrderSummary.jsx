import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCartItems } from '../../../../ReduxStore/cartSlice';
import axiosInstance from '../../../../api/axiosapi';

const OrderSummary = ({ onEditAddress,price, setrefresh }) => {
  const dispatch=useDispatch()
  return (
    <div className="lg:col-span-5">
      {/* Address Preview */}
      <div className="border border-gray-100 p-6 rounded-[2rem] bg-gray-50/50 mb-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Delivery Address</h3>
          <button onClick={onEditAddress} className="text-xs font-bold text-orange-600 hover:underline">Edit</button>
        </div>
        <div className="flex items-start gap-4">
          <div className="text-orange-500 mt-1"><i className="fa-solid fa-location-dot"></i></div>
          <div>
            <p className="text-sm font-bold text-gray-900">Home</p>
            <p className="text-sm text-gray-500 mt-1">4517 Washington Ave. Manchester, KY</p>
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="bg-gray-50 rounded-3xl p-8 sticky top-10">
        <h2 className="text-xl font-bold mb-6">Summary</h2>
        <div className="space-y-4 text-sm font-medium">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span className="text-gray-900">${price}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Delivery</span>
            <span className="text-green-600 font-bold text-xs uppercase tracking-widest">$40.00</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Taxes</span>
            <span className="text-gray-900">$0.00</span>
          </div>
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-lg">
            <span className="font-bold">Total</span>
            <span className="font-bold text-2xl tracking-tighter">${(price+40)}</span>
          </div>
        </div>
        <button onClick={()=>{
            axiosInstance.post(`/api/orders/place-order/`)
            .then(res=>{
              alert(res.data)
              dispatch(fetchCartItems())
              setrefresh(refresh=>!refresh)
            })
            .catch(err=>{console.log(err)})
              }
        }className="w-full bg-orange-600 text-white mt-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-[0.98]">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;