import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-hot-toast";
import { useFetchCategories } from "../../hooks/useFetchCategories";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [serachTerm, setSearchTerm] = useState("");
  const { categories, error, isLoading, fetchCategories } =
    useFetchCategories();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editCategoryId) {
        //Update existing category
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
    category.name.toLowerCase().includes(serachTerm.toLowerCase())
  );
  return (
    <div className="flex">
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {editCategoryId ? "Update Category" : "Create Category"}
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {editCategoryId ? "Update Category" : "Create Category"}
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="max-w-md mx-auto mt-8 ml-8">
        <h2 className="text-2xl font-bold mb-4">All Categories</h2>

        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search categories..."
            value={serachTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        {isLoading && <p>Loading categories...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          <ul>
            {filteredCategories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between items-center mb-2 p-2 border rounded"
              >
                <div>
                  <strong>{category.name}</strong> : {category.description}
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
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
  );
};

export default CreateCategory;
