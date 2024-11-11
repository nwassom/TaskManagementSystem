import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Login: React.FC = () =>
{
	// Could be email or username
	const [userIdentifier, setUserIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const handleLoginAttempt = async (e: React.FormEvent) =>
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
		<div className="w-full flex flex-col items-center p-4 h-full align-center justify-center min-h-screen">	
			<h1 className="text-2xl font-bold text-center text-amber-100">Login</h1>
			<form className="max-w-md pb-10 space-y-4 newTaskForm" onSubmit={handleLoginAttempt}>
				<div>
					<label className="text-sm font-medium text-slate-300">Username or Email</label>
					<input
						placeholder="Enter Username or Email"
						type="text"
						id="userIdentifier"
						value={userIdentifier}
						onChange={(e) => setUserIdentifier(e.target.value)}
						required
						className="w-full p-2 border rounded"
					/>
				</div>
				<div className="formInputs">
					<label className="block text-sm font-medium text-slate-300">Password</label>
					<input
						placeholder="Enter Password"
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full p-2 border rounded"
					/>
				</div>
				<button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" type="submit">Login</button>
			</form>

			<a className="formInputs block text-sm font-medium text-slate-300">Signup Here</a>
		</div>
	);
};

export default Login;