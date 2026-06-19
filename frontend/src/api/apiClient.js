import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_DJANGO_BASE_URL,
  withCredentials: true, // important for HttpOnly cookies
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default apiClient;