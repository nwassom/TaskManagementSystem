import React from 'react';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';

type SignupFormProps = {
    username: string;
    setUsername: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    name: string;
    setName: (value: string) => void;
};

const SignupForm: React.FC<SignupFormProps> = ({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
}) => (
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


        
        
        {/* Insert first name and name i.e. split up the name state */}
        <InputField
            id="username"
            label="Username"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />



        {/* Insert password logic: check password for secure and retype for matching */}
        <div>
        <InputField
            id="password"
            label="Username"
            type="password"
            placeholder="Enter password"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        </div>
    </form>
);

export default SignupForm;