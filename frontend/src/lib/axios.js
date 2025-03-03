import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance };

