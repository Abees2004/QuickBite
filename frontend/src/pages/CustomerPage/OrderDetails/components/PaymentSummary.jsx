import React from 'react';

const PaymentSummary = ({ total }) => {
  const orderTotal = total+40

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Payment Summary</h3>
      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Item Total</span>
          <span className="font-medium">₹{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-medium text-red-500">+ ₹{(40).toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-4 border-t-2 border-dashed border-gray-300 mt-4">
          <span className="text-xl font-extrabold">Grand Total</span>
          <span className="text-xl font-extrabold text-orange-600">₹{orderTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;