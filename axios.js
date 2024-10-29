// axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (config.flyURL) {
      config.baseURL = config.flyURL;
      delete config.flyURL;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
