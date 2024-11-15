// src/api/auth.ts
import axios from 'axios';

const API_URL = 'https://your-api-url.com'; // Replace with your backend URL

export const login = async (credentials: { email: string; password: string }) => {
    return await axios.post(`${API_URL}/login`, credentials);
};

export const signup = async (data: { email: string; password: string; name: string }) => {
    return await axios.post(`${API_URL}/signup`, data);
};