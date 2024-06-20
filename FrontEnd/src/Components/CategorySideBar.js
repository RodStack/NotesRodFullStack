import React, { useEffect, useState } from 'react';
import { getCategories } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleCategoryClick = (categoryName) => {
    const username = JSON.parse(localStorage.getItem('user')).username;
    navigate(`/user/${username}/category/${categoryName}`);
  };

  const isActiveCategory = (categoryName) => {
    return decodeURIComponent(location.pathname) === `/user/${JSON.parse(localStorage.getItem('user')).username}/category/${categoryName}`;
  };

  return (
    <div className="w-1/4 p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-indigo-900">Categories</h2>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`font-medium rounded-full px-4 py-2 text-sm cursor-pointer transition duration-300 ease-in-out text-center ${
              isActiveCategory(category.name)
                ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white'
                : 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white hover:border-transparent'
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name.replace(/%20/g, ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;