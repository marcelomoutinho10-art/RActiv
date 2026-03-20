import axios from 'axios';

export const api = {
  getEntries: (params) => axios.get('/api/entries', { params }).then(r => r.data),
  getDailyTotals: (params) => axios.get('/api/entries/daily-totals', { params }).then(r => r.data),
  getCategories: () => axios.get('/api/categories').then(r => r.data),
  getProjects: () => axios.get('/api/projects').then(r => r.data),
};
