import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../Models/Task';

const NewTask: React.FC = () =>
{
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isCompleted, setIsCompleted] = useState(0);


	useEffect(() => {

		const submitTask = async () =>
		{
			try
			{
				const response = await axios.post('https://localhost:5000/api/task');

			}
			catch(error)
			{

			}
			finally
			{

			}
		};


	}, []);



	return (
		<div>	
			<h1>Create New Task</h1>
		</div>
	);
};

export default NewTask;