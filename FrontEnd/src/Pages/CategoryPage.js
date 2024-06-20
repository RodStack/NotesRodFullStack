import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteCard from '../Components/NoteCard';
import { getNotesByUserAndCategory, deleteNote, getNoteCategory, archiveNote } from '../api';
import CategorySidebar from '../Components/CategorySideBar';

const CategoryPage = () => {
  const [notes, setNotes] = useState([]);
  const { username, categoryName } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesByCategory = await getNotesByUserAndCategory(username, categoryName);
        if (Array.isArray(notesByCategory) && notesByCategory.length > 0) {
          const notesWithCategories = await Promise.all(
            notesByCategory.map(async (note) => {
              const categories = await getNoteCategory(note.id);
              return { ...note, categories };
            })
          );
          setNotes(notesWithCategories);
        } else {
          console.warn('No notes found for the specified category.');
          setNotes([]);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [username, categoryName]);

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleEdit = (note) => {
    console.log('Editing note:', note);
    // Navigate to edit page or handle inline editing
  };

  const handleArchive = async (noteId) => {
    try {
      await archiveNote(noteId);
      setNotes(prevNotes => prevNotes.map(note => note.id === noteId ? { ...note, archived: true } : note));
    } catch (error) {
      console.error('Failed to archive note:', error);
    }
  };

  return (
    <div className="flex">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold my-4 text-center text-indigo-900">{categoryName} Notes</h1>
        <div className="flex flex-wrap justify-start">
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onArchive={handleArchive}
              onDelete={handleDelete}
              onEdit={handleEdit}
              isArchived={note.archived} // Pass the archived status as prop
            />
          ))}
        </div>
      </div>
      <CategorySidebar />
    </div>
  );
};

export default CategoryPage;
