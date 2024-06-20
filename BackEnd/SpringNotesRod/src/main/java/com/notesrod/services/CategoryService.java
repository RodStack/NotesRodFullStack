package com.notesrod.services;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.notesrod.models.Category;
import com.notesrod.repositoriesdaos.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	CategoryRepository categoryRepository;
	
	public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
    
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
    
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }
    
    public Optional<Category> findById(Long id){
    	return categoryRepository.findById(id);    
    }
    
    public List<Category> findAll(){
    	return categoryRepository.findAll();
    }
   
}