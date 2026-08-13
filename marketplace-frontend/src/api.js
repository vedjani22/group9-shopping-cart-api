import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

// attach the saved token to every request automatically, if we have one
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
