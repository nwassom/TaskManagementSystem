import React from 'react';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Task from '../Models/Task';
import { updateTask } from '../redux/taskSlice';
import { ReactComponent as NotComplete } from '../assets/x-circle-svgrepo-com.svg';
import { ReactComponent as Complete} from '../assets/check-mark.svg';

import { UpdateApi } from '../utils/UpdateApi';

interface CompletionStatusProps
{
	taskId: number | undefined;
}
/*
	Returns the completion status of a task

	on task hover able to change task completion status
*/
const CompletionStatus: React.FC<CompletionStatusProps> = ({ taskId }) =>
{	
	const dispatch = useDispatch();

	const task = useSelector((state: RootState) => state.tasks.tasks.find(t => t.id === taskId));

	const toggleCompletion = async (task: Task | undefined) =>
	{
		if (task)
		{
			const toggledTask = {...task, isCompleted: !task.isCompleted };
			UpdateApi(task);
			dispatch(updateTask(toggledTask));
		}
	}

	return (
		<div className="inline-block" onClick={() => toggleCompletion(task)}>
			{ task?.isCompleted ? (
				<Complete className="checkMark"/>
			) : (
				<NotComplete className="checkMark"/>
			)}
		</div>
	);
};

export default CompletionStatus;