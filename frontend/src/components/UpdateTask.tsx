import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Task from '../Models/Task';
import { updateTask } from '../redux/taskSlice';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { ReactComponent as CheckMark} from '../assets/check-mark.svg';

import { CompareTask } from '../utils/CompareTask';

interface UpdateTaskProps
{	
	currentTask: Task;
	editedTask: Task;
	editStatus: boolean;
	handleEditStatusChange: () => void;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({ currentTask, editedTask, editStatus, handleEditStatusChange }) =>
{
	const dispatch = useDispatch();

	// Api call to backend to update the task
	const updateApi = async (updatedTask: Task) =>
	{
		try
		{
			const response = await axios.patch(`http://localhost:5000/api/task/${updatedTask.id}`, updatedTask);
			console.log(response);
		}
		catch (error)
		{
			console.error('Error updating task:', error);
		}
	};

	/*
		Function to handle everything if edits were made or not

		Also uses the handleEditStatusChange that was passed from parent component
		to change if editing or not
	*/
	const handleUpdate = async (currentTask: Task | undefined, editedTask: Task | undefined) =>
	{
		if (editStatus && currentTask !== undefined && editedTask !== undefined)
		{
			// Makes sure they aren't the same exact data
			if (!CompareTask(editedTask, currentTask))
			{
				updateApi(editedTask);
				dispatch(updateTask(editedTask));
			}
			handleEditStatusChange();
		}
		else
		{
			handleEditStatusChange();
		}
	};

	return (
		<div className="inline-block" onClick={() => handleUpdate(currentTask, editedTask)}>
			{ editStatus ? (
				<CheckMark className="checkMark"/>
			) : (
				<EditIcon className="editIcon"/>
			)}
		</div>
	);
};

export default UpdateTask;