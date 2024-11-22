import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/auth';

import { useAuthNavigation } from '../../../utils/useAuthNavigation';

import LoginForm from './LoginForm';

const Login: React.FC = () => {
    const navigate = useNavigate();
    
    const [userIdentifier, setUserIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    /**
     *  Eventually setup logic so that when going to initial page it grabs jwt
     *  and before loading anything makes sure its still valid
     **/
    useAuthNavigation();


    const handleLoginAttempt = async (e: React.FormEvent) =>
    {
        e.preventDefault();

        const LoginRequest = {
            Identifier: userIdentifier,
            Password: password,
        };

        try
        {
            await login(LoginRequest, dispatch);
            console.log('Login successful, navigating to home...');
            navigate('/home');
        }
        catch (error)
        {
            console.error('Error attempting to login:', error);
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-4 h-full align-center justify-center min-h-screen"> 
        <h1 className="text-2xl font-bold text-center text-amber-100">Login</h1>
        <LoginForm
            userIdentifier={userIdentifier}
            setUserIdentifier={setUserIdentifier}
            password={password}
            setPassword={setPassword}
            onSubmit={handleLoginAttempt}
        />
        <a href="/signup" className="block text-sm font-medium text-slate-300">
            Signup Here
        </a>
        </div>
    );
};

export default Login;