import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";

// Create base64 encoded credentials
const credentials = Buffer.from(`${apiKey}:${secretKey}`).toString("base64");

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Basic ${credentials}`,
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
