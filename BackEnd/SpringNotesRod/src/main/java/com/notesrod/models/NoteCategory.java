package com.notesrod.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "note_category")
public class NoteCategory {

    @EmbeddedId
    private NoteCategoryKey id;

    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @MapsId("noteId")
    @JoinColumn(name = "note_id")
    private Note note;

    // Constructors
    public NoteCategory() {}

    public NoteCategory(NoteCategoryKey id, Category category, Note note) {
        this.id = id;
        this.category = category;
        this.note = note;
    }

    // Getters and Setters
    public NoteCategoryKey getId() {
        return id;
    }

    public void setId(NoteCategoryKey id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Note getNote() {
        return note;
    }

    public void setNote(Note note) {
        this.note = note;
    }

    @Embeddable
    public static class NoteCategoryKey implements Serializable {
        private static final long serialVersionUID = 1L;

        @Column(name = "category_id")
        private Long categoryId;

        @Column(name = "note_id")
        private Long noteId;

        // Constructors
        public NoteCategoryKey() {}

        public NoteCategoryKey(Long categoryId, Long noteId) {
            this.categoryId = categoryId;
            this.noteId = noteId;
        }

        // Getters and Setters
        public Long getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Long categoryId) {
            this.categoryId = categoryId;
        }

        public Long getNoteId() {
            return noteId;
        }

        public void setNoteId(Long noteId) {
            this.noteId = noteId;
        }
    }
}
