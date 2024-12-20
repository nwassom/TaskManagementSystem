import React from 'react';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Task from '../../models/Task';
import { updateTask } from '../../redux/taskSlice';
import { ReactComponent as NotComplete } from '../../assets/x-circle-svgrepo-com.svg';
import { ReactComponent as Complete} from '../../assets/check-mark.svg';

import { CompareTask } from '../../utils/CompareTask';
import { UpdateApi } from '../../api/UpdateApi';

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
			const changes: Partial<Task> = { isCompleted: toggledTask.isCompleted};

			if (Object.keys(changes).length > 0)
			{
				await UpdateApi(toggledTask.id, changes);
				dispatch(updateTask(toggledTask));
			}
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