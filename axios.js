import axios from 'axios';

// Create an Axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    "Access-Control-Allow-Origin": "*"
  },

});

export default instance;
