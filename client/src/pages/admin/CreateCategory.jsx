import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-hot-toast";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import Layout from "../../components/layout/Layout";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, error, isLoading, fetchCategories } = useFetchCategories();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editCategoryId) {
        // Update existing category
        await axiosInstance.put(`/category/${editCategoryId}`, {
          name,
          description,
        });
        toast.success("Category updated successfully!");
      } else {
        // Create new category
        await axiosInstance.post("/category", {
          name,
          description,
        });
        toast.success("Category created successfully!");
      }
      // Reset form and fetch updated categories
      setName("");
      setDescription("");
      setEditCategoryId(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create category.");
    }
  };

  const handleEdit = (category) => {
    setEditCategoryId(category._id);
    setName(category.name);
    setDescription(category.description);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axiosInstance.delete(`/category/${categoryId}`);
        toast.success("Category deleted successfully!");
        fetchCategories(); // Refetch categories after deletion
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to delete category.");
      }
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout role="admin">
<div className="flex flex-col md:flex-row gap-8 px-6 py-8 mt-24">
      {/* Create or Edit Category Form */}
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 h-auto md:h-auto border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold mb-6 text-teal-600">
          {editCategoryId ? "Update Category" : "Create Category"}
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition duration-300 ease-in-out w-full"
          >
            {editCategoryId ? "Update Category" : "Create Category"}
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 h-96 overflow-y-auto border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-6 text-orange-600">All Categories</h2>

        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {isLoading && <p className="text-teal-500">Loading categories...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories available.</p>
        ) : (
          <ul className="space-y-4">
            {filteredCategories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between items-start bg-gray-50 p-4 border rounded-lg shadow-sm"
              >
                <div className="w-3/4">
                  <p className="font-semibold text-gray-800">{category.name}</p>
                  <p className="text-gray-600 break-words overflow-hidden">
                    {category.description}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
              </Layout>
  );
};

export default CreateCategory;
