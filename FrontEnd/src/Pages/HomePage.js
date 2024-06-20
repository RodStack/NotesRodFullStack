// HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../Components/NoteCard';
import { getActiveNotes, deleteNote, getNoteCategory, archiveNote } from '../api';
import CategorySidebar from '../Components/CategorySideBar';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.username : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const activeNotes = await getActiveNotes(username);
        const notesWithCategories = await Promise.all(
          activeNotes.map(async (note) => {
            const categories = await getNoteCategory(note.id);
            return { ...note, categories };
          })
        );
        setNotes(notesWithCategories);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [username]);

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleEdit = (note) => {
    navigate(`/edit/${note.id}`);
  };

  const handleArchive = async (note) => {
    try {
      await archiveNote(note.id);
      setNotes(prevNotes => prevNotes.filter(n => n.id !== note.id)); // Remove from UI after archiving
    } catch (error) {
      console.error('Failed to archive note:', error);
    }
  };

  return (
    <div className="flex">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold my-4 text-center text-indigo-900">Notes</h1>
        <div className="flex flex-wrap justify-start">
          {notes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            onArchive={handleArchive}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          ))}
        </div>
      </div>
      <CategorySidebar />
    </div>
   
  );
};

export default HomePage;