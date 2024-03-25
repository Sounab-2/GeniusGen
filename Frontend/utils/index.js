import axios from 'axios';

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://educational-content-generator.onrender.com'
});