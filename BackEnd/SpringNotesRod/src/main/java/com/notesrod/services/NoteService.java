package com.notesrod.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notesrod.models.Category;
import com.notesrod.models.Note;
import com.notesrod.models.User;
import com.notesrod.repositoriesdaos.CategoryRepository;
import com.notesrod.repositoriesdaos.NoteRepository;

@Service
public class NoteService {
	
	Date date = Date.valueOf(LocalDate.now());
	@Autowired
    private NoteRepository noteRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;

	
    public Note createNote(Note note, User user) {
    	note.setCreationDate(date);
    	note.setModificationDate(date);
    	note.setArchived(false);
        note.setUser(user);
        return noteRepository.save(note);
    }

    public Note updateNote(Note note) {
    	note.setModificationDate(date);
        return noteRepository.save(note);
    }

    public void deleteNote(Long noteId) {
        Note note = noteRepository.findById(noteId).orElseThrow(() -> new RuntimeException("Note not found"));

        // Remove the note from associated categories
        List<Category> categories = note.getCategories();
        for (Category category : categories) {
            category.getNotes().remove(note);
            categoryRepository.save(category); // Save the updated category
        }

        // Now you can safely delete the note
        noteRepository.delete(note);
    }

    public void archiveNote(Long noteId) {
        Note note = noteRepository.findById(noteId).orElseThrow(() -> new RuntimeException("Note not found"));
        note.setArchived(true);
        noteRepository.save(note);
    }

    public void unarchiveNote(Long noteId) {
        Note note = noteRepository.findById(noteId).orElseThrow(() -> new RuntimeException("Note not found"));
        note.setArchived(false);
        noteRepository.save(note);
    }

    public List<Note> getActiveNotesByUser(User user) {
        return noteRepository.findByUserAndArchivedFalse(user);
    }

    public List<Note> getArchivedNotesByUser(User user) {
        return noteRepository.findByUserAndArchivedTrue(user);
    }

    public List<Note> getNotesByUserAndCategory(User user, Category category) {
        return noteRepository.findByUserAndCategoriesContaining(user, category);
    }
    
    public Optional<Note> findById(Long noteId){
    	return noteRepository.findById(noteId);
    }
    
    public Note save(Note note) {
    	return noteRepository.save(note);
    }
    
    public void assignCategoryToNote(Long noteId, Long categoryId) {
        noteRepository.assignCategoryToNote(noteId, categoryId);
    }
    
    public void removeCategoryFromNote(Long noteId, Long categoryId) {
    	noteRepository.removeCategoryFromNote(noteId, categoryId);
    }
    
}