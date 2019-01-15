import axios from 'axios';

export const user = {
  login: data => axios.post('/api/users/login', data),
  logout: data => axios.get('/api/users/logout'),
  register: data => axios.post('/api/users', data),
  profile: () => axios.get('/api/users')
};

export const courses = {
  all: () => axios.get('/api/courses'),
  single: courseId => axios.get(`/api/courses/${courseId}`),
  update: (courseId, data) => axios.put(`/api/courses/${courseId}`, data),
  delete: courseId => axios.delete(`/api/courses/${courseId}`),
  register: data => axios.post('/api/courses', data)
};

export const sections = {
  all: () => axios.get('/api/sections'),
  allCourseSections: courseId => axios.get(`/api/courses/${courseId}/sections`),
  single: (courseId, sectionId) => axios.get(`/api/courses/${courseId}/sections/${sectionId}`),
  update: (sectionId, data) => axios.put(`/api/sections/${sectionId}`, data),
  delete: sectionId => axios.delete(`/api/sections/${sectionId}`),
  register: data => axios.post('/api/sections', data)
};

export const terms = {
  all: () => axios.get('/api/terms'),
  allSectionTerms: sectionId => axios.get(`/api/sections/${sectionId}/terms`),
  single: (sectionId, termId) => axios.get(`/api/sections/${sectionId}/terms/${termId}`),
  update: (termId, data) => axios.put(`/api/terms/${termId}`, data),
  delete: termId => axios.delete(`/api/terms/${termId}`),
  register: data => axios.post('/api/terms', data)
};

export const notes = {
  all: () => axios.get('/api/notes'),
  allSectionTerms: sectionId => axios.get(`/api/sections/${sectionId}/notes`),
  single: (sectionId, noteId) => axios.get(`/api/sections/${sectionId}/notes/${noteId}`),
  update: (noteId, data) => axios.put(`/api/notes/${noteId}`, data),
  delete: noteId => axios.delete(`/api/notes/${noteId}`),
  register: data => axios.post('/api/notes', data)
};
