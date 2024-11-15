import React from 'react';

type InputFieldProps = {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
};

const InputField: React.FC<InputFieldProps> = 
({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    required = false,
    className = '',
}) => 
(
    <div>
        <label className="text-sm font-medium text-slate-300" htmlFor={id}>
              {label}
        </label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full p-2 border rounded ${className}`}
        />
    </div>
);

export default InputField;