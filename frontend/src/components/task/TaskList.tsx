import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import TaskModel from '../../Models/Task';
import { setTasks } from '../../redux/taskSlice';
import { RootState } from '../../redux/store';

import Task from './Task';

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
					<Task key={task.id} task={task}/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TaskList;
