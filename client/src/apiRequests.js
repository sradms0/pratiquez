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
  single: (courseId, sectionId) => axios.get(`/api/courses/${courseId}/sections/${sectionId}`),
  update: (sectionId, data) => axios.put(`/api/sections/${sectionId}`, data),
  delete: sectionId => axios.delete(`/api/sections/${sectionId}`),
  register: data => axios.post('/api/sections', data)
};
