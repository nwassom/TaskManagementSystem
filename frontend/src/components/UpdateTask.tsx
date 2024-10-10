import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Task from '../Models/Task';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { ReactComponent as CheckMark} from '../assets/check-mark.svg';

interface UpdateTaskProps
{
	task: Task;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({ task }) =>
{
	const dispatch = useDispatch();

	const [editing, setEditing] = useState<boolean>(false);

	const handleEdit = () =>
	{
		setEditing(!editing);
	};

	const handleUpdate = async (id: number) =>
	{

	};

	return (
		<div className="inline-block" onClick={handleEdit}>
			{ editing ? (
				<CheckMark className="checkMark"/>
			) : (
				<EditIcon className="editIcon"/>
			)}
		</div>
	);
};

export default UpdateTask;