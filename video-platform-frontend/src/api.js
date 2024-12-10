// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',  // Замените на адрес вашего бэкенда
});

export default api;
