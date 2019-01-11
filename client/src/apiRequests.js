import axios from 'axios';

export const user = {
  login: data => axios.post('/api/users/login', data),
  logout: data => axios.get('/api/users/logout'),
  register: data => axios.post('/api/users', data),
  profile: () => axios.get('/api/users')
};
