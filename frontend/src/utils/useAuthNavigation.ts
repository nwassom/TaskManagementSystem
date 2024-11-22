import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 *  Eventually setup logic so that when going to initial page it grabs jwt
 *  and before loading anything makes sure its still valid depending on what api returns sends to home or login
 **/
export const useAuthNavigation = (): void =>
{
    const navigate = useNavigate();
    const location = useLocation();

    const isSignupPage = location.pathname === '/signup';

    // Check if jwtToken is present in localStorage to determine login state
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token && !isSignupPage) 
        {
            navigate('/login');
        }

    }, [navigate]);
};