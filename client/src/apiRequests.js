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
  update: (courseId, data) => axios.put(`/api/courses/${courseId}`),
  delete: courseId => axios.delete(`/api/courses/${courseId}`),
  register: data => axios.post('/api/courses', data)
}
