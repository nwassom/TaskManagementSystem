import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Task from '../Models/Task';
import { setTasks, addTask } from '../redux/taskSlice';
import { RootState } from '../redux/store';

const TaskList: React.FC = () =>
{
	const dispatch = useDispatch();
	const tasks = useSelector((state: RootState) => state.tasks.tasks);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchTasks = async () => 
		{
			try 
			{
				const response = await axios.get('http://localhost:5000/api/task');
				dispatch(setTasks(response.data));
				setLoading(false);
			}
			catch(error)
			{
				console.error('Error fetching tasks:', error);
				setLoading(false);
			}
			finally
			{
				setLoading(false);
			}
		};

		fetchTasks();
	}, [dispatch]);

	if (loading) 
	{
		return <p>Loading tasks...</p>;
	}

	if (tasks.length === 0)
	{
		return <p>No tasks available.</p>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-4xl font-bold text-center mb-6 text-amber-100">Task List</h1>
			<div className="overflow-x-auto  scrollbar-custom">
				<ul className="flex space-x-4 mb-10 blue" style={{ listStyleType: 'none', padding: 0 }}>
					{ tasks.map((task) =>
						(
							<li key={task.id} 
								className="bg-white shadow-lg shadow-amber-200/60 rounded-lg p-8 shadow-sm min-w-[300px] max-w-[300px] flex-shrink-0">
								<h4 className="text-2xl font-semibold text-gray-800 mb-2">{task.title}</h4>
								<p  className="text-sm text-gray-500 mb-2"
									>Created on: {new Date(task.createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}</p>
								<p className="text-gray-600 mb-4">{task.description}</p>
								<p  className={`text-sm ${task.isCompleted ? 'text-green-500' : 'text-red-500'}`}>Completed: {task.isCompleted ? 'Yes' : 'No'}</p>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default TaskList;
