import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Signup: React.FC = () =>
{
    // Could be email or username
    const [userIdentifier, setUserIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSignupAttempt = async (e: React.FormEvent) =>
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
        <div>
        </div>
    );
};

export default Signup;