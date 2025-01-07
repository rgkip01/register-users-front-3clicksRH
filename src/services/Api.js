import axios from 'axios';

const token = import.meta.env.VITE_BACKEND_AUTH_KEY;

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default Api;
