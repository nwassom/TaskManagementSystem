import React, {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SignupForm from './SignupForm';

const Signup: React.FC = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignupAttempt = async (e: React.FormEvent) =>
    {
        e.PreventDefault();

        try
        {

        }
        catch (error)
        {

        }
    };

    return (

    );
};

export default Signup;