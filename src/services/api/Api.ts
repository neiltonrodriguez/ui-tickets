import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const Api = axiosInstance;