import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

import { logout } from '../api/auth';

const LogoutButton: React.FC = () =>
{   
    const navigate = useNavigate();

    const handleLogout = async () =>
    {
        await logout();
        navigate('/login');
    }

    return (
        <div className="w-full flex flex-col items-center p-4">
            <Button
                text="Logout"
                onClick={handleLogout}
                className="max-w-md bg-blue-500 text-white hover:bg-blue-600"
            />
        </div>
    );
};

export default LogoutButton;
