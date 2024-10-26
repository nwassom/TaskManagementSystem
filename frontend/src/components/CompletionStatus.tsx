import React from 'react';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Task from '../Models/Task';
import { updateTask } from '../redux/taskSlice';
import { ReactComponent as NotComplete } from '../assets/x-circle-svgrepo-com.svg';
import { ReactComponent as Complete} from '../assets/check-mark.svg';

interface CompletionStatusProps
{
	taskId: 
}
/*
	Returns the completion status of a task

	on task hover able to change task completion status
*/
const CompletionStatus: React.FC<CompletionStatusProps> = ({ task }) =>
{	
	const dispatch = useDispatch();

	const toggleCompletion = async (task: Task) =>
	{
		const toggledTask = {...task, isCompleted: !task.isCompleted };
		// updateApi(task);
		dispatch(updateTask(toggledTask));
	}

	return (
		<div className="inline-block" onClick={() => toggleCompletion(task)}>
			{ CompletionStatus ? (
				<Complete className="checkMark"/>
			) : (
				<NotComplete className="checkMark"/>
			)}
		</div>
	);
};

export default CompletionStatus;