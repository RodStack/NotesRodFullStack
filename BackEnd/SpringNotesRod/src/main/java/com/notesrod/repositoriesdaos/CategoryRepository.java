package com.notesrod.repositoriesdaos;


import org.springframework.data.jpa.repository.JpaRepository;

import com.notesrod.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
	Category findByName(String name);
}
