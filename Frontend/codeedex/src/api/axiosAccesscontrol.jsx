import axios from "axios";


const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:8000/api/v1/access/"
        : "https://access-control-permission-management-system.onrender.com/api/v1/access/"


export const apiAccesscontrol = axios.create({
  baseURL: API_BASE_URL,
});


apiAccesscontrol.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; 
  },
  (error) => Promise.reject(error)
);


apiAccesscontrol.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access");
      window.location.href = "/login";
    }

    return Promise.reject(error); 
  }
);
