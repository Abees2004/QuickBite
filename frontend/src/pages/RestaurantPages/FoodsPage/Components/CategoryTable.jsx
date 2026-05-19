import { useEffect, useState } from 'react';
import FoodModal from './FoodModal';
import axios from 'axios';


const CategoryTable = ({foods,onView}) => {

  return (
    <section className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">Existing Foods</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Food</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {foods.map((food) => (
              <tr key={food.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{food.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{food.category.name}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800">${food.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${food.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {food.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-3">
                 <button onClick={() => onView(food)} className="text-blue-600 hover:underline font-semibold">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  );
};

export default CategoryTable;