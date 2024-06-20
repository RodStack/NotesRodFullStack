import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, updateNote, getCategories, assignCategoryToNote, removeCategoryFromNote } from '../api';

const EditNotePage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [currentCategoryIds, setCurrentCategoryIds] = useState([]);

  useEffect(() => {
    const fetchNoteAndCategories = async () => {
      try {
        const note = await getNoteById(noteId);
        setTitle(note.title);
        setContent(note.content);
        setSelectedCategoryIds(note.categories ? note.categories.map(cat => cat.id) : []);
        setCurrentCategoryIds(note.categories ? note.categories.map(cat => cat.id) : []);

        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch note or categories:', error);
      }
    };

    fetchNoteAndCategories();
  }, [noteId]);

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    const updatedNote = {
      id: noteId,
      title,
      content,
      modificationDate: new Date().toISOString(),
      archived: false,
      user: {
        id: JSON.parse(localStorage.getItem('user')).id,
        username: JSON.parse(localStorage.getItem('user')).username,
      },
    };

    try {
      await updateNote(updatedNote);

      // Update categories
      const newCategoryIds = selectedCategoryIds;

      // Remove categories that are no longer selected
      const categoriesToRemove = currentCategoryIds.filter(id => !newCategoryIds.includes(id));
      await Promise.all(categoriesToRemove.map(categoryId => removeCategoryFromNote(noteId, categoryId)));

      // Add newly selected categories
      const categoriesToAdd = newCategoryIds.filter(id => !currentCategoryIds.includes(id));
      await Promise.all(categoriesToAdd.map(categoryId => assignCategoryToNote(noteId, categoryId)));
      
      navigate('/');
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note.');
    }
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategoryIds(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">Edit Note</h2>
      <form onSubmit={handleUpdateNote}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
          <textarea
            id="content"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Categories:</label>
          <div>
            {categories.map(category => ( 
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ${selectedCategoryIds.includes(category.id) ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Update Note
        </button>
      </form>
    </div>
  );
};

export default EditNotePage;