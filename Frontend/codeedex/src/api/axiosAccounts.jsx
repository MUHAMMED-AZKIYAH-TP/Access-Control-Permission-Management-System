import axios from "axios";


const API_BASE_URL = "https://access-control-permission-management-lk8u.onrender.com/api/v1/accounts/"


export const apiAccounts = axios.create({
  baseURL: API_BASE_URL,
});

apiAccounts.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; 
  },
  (error) => Promise.reject(error)
);


apiAccounts.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access");
      window.location.href = "/login";
    }

    return Promise.reject(error); 
  }
);
