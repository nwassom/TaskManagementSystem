import React, {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SignupForm from './SignupForm';

const Signup: React.FC = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignupAttempt = async (e: React.FormEvent) =>
    {
        e.PreventDefault();

        try
        {

        }
        catch (error)
        {
            console.error('Error attempting to signup:', error);
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-4 h-full align-center justify-center min-h-screen"> 
        <SignupForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            name={name}
            setName={setName}
        />
        <a href="/login" className="block text-sm font-medium text-slate-300">
            Already have an account? Login
        </a>
        </div>
    );
};

export default Signup;