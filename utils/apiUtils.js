// utils/apiUtils.js

import axios from "axios";

export const axiosWithRetry = axios.create();

axiosWithRetry.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (!config || !response) {
      return Promise.reject(error);
    }

    // Retry only on certain status codes (e.g., 429, 500, 502, 503, 504)
    if ([429, 500, 502, 503, 504].includes(response.status)) {
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount >= 3) {
        return Promise.reject(error);
      }

      config.__retryCount += 1;

      // Exponential backoff
      const delay = Math.pow(2, config.__retryCount) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));

      return axiosWithRetry(config);
    }

    return Promise.reject(error);
  }
);
