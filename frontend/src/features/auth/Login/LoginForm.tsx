import React from 'react';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
type LoginFormProps = {
    userIdentifier: string;
    setUserIdentifier: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
};

const LoginForm: React.FC<LoginFormProps> =({
    userIdentifier,
    setUserIdentifier,
    password,
    setPassword,
    onSubmit,
}) => (
    <form className="max-w-md pb-10 space-y-4 newTaskForm" onSubmit={onSubmit}>
        <InputField
            id="userIdentifier"
            label="Username or Email"
            type="text"
            placeholder="Enter Username or Email"
            value={userIdentifier}
            onChange={(e) => setUserIdentifier(e.target.value)}
            required
        />
        <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <Button
            type="submit"
            text="Login"
            className="bg-blue-500 text-white hover:bg-blue-600"
        />
    </form>
);

export default LoginForm;

