import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

export default axios;
