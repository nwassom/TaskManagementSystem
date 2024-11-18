import React, { useState } from 'react';
import InputField from '../../../components/InputField';

interface PasswordProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

const Password: React.FC<PasswordProps> = ({ password, setPassword, confirmPassword, setConfirmPassword }) => {

    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);

    const validatePassword = (pwd: string) => {

        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(pwd);
        const hasLowerCase = /[a-z]/.test(pwd);
        const hasNum = /\d/.test(pwd);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

        if (pwd.length < minLength)
        {
            return `Password must be at least ${minLength} characters long`;
        }
        if (!hasUpperCase)
        {
            return 'Password must contain at least one uppercase letter';
        }
        if (!hasLowerCase)
        {
            return 'Password must contain at least one lowercase letter';
        }
        if (!hasNum)
        {
            return 'Password must contain at least one number';
        }
        if (!hasSpecialChar)
        {
            return 'Password must contain at least one special character';
        }

        return null;
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const error = validatePassword(newPassword);
        setPasswordError(error);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setPasswordMatchError(newConfirmPassword !== password ? "Passwords don't match" : null);
    };

    return (
        <div className="space-y-4">
            <InputField
                id="password"
                label="Password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="border-red-500"
            />

            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <InputField
                id="confirmPassword"
                label="Retype Password"
                type="password"
                placeholder="Retype Your Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                className="border-red-500"
            />
            {passwordMatchError && <p className="text-red-500 text-sm">{passwordMatchError}</p>}
        </div>
    );
};

export default Password;