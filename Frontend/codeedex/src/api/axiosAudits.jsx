import axios from "axios";





export const apiAudit = axios.create({
  baseURL: "https://access-control-permission-management-lk8u.onrender.com/api/v1/audit/",
});




apiAudit.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; 
  },
  (error) => Promise.reject(error)
);


apiAudit.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access");
      window.location.href = "/login";
    }

    return Promise.reject(error); 
  }
);
