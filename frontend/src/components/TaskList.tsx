import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task
{
	id: number;
	title: string;
	description: string;
	isCompleted: boolean;
}

const TaskList: React.FC = () =>
{
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchTasks = async () => 
		{
			try 
			{
				const response = await axios.get('http://localhost:5000/api/task');
				setTasks(response.data);
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
	}, []);

	if (loading) 
	{
		return <p>Loading tasks...</p>;
	}


	if (tasks.length === 0)
	{
		return <p>No tasks available.</p>;
	}

	return (
		<div>
			<h1>Task List</h1>
			<ul>
				{ tasks.map((task) =>
					(
						<li key={task.id}>
							<h2>{task.title}</h2>
							<p>{task.description}</p>
							<p>Completed: {task.isCompleted ? 'Yes' : 'No'}</p>
						</li>
					))}
			</ul>
		</div>
	);
};

export default TaskList;
