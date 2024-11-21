// src/api/auth.ts
import axios from 'axios';
import { Dispatch } from 'redux';
import { setAuthData } from '../redux/slices/AuthSlice';

import User from '../models/User';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

export const login = async (LoginRequest: { Identifier: string; Password: string }, dispatch: Dispatch) => {
    try
    {
        const response = await axios.post(`${API_URL}/user/login`, LoginRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.token && response.data.user)
        {
            const { token, user } = response.data;

            dispatch(setAuthData({ token, user }));

            localStorage.setItem('jwtToken', token);
        }
    }
    catch (error)
    {
        console.error('Login failed:', error);
        throw error;
    }

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