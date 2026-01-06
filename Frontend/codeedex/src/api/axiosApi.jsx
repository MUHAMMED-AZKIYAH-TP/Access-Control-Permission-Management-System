import axios from "axios";




const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:8000/api/v1/"
        : "https://access-control-permission-management-system.onrender.com/api/v1/"


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      // Optional redirect
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
