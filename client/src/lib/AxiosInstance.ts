import axios from 'axios';
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_API_URL as string;
const cookie = import.meta.env.VITE_COOKIE_NAME;

// ? Used by logged in User api calls
export const axiosInstanceAuth = axios.create({
    baseURL: API_URL
});

// ? used by every other api calls
export const axiosInstance = axios.create({
    baseURL: API_URL
});

axiosInstanceAuth.interceptors.request.use(
    function (config) {
        // Retrieve user token from cookie storage
        const token = Cookies.get(cookie);
        // Set authorization header with bearer token
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)
