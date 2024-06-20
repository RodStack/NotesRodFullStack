package com.notesrod.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notesrod.models.Category;
import com.notesrod.models.Note;
import com.notesrod.models.NoteCategory;
import com.notesrod.models.NoteCategory.NoteCategoryKey;
import com.notesrod.repositoriesdaos.NoteCategoryRepository;

@Service
public class NoteCategoryService {

    private final NoteCategoryRepository noteCategoryRepository;
    private final NoteService noteService;
    private final CategoryService categoryService;

    @Autowired
    public NoteCategoryService(NoteCategoryRepository noteCategoryRepository, NoteService noteService, CategoryService categoryService) {
        this.noteCategoryRepository = noteCategoryRepository;
        this.noteService = noteService;
        this.categoryService = categoryService;
    }

    public void assignCategoryToNote(Long noteId, Long categoryId) {
        Note note = noteService.findById(noteId).orElseThrow(() -> new RuntimeException("Note not found"));
        Category category = categoryService.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));

        NoteCategoryKey key = new NoteCategoryKey(categoryId, noteId);
        NoteCategory noteCategory = new NoteCategory(key, category, note);

        noteCategoryRepository.save(noteCategory);
    }

    public void removeCategoryFromNote(Long noteId, Long categoryId) {
        Note note = noteService.findById(noteId).orElseThrow(() -> new RuntimeException("Note not found"));
        Category category = categoryService.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));

        NoteCategoryKey key = new NoteCategoryKey(categoryId, noteId);
        noteCategoryRepository.deleteById(key);
    }
}