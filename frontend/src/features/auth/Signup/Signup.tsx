import React, {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import User from '../../../models/User';
import { signup } from '../../../api/auth';
import { useAuthNavigation } from '../../../utils/useAuthNavigation';

import SignupForm from './SignupForm';

const Signup: React.FC = () => {

    useAuthNavigation();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignupAttempt = async (e: React.FormEvent) =>
    {
        e.preventDefault();

        const user: User = {
            username,
            email,
            name,
            password,
        };

        try
        {
            await signup(user);
            navigate('/login');
        }
        catch (error)
        {
            console.error('Error during signup:', error);
            alert(`Something went wrong. Please try again., ${error}`);
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-4 h-full align-center justify-center min-h-screen"> 
            <h1 className="text-2xl font-bold text-center text-amber-100">Signup</h1>
            <SignupForm
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                name={name}
                setName={setName}
                onSubmit={handleSignupAttempt}
            />
            <a href="/login" className="block text-sm font-medium text-slate-300">
                Already have an account? Login
            </a>
        </div>
    );
};

export default Signup;