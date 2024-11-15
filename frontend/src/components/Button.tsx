import React from 'react';

type ButtonProps = 
{
    type?: 'button' | 'submit' | 'reset';
    text: string;
    className?: string;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ type = 'button', text, className, onClick }) => 
(
    <button 
        type={type}
        className={`w-full py-2 rounded-md ${className}`}
        onClick={onClick}
    >
        {text}
    </button>
);

export default Button;