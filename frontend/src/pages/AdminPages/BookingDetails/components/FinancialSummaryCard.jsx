import React from 'react';

const FinancialRow = ({ label, value, isTotal }) => {
  const valueClass = isTotal ? 'text-xl font-extrabold text-green-600': '';
                     
  const labelClass = isTotal ? 'text-xl font-extrabold' : '';

  return (
    <div className={`flex justify-between ${isTotal ? 'pt-4 border-t-2 border-dashed border-gray-300 mt-4' : ''}`}>
      <span className={labelClass}>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
};

const FinancialSummaryCard = ({total}) => {
  const itemTotal = total;
  const deliveryFee = 40.00;
  const totalDisplay = itemTotal+deliveryFee;

  return (
    <div className="bg-white p-6 rounded-xl shadow-strong">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Financial Summary</h3>
      
      <div className="space-y-2 text-gray-700">
        <FinancialRow label="Item Total (Cost to Customer)" value={`₹${itemTotal.toFixed(2)}`} />
        <FinancialRow label="Delivery Fee" value={`₹${deliveryFee.toFixed(2)}`} />
                
        <FinancialRow 
          label="Total Charged" 
          value={`₹${totalDisplay.toFixed(2)}`} 
          isTotal 
        />
        
        <div className="flex justify-between text-sm pt-2">
          <span>Payment Method</span>
          <span className="font-semibold">Credit Card (Visa)</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummaryCard;