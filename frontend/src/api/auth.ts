// src/api/auth.ts
import axios from 'axios';

import User from '../models/User';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

export const login = async (credentials: { email: string; password: string }) => {
    return await axios.post(`${API_URL}/login`, credentials);
};

export const signup = async (user: User) => {
    try
    {
        const response = await axios.post(`${API_URL}/user/signup`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status >= 300 && response.status < 300)
        {
            console.log("user successfully created");
        }
    }
    catch (error)
    {
        if (axios.isAxiosError(error))
        {
            const errorMessage = error.response?.data?.message || error.message;
            throw new Error(errorMessage);
        }

        throw new Error('An error occurred while signing up.');
    }
};