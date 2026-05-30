import axios from 'axios';

const api = axios.create({
  baseURL: 'https://v0-json-api-three.vercel.app/api',
});

export default api;