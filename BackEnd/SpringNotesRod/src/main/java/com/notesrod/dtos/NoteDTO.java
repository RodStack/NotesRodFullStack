package com.notesrod.dtos;

import java.util.Date;
import java.util.List;

public class NoteDTO {

    private Long id;
    private String title;
    private String content;
    private Date creationDate;
    private Date modificationDate;
    private Boolean archived;
    private List<CategoryDTO> categories;
    private UserDTO user;

    public NoteDTO() {
    }

    public NoteDTO(Long id, String title, String content, Date creationDate, Date modificationDate, Boolean archived, UserDTO user) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.creationDate = creationDate;
        this.modificationDate = modificationDate;
        this.archived = archived;
        this.user = user;
    }
    
    public NoteDTO(Long id, String title, String content, Date creationDate, Date modificationDate,
            Boolean archived, List<CategoryDTO> categories, UserDTO user) {
	 this.id = id;
	 this.title = title;
	 this.content = content;
	 this.creationDate = creationDate;
	 this.modificationDate = modificationDate;
	 this.archived = archived;
	 this.categories = categories;
	 this.user = user;
	}

    public NoteDTO(Long id2, String title2, String content2, Boolean archived2,
			UserDTO userDTO) {
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(Date modificationDate) {
        this.modificationDate = modificationDate;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public List<CategoryDTO> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryDTO> categories) {
        this.categories = categories;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

}
