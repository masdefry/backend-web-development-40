import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

/*
    .env: NEXT_PUBLIC_API_BASE_URL="http://localhost:8000/api/v1"
*/