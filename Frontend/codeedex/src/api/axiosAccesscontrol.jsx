import axios from "axios";

export const apiAccesscontrol = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/access/",
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
