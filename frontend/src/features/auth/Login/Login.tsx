import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoginForm from './LoginForm';

const Login: React.FC = () => {

    const navigate = useNavigate();
    
    const [userIdentifier, setUserIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLoginAttempt = async (e: React.FormEvent) =>
    {
        e.preventDefault();

        try
        {

        }
        catch (error)
        {
            console.error('Error attempting to login:', error);
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-4 h-full align-center justify-center min-h-screen"> 
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