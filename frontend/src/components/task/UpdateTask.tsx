import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Task from '../../Models/Task';
import { updateTask } from '../../redux/taskSlice';
import { ReactComponent as EditIcon } from '../../assets/edit-icon.svg';
import { ReactComponent as CheckMark} from '../../assets/check-mark.svg';

import { CompareTask } from '../../utils/CompareTask';
import { UpdateApi } from '../../utils/UpdateApi';

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

	/*
		Function to handle everything if edits were made or not

		Also uses the handleEditStatusChange that was passed from parent component
		to change if editing or not
	*/
	const handleUpdate = async (currentTask: Task | undefined, editedTask: Task | undefined) =>
	{
		if (editStatus && currentTask !== undefined && editedTask !== undefined)
		{
			const changes: Partial<Task> = CompareTask(currentTask, editedTask);

			if (Object.keys(changes).length > 0)
			{
				await UpdateApi(currentTask.id, changes);
				dispatch(updateTask({...currentTask, ...changes }));
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