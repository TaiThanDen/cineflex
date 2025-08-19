import axios from 'axios';

const BASE_API_URL: string = (import.meta.env.VITE_BASE_API_URL ?? "https://cineflex.mooo.com/api");
// const BASE_API_URL: string = 'https://cineflex-api.onrender.com/api';
// const BASE_API_URL: string = 'http://localhost:8080/api';

const http = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

http.interceptors.request.use(config => {
    const token = localStorage.getItem('auth');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default http