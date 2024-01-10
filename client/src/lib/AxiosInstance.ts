import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL as string;

const axiosInstance = axios.create({
    baseURL: API_URL
});

export default axiosInstance;