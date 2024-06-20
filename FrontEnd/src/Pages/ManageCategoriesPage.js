import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, removeCategory } from '../api';
import { FaTrash } from 'react-icons/fa';

const ManageCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const newCategory = await createCategory({ name: newCategoryName });
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await removeCategory(categoryId);
      setCategories(categories.filter((category) => category.id !== categoryId));
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-900">Manage Categories</h1>
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border border-gray-300 rounded-l-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleCreateCategory}
          className="bg-blue-500 text-white rounded-r-md px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br hover:from-purple-700 hover:to-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition duration-300 ease-in-out mr-2 mb-1 rounded-full px-6 py-2 text-lg font-semibold"
          >
            <span>{category.name}</span>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="ml-4 text-red-500 hover:text-red-600 focus:outline-none"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategoriesPage;