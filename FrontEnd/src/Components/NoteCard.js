import React from 'react';
import { FaTrash, FaPencilAlt, FaArchive, FaFileArchive } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NoteCard = ({ note, onDelete, onEdit, onArchive, onUnarchive, isArchived }) => {
  const categories = note.categories && Array.isArray(note.categories) ? note.categories : [];
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    const username = JSON.parse(localStorage.getItem('user')).username;
    navigate(`/user/${username}/category/${categoryName}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-2 relative w-64 h-48">
      <div className="absolute top-2 right-2">
        {isArchived ? (
          <button
            onClick={() => onUnarchive(note)}
            className="text-blue-500 hover:text-blue-700 mr-2"
          >
            <FaFileArchive />
          </button>
        ) : (
          <button
            onClick={() => onArchive(note)}
            className="text-green-500 hover:text-green-700 mr-2"
          >
            <FaArchive />
          </button>
        )}
        {!isArchived && (
          <button
            onClick={() => onEdit(note)}
            className="text-blue-500 hover:text-blue-700 mr-2"
          >
            <FaPencilAlt />
          </button>
        )}
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
      <p className="line-clamp-3">{note.content}</p>
      <div className="absolute bottom-12 right-2 text-blue-600 text-xs">
        Modified: {new Date(note.modificationDate).toLocaleDateString()}
      </div>
      {categories.length > 0 && (
        <div className="absolute bottom-2 right-2 flex flex-wrap">
          {categories.map((category) => (
            <span
              key={category.id}
              className="text-white font-medium rounded-full px-2 py-1 text-xs bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br hover:from-purple-700 hover:to-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition duration-300 ease-in-out mr-2 mb-1 cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteCard;