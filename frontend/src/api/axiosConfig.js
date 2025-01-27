import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_URL
        : 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default instance;
