// ArchivedNotesPage.js
import React, { useEffect, useState } from 'react';
import { getArchivedNotes, deleteNote, unarchiveNote, getNoteCategory } from '../api';
import NoteCard from '../Components/NoteCard';

const ArchivedNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.username : null;

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      try {
        const archivedNotes = await getArchivedNotes(username);
        const notesWithCategories = await Promise.all(
          archivedNotes.map(async (note) => {
            const categories = await getNoteCategory(note.id);
            return { ...note, categories };
          })
        );
        setNotes(notesWithCategories);
      } catch (error) {
        console.error('Error fetching archived notes:', error);
      }
    };

    fetchArchivedNotes();
  }, [username]);

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleUnarchive = async (note) => {
    try {
      await unarchiveNote(note.id);
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
    } catch (error) {
      console.error('Failed to unarchive note:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-4 text-center text-indigo-900">Archived Notes</h1>
      <div className="flex flex-wrap justify-start">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDelete}
              onUnarchive={handleUnarchive}
              isArchived={true}
            />
          ))
        ) : (
          <p className='text-xl font-bold my-4 text-center text-indigo-900'>No archived notes found.</p>
        )}
      </div>
    </div>
  );
};

export default ArchivedNotesPage;