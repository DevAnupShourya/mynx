import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL as string;

const axiosInstance = axios.create({
    baseURL: API_URL
});

// const axiosProtectedInstance = axios.create({
//     baseURL: API_URL,
//     headers: {'Authorization': `Bearer ${cookieValue}`}
// });

export default axiosInstance;