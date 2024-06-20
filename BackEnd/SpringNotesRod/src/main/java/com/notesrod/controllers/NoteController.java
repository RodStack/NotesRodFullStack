package com.notesrod.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.notesrod.dtos.CategoryDTO;
import com.notesrod.dtos.NoteDTO;
import com.notesrod.dtos.UserDTO;
import com.notesrod.models.Category;
import com.notesrod.models.Note;
import com.notesrod.models.User;
import com.notesrod.services.CategoryService;
import com.notesrod.services.NoteService;
import com.notesrod.services.UserService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    
    @Autowired
    private NoteService noteService;
    @Autowired
    private UserService userService;
    @Autowired
    private CategoryService categoryService;
    
    @PostMapping("/add")
    public ResponseEntity<NoteDTO> createNote(@RequestBody NoteDTO noteDTO, @RequestParam String username, @RequestParam(required = false) List<Long> categoryIds) {
        User user = userService.getUserByUsername(username);
        Note note = new Note(
            noteDTO.getTitle(),
            noteDTO.getContent(),
            noteDTO.getCreationDate(),
            noteDTO.getModificationDate(),
            noteDTO.getArchived(),
            user
        );
        Note createdNote = noteService.createNote(note, user);

        if (categoryIds != null && !categoryIds.isEmpty()) {
            for (Long categoryId : categoryIds) {
                noteService.assignCategoryToNote(createdNote.getId(), categoryId);
            }
        }

        NoteDTO createdNoteDTO = new NoteDTO(
            createdNote.getId(),
            createdNote.getTitle(),
            createdNote.getContent(),
            createdNote.getCreationDate(),
            createdNote.getModificationDate(),
            createdNote.getArchived(),
            new UserDTO(createdNote.getUser().getId(), createdNote.getUser().getUsername())
        );
        return ResponseEntity.ok(createdNoteDTO);
    }
    
    @GetMapping("/{noteId}")
    public ResponseEntity<NoteDTO> getNoteById(@PathVariable Long noteId) {
        Optional<Note> optionalNote = noteService.findById(noteId);
        if (optionalNote.isPresent()) {
            Note note = optionalNote.get();
            NoteDTO noteDTO = new NoteDTO(
                    note.getId(),
                    note.getTitle(),
                    note.getContent(),
                    note.getCreationDate(),
                    note.getModificationDate(),
                    note.getArchived(),
                    note.getCategories() != null ? note.getCategories().stream()
                            .map(category -> new CategoryDTO(category.getId(), category.getName()))
                            .collect(Collectors.toList()) : null,
                    new UserDTO(note.getUser().getId(), note.getUser().getUsername())
            );
            return ResponseEntity.ok(noteDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteDTO> updateNote(@PathVariable Long id, @RequestBody NoteDTO noteDTO) {
        Note note = new Note(
                noteDTO.getTitle(),
                noteDTO.getContent(),
                noteDTO.getCreationDate(),
                noteDTO.getModificationDate(),
                noteDTO.getArchived(),
                userService.getUserByUsername(noteDTO.getUser().getUsername())
        );
        note.setId(id);
        Note updatedNote = noteService.updateNote(note);
        NoteDTO updatedNoteDTO = new NoteDTO(
                updatedNote.getId(),
                updatedNote.getTitle(),
                updatedNote.getContent(),
                updatedNote.getArchived(),
                new UserDTO(updatedNote.getUser().getId(), updatedNote.getUser().getUsername())
        );
        return ResponseEntity.ok(updatedNoteDTO);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}/archive")
    public ResponseEntity<Void> archiveNote(@PathVariable Long id) {
        noteService.archiveNote(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/unarchive")
    public ResponseEntity<Void> unarchiveNote(@PathVariable Long id) {
        noteService.unarchiveNote(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<NoteDTO>> getActiveNotesByUser(@RequestParam String username) {
        User user = userService.getUserByUsername(username);
        List<Note> activeNotes = noteService.getActiveNotesByUser(user);
        List<NoteDTO> activeNotesDTO = activeNotes.stream()
                .map(note -> new NoteDTO(
                        note.getId(),
                        note.getTitle(),
                        note.getContent(),
                        note.getCreationDate(),
                        note.getModificationDate(),
                        note.getArchived(),
                        new UserDTO(note.getUser().getId(), note.getUser().getUsername())
                )).collect(Collectors.toList());
        return ResponseEntity.ok(activeNotesDTO);
    }
    @GetMapping("/archived")
    public ResponseEntity<List<NoteDTO>> getArchivedNotesByUser(@RequestParam String username) {
        User user = userService.getUserByUsername(username);
        List<Note> archivedNotes = noteService.getArchivedNotesByUser(user);
        List<NoteDTO> archivedNotesDTO = archivedNotes.stream()
                .map(note -> new NoteDTO(
                        note.getId(),
                        note.getTitle(),
                        note.getContent(),
                        note.getCreationDate(),
                        note.getModificationDate(),
                        note.getArchived(),
                        new UserDTO(note.getUser().getId(), note.getUser().getUsername())
                )).collect(Collectors.toList());
        return ResponseEntity.ok(archivedNotesDTO);
    }

    @GetMapping("/user/{username}/category/{categoryName}")
    public ResponseEntity<List<NoteDTO>> getNotesByUserAndCategory(@PathVariable String username, @PathVariable String categoryName) {
        User user = userService.getUserByUsername(username);
        Category category = categoryService.getCategoryByName(categoryName);
        List<Note> notes = noteService.getNotesByUserAndCategory(user, category);
        List<NoteDTO> notesDTO = notes.stream()
                .map(note -> new NoteDTO(
                        note.getId(),
                        note.getTitle(),
                        note.getContent(),
                        note.getCreationDate(),
                        note.getModificationDate(),
                        note.getArchived(),
                        new UserDTO(note.getUser().getId(), note.getUser().getUsername())
                )).collect(Collectors.toList());
        return ResponseEntity.ok(notesDTO);
    }
    
    @GetMapping("/{noteId}/categories")
    public ResponseEntity<List<CategoryDTO>> getCategoriesOfNote(@PathVariable Long noteId) {
        Note note = noteService.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        List<Category> categories = note.getCategories();
        List<CategoryDTO> categoriesDTO = categories.stream()
                .map(category -> new CategoryDTO(
                        category.getId(),
                        category.getName()
                )).collect(Collectors.toList());
        return ResponseEntity.ok(categoriesDTO);
    }
    
}
