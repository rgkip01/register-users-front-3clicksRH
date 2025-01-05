import axios from 'axios';

const token = import.meta.env.VITE_BACKEND_AUTH_KEY;

console.log('Token carregado:', token);

const Api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default Api;
