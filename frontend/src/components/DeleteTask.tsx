import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteTask } from '../redux/taskSlice';
import Task from '../Models/Task';
import { ReactComponent as Trash } from '../assets/trash3.svg';

interface DeleteTaskProps 
{
	task: Task;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ task }) =>
{
	const dispatch = useDispatch();

	const handleDelete = async (id: number) =>
	{
		try
		{
			const response = await axios.delete(`http://localhost:5000/api/task/${id}`);

			dispatch(deleteTask(id));
		}
		catch (error)
		{
			console.error('Error deleting task:', error);
		}
	};

	return (
		<div className="inline-block" onClick={() => task.id !== undefined && handleDelete(task.id)}>
			<Trash className="trashIcon" fill="currentColor"/>
		</div>
	);
};

export default DeleteTask;