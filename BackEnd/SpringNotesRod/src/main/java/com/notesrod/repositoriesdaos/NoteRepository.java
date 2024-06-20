package com.notesrod.repositoriesdaos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.notesrod.models.Category;
import com.notesrod.models.Note; 
import com.notesrod.models.User;

public interface NoteRepository extends JpaRepository<Note, Long>{
	List<Note> findByUserAndArchivedFalse(User user);
	List<Note> findByUserAndArchivedTrue(User user);
	List<Note> findByUserAndCategoriesContaining(User user, Category category);
	Optional<Note> findById(Long noteId);
	
	@Transactional
	@Modifying
    @Query(value = "INSERT INTO note_category (note_id, category_id) VALUES (:noteId, :categoryId) ON DUPLICATE KEY UPDATE category_id = :categoryId", nativeQuery = true)
    void assignCategoryToNote(Long noteId, Long categoryId);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM note_category WHERE note_id = :noteId AND category_id = :categoryId", nativeQuery = true)
	void removeCategoryFromNote(Long noteId, Long categoryId);
}
