import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Task from '../Models/Task';
import TaskList from './TaskList';
import { addTask } from '../redux/taskSlice';

const NewTask: React.FC = () =>
{
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isCompleted, setIsCompleted] = useState(false);
	const dispatch = useDispatch();


	const handleSubmit = async (e: React.FormEvent) => 
	{
		e.preventDefault();

		try
		{
			const newTask: Omit<Task, 'createdAt'> = 
			{
				title,
				description,
				isCompleted,
			};
			const response = await axios.post('http://localhost:5000/api/task', newTask);
			dispatch(addTask(response.data));

			setTitle("");
			setDescription("")
			setIsCompleted(false);
		}
		catch (error)
		{
			console.error('Error submitting task:', error);
		}
	};



	return (
		<div className="w-full flex flex-col items-center p-4">	
			<h1 className="text-2xl font-bold text-center text-amber-100">Create New Task</h1>
			<form className="w-full max-w-md pb-10 space-y-4 newTaskForm" onSubmit={handleSubmit}>
				<div>
					<label className="block text-sm font-medium text-slate-300" htmlFor="title">Task title:</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className="formInputs">
					<label className="block text-sm font-medium text-slate-300" htmlFor="description">Task description:</label>
					<input
						type="text"
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<div className="formInputs">
					<label className="block text-sm font-medium text-slate-300" htmlFor="isCompleted">Completed:</label>
					<input
						type="checkbox"
						id="isCompleted"
						checked={isCompleted}
						onChange={(e) => setIsCompleted(e.target.checked)}
					/>
					<span className="text-sm text-slate-300 ml-2">Is Completed?</span>
				</div>
				<button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" type="submit">Create Task</button>
			</form>
		</div>
	);
};

export default NewTask;