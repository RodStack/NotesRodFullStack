import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const FloatingButton = () => {
  return (
    <Link
      to="/notes/create"
      className="fixed bottom-8 right-8 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition duration-300 ease-in-out"
    >
      <FaPlus className="text-3xl text-white" />
    </Link>
  );
};

export default FloatingButton;