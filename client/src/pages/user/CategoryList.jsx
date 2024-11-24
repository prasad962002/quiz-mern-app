import { useState } from "react";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import Layout from "../../components/layout/Layout";

const CategoryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { categories, isLoading, error } = useFetchCategories();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggleDescription = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  if (isLoading)
    return <div className="text-center">Loading categories...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Quiz Categories</h2>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category._id}
              className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2 overflow-hidden whitespace-nowrap text-ellipsis">{category.name}</h3>
              
              <p
                className={`text-gray-600 break-words overflow-hidden transition-all duration-300 mb-4 ${
                  expandedCategory !== category._id ? "max-h-16" : "max-h-full"
                }`} // Max-height for description
              >
                {expandedCategory === category._id
                  ? category.description
                  : `${category.description.slice(0, 50)}...`}
                
                {category.description.length > 50 && (
                  <button
                    onClick={() => handleToggleDescription(category._id)}
                    className="text-blue-500 font-medium ml-2 hover:underline"
                  >
                    {expandedCategory === category._id ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
              
              <a
                href={`/user/quizzes/${category._id}`}
                className="mt-2 inline-block bg-blue-500 text-white text-center font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
              >
                Explore Quizzes
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryList;