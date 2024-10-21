import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Task from '../Models/Task';
import { updateTask } from '../redux/taskSlice';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { ReactComponent as CheckMark} from '../assets/check-mark.svg';

interface UpdateTaskProps
{
	task: Task;
	editStatus: boolean;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({ task, editStatus }) =>
{
	const dispatch = useDispatch();

	const updateApi = () =>
	{

	};

	const handleUpdate = async (id: number) =>
	{
		if (editStatus)
		{
			dispatch(updateTask(task));
			updateApi();
		}
	};

	return (
		<div className="inline-block">
			{ editStatus ? (
				<CheckMark className="checkMark"/>
			) : (
				<EditIcon className="editIcon"/>
			)}
		</div>
	);
};

export default UpdateTask;