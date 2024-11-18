import React, {useState, useEffect } from 'react';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';

import Password from './Password';

type SignupFormProps = {
    username: string;
    setUsername: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    setName: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
};

const SignupForm: React.FC<SignupFormProps> = ({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
    onSubmit,
}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        setName(`${firstName} ${lastName}`);
    }, [firstName, lastName, setName]);

    return (
        <form className="max-w-md pb-10 space-y-4 newTaskForm" onSubmit={onSubmit}>
            <InputField
                id="username"
                label="Username"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <InputField
                id="email"
                label="Email"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />


            
            <div className="flex space-x-4">
            {/* Insert first name and name i.e. split up the name state */}
                <InputField
                    id="firstName"
                    label="First Name"
                    type="text"
                    placeholder="Enter Your First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <InputField
                    id="lastName"
                    label="Last Name"
                    type="text"
                    placeholder="Enter Your Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>

            <Password 
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
            />
            <Button
                type="submit"
                text="Signup"
                className="bg-blue-500 text-white hover:bg-blue-600"
            />
        </form>
    );
};

export default SignupForm;