package com.notesrod.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notesrod.services.NoteCategoryService;

@RestController
@RequestMapping("/api/notes/{noteId}/categories")
public class NoteCategoryController {

    private final NoteCategoryService noteCategoryService;

    @Autowired
    public NoteCategoryController(NoteCategoryService noteCategoryService) {
        this.noteCategoryService = noteCategoryService;
    }

    @PostMapping("/{categoryId}")
    public ResponseEntity<Void> assignCategoryToNote(@PathVariable Long noteId, @PathVariable Long categoryId) {
        try {
            noteCategoryService.assignCategoryToNote(noteId, categoryId);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> removeCategoryFromNote(@PathVariable Long noteId, @PathVariable Long categoryId) {
        try {
            noteCategoryService.removeCategoryFromNote(noteId, categoryId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}