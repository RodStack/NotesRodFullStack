package com.notesrod.repositoriesdaos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.notesrod.models.NoteCategory;
import com.notesrod.models.NoteCategory.NoteCategoryKey;

@Repository
public interface NoteCategoryRepository extends JpaRepository<NoteCategory, NoteCategoryKey> {
}