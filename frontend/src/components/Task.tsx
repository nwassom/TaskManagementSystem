import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import TaskModel from '../Models/Task';
import { setTasks, addTask, updateTask } from '../redux/taskSlice';
import { RootState } from '../redux/store';

import DeleteTask from './DeleteTask';
import UpdateTask from './UpdateTask';

interface TaskProps 
{
	task: TaskModel;
}

const Task: React.FC<TaskProps> = ({ task }) =>
{	

	const dispatch = useDispatch();

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedTask, setEditedTask] = useState<TaskModel>(task);

	const handleEditToggle = (editing: boolean) => 
	{
		setIsEditing(editing);
		if (!editing)
		{
			dispatch(updateTask(editedTask));

		}
	};

	const handleInputChange = (field: keyof TaskModel, value: string) =>
	{
		setEditedTask((prevTask) => ({
			...prevTask,
			[field]: value,
		}));
	};

	// const updateToBackend

	return (
		<div className={isEditing ? 'TaskEditing' : 'TaskNotEditing'}>
			{isEditing && <div className="TaskEditOverlay"></div>}

			<li key={task.id} 
				className="relative TaskBox bg-white shadow-lg shadow-amber-200/60 rounded-lg p-10 shadow-sm min-w-[300px] max-w-[300px] flex-shrink-0">
				<div className="updateTask">
					<UpdateTask task={task} onEditToggle={handleEditToggle} />
				</div>
				<div className="deleteTask">
					<DeleteTask task={task}/>
				</div>

				{ !(isEditing) &&
					<div className="TaskInfo">
						<h4 className="text-2xl font-semibold text-gray-800 mb-2">{task.title}</h4>
						<p  className="text-sm text-gray-500 mb-2"
							>Created on: {new Date(task.createdAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
						</p> 
						<p className="text-gray-600 mb-4">{task.description}</p>
					</div>
				}
				{ isEditing &&
					<div className="TaskInfo">
						<textarea
							
							className="text-2xl font-semibold text-gray-800 mb-2 border border-gray-300 rounded-lg p-2 w-full"
							value={task.title}
							onChange={(e) => handleInputChange('title', e.target.value)}
						/>
						<textarea
							className="text-gray-600 mb-4 border border-gray-300 rounded-lg p-2 w-full"
							value={task.description}
							onChange={(e) => handleInputChange('description', e.target.value)}
						/>
						<p  className={`text-sm font-bold bg-gray-300 rounded-lg text-red-500`}>Cancel Edit</p>
					</div>
				}

				<p  className={`text-sm ${task.isCompleted ? 'text-green-500' : 'text-red-500'}`}>Completed: {task.isCompleted ? 'Yes' : 'No'}</p>
			</li>

		</div>
	);
};

export default Task;