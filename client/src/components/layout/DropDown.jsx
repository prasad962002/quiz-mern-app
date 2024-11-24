import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useFetchCategories } from "../../hooks/useFetchCategories";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Use the custom hook to fetch categories
  const { categories, isLoading, error } = useFetchCategories();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = () => {
    setIsOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-between w-full rounded-md shadow-sm bg-white font-medium text-gray-800 hover:bg-gray-50 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          CATEGORY
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 inline-block"
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {isLoading && (
              <div className="px-4 py-2 text-sm text-gray-700">Loading...</div>
            )}
            {error && (<div className="px-4 py-2 text-sm text-red-600">{error}</div>
)}
            {!isLoading && !error && categories.length > 0 ? (
              <>
              {categories.slice(0, 10).map((category) => (
                <Link
                  key={category._id}
                  to={`/user/quizzes/${category._id}`}
                  onClick={handleOptionClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {category.name}
                </Link>
              ))}

              <Link                  
                  to={`/user/category`}
                  onClick={handleOptionClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  View All Categories
                </Link>
              </>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-700">
                No categories available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
