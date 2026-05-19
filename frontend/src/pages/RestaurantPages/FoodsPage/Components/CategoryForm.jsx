import { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosapi";
import { toast } from "react-toastify";

const CategoryForm = ({ refresh }) => {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    cateogory: "",
    status: true,
    isVeg: true,
    foodDescription: "",
    image: null,
  });

  // Error states
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/api/products/cateogory/`)
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error(err);
        setServerError("Failed to load categories");
      });
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));

    // Remove field error while typing
    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));

    setServerError("");
  };

  // Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Food name is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.cateogory) {
      newErrors.cateogory = "Please select a category";
    }

    if (!formData.foodDescription.trim()) {
      newErrors.foodDescription = "Description is required";
    }

    // Optional image validation
    if (formData.image) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(formData.image.type)) {
        newErrors.image = "Only JPG, PNG, and WEBP images are allowed";
      }

      if (formData.image.size > 2 * 1024 * 1024) {
        newErrors.image = "Image size must be below 2MB";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      cateogory: "",
      status: true,
      isVeg: true,
      foodDescription: "",
      image: null,
    });

    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validateForm()) return;

    const data = new FormData();

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category_id", formData.cateogory);
    data.append("status", formData.status);
    data.append("is_veg", formData.isVeg);
    data.append("description", formData.foodDescription);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post(
        `/api/products/resturant-food-add/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Food added successfully!");

      console.log(res.data);

      resetForm();

      refresh((prev) => !prev);
    } catch (err) {
      console.error("Error:", err.response?.data);

      // Backend validation errors
      if (err.response?.data) {
        const backendErrors = err.response.data;

        let formattedErrors = {};

        Object.keys(backendErrors).forEach((key) => {
          formattedErrors[key] = backendErrors[key][0];
        });

        setErrors(formattedErrors);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
        Add New Food
      </h2>

      {serverError && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
          {serverError}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Food Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Name
          </label>

          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg outline-none ${
              errors.name ? "border-red-500" : ""
            }`}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>

          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg outline-none ${
              errors.price ? "border-red-500" : ""
            }`}
          />

          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>

          <input
            type="file"
            id="image"
            onChange={handleChange}
            className="text-sm w-full"
          />

          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>

          <select
            id="cateogory"
            value={formData.cateogory}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg outline-none bg-white ${
              errors.cateogory ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {errors.cateogory && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cateogory}
            </p>
          )}
        </div>

        {/* Veg */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isVeg"
            checked={formData.isVeg}
            onChange={handleChange}
          />

          <label htmlFor="isVeg" className="text-sm text-gray-700">
            Is Vegetarian?
          </label>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>

          <textarea
            id="foodDescription"
            value={formData.foodDescription}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg outline-none ${
              errors.foodDescription ? "border-red-500" : ""
            }`}
            rows="3"
          />

          {errors.foodDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.foodDescription}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Food Item"}
        </button>
      </form>
    </section>
  );
};

export default CategoryForm;