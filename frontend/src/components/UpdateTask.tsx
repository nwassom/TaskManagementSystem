import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Task from '../Models/Task';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { ReactComponent as CheckMark} from '../assets/check-mark.svg';

interface UpdateTaskProps
{
	task: Task;
	onEditToggle: (isEditing: boolean) => void;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({ task, onEditToggle }) =>
{
	const dispatch = useDispatch();

	const [editing, setEditing] = useState<boolean>(false);

	const handleEdit = () =>
	{
		if (editing)
		{
			// once check marked is clicked to end editing
			//handleUpdate();
		}

		// Sets the state of the UpdateTask component as well as the parent Task component
		const parentEditState = !editing;
		setEditing(!editing);
		onEditToggle(parentEditState);
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