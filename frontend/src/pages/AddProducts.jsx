import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoriesApi } from "../api/categoryApi";
import { createProductApi } from "../api/productApi"

function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesApi();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("category", formData.category);

    if (formData.image) {
      productData.append("image", formData.image);
    }

    try {
      const data = await createProductApi(productData);    
      alert("Product created successfully!");
      navigate("/my-products");
    } catch (error) {
      console.error("Create product failed:", error);
      alert("Failed to create product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Product
          </h1>
          <p className="text-gray-500 mt-2">
            Add your product details and publish instantly
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Product Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl border border-gray-300
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-all duration-300 outline-none"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Describe your product..."
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl border border-gray-300
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-all duration-300 outline-none resize-none"
            required
          />

          <div className="grid grid-cols-2 gap-5">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="px-5 py-4 rounded-2xl border border-gray-300
              focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              required
            />

          
          </div>

          {/* Category Dropdown */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl border border-gray-300
            focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            required
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Image Upload */}
          <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center hover:bg-blue-50 transition cursor-pointer">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500
              text-white rounded-2xl font-semibold shadow-lg
              hover:scale-105 transition-all duration-300"
            >
              Create Product
            </button>

            <button
              type="button"
              onClick={() => navigate("/my-products")}
              className="px-8 py-4 border border-gray-300 rounded-2xl
              hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;