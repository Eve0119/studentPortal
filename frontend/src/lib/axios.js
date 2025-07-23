// axiosInstance.js
import axios from "axios";
import { auth } from "./firebase"; // Your Firebase config file

const BASE_URL = import.meta.env.MODE === 'development' 
  ? 'http://localhost:3000/api' 
  : '/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

// Add request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;