import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosapi";
import { toast } from "react-toastify";

// Added 'onUpdateSuccess' prop to notify the parent to refresh the list
const FoodModal = ({ isOpen, onClose, food, refresh }) => {
  const [foodDetails, setFoodDetails] = useState({
    name: "",
    price: "",
    status: true,
    description: "",
  });

  useEffect(() => {
    // Only fetch if the modal is open and we have a food ID
    if (isOpen && food?.id) {
      axiosInstance
        .get(`/api/products/resturant-food/${food.id}/`)
        .then((res) => {
          setFoodDetails({
            name: res.data.name || "",
            price: res.data.price || "",
            status: res.data.status,
            description: res.data.description || "",
          });

        }
      )
        .catch((err) => console.error("Fetch Error:", err));
    }
  }, [isOpen,food?.id]); // Dependencies updated

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle checkboxes/selects and text inputs properly
    setFoodDetails({
      ...foodDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clean data: Convert price string to a float for the backend
    const updatedData = {
      ...foodDetails,
      price: parseFloat(foodDetails.price),
    };

    axiosInstance
      .patch(`api/products/resturant-food/${food.id}/`, updatedData)
      .then((res) => {
        refresh(prev=>!prev)
        toast.success("Food Updated")
        onClose(); 
      })
      .catch((err) => {
        console.error("PUT ERROR:", err.response?.data || err);
        toast.error("Failed to update: " + JSON.stringify(err.response?.data));
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Edit {foodDetails.name}</h2>
          <button onClick={onClose} className="text-2xl font-bold hover:text-gray-500">
            &times;
          </button>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={foodDetails.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={foodDetails.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={String(foodDetails.status)}
              onChange={(e) =>
                setFoodDetails({
                  ...foodDetails,
                  status: e.target.value === "true",
                })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={foodDetails.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="3"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Update Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodModal;



