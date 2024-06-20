import axios from 'axios';

const API_BASE_URL = 'http://localhost:54902/api';

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, { username, password });
  return response.data;
};

export const getNoteById = async (noteId) => {
    const response = await axios.get(`${API_BASE_URL}/notes/${noteId}`);
    return response.data;
  };

export const getNotes = async (username) => {
  const response = await axios.get(`${API_BASE_URL}/notes/user/${username}`);
  return response.data;
};

export const createNote = async (note, username, categoryIds = '') => {
  const queryString = `?username=${encodeURIComponent(username)}&categoryIds=${encodeURIComponent(categoryIds)}`;
  const response = await axios.post(`${API_BASE_URL}/notes/add${queryString}`, note);
  return response.data;
};

export const updateNote = async (note) => {
  const response = await axios.put(`${API_BASE_URL}/notes/${note.id}`, note);
  return response.data;
};

export const deleteNote = async (noteId) => {
  await axios.delete(`${API_BASE_URL}/notes/${noteId}`);
};

export const archiveNote = async (noteId) => {
  await axios.put(`${API_BASE_URL}/notes/${noteId}/archive`);
};

export const unarchiveNote = async (noteId) => {
  await axios.put(`${API_BASE_URL}/notes/${noteId}/unarchive`);
};

export const getActiveNotes = async (username) => {
  const response = await axios.get(`${API_BASE_URL}/notes/active`, { params: { username } });
  return response.data;
};

export const getArchivedNotes = async (username) => {
  const response = await axios.get(`${API_BASE_URL}/notes/archived`, { params: { username } });
  return response.data;
};


export const getNoteCategory = async (noteId) => {
  const response = await axios.get(`${API_BASE_URL}/notes/${noteId}/categories`);
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(`${API_BASE_URL}/categories`, category);
  return response.data;
};

export const removeCategory = async (categoryId) => {
  const response = await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};


export const getNotesByUserAndCategory = async (username, categoryName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes/user/${username}/category/${categoryName}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw error;
  }
};

export const assignCategoryToNote = async (noteId, categoryId) => {
  try {
    await axios.post(`${API_BASE_URL}/notes/${noteId}/categories/${categoryId}`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Note or category not found');
    } else {
      throw new Error('Failed to assign category to note');
    }
  }
};

export const removeCategoryFromNote = async (noteId, categoryId) => {
  try {
    await axios.delete(`${API_BASE_URL}/notes/${noteId}/categories/${categoryId}`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Note or category not found');
    } else {
      throw new Error('Failed to remove category from note');
    }
  }
};