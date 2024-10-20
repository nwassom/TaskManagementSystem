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
	const [currentTask, setCurrentTask] = useState<TaskModel>(task);
	const [editedTask, setEditedTask] = useState<TaskModel>(task);

	// If editing updates the frontend with edit
	const handleUpdate = () =>
	{	
		if (isEditing)
		{
			setCurrentTask(editedTask);
		}
		setIsEditing(!isEditing);
	}

	// If editing changes text input field
	const handleInputChange = (field: keyof TaskModel, value: string) =>
	{	
		const newValue = value.replace(/\n{2,}/g, '\n');

		setEditedTask((prevTask) => ({
			...prevTask,
			[field]: newValue,
		}));
	};

	// Cancels edits made reverts to original task information
	const handleCancelEdit = () =>
	{
		setEditedTask(currentTask);
		setIsEditing(false);
	};

	return (
		<div className={isEditing ? 'TaskEditing' : 'TaskNotEditing'}>
			{isEditing && <div className="TaskEditOverlay"></div>}

			<li key={currentTask.id} 
				className="relative TaskBox bg-white shadow-lg shadow-amber-200/60 rounded-lg p-10 shadow-sm min-w-[300px] max-w-[300px] flex-shrink-0">
				
				<div className="updateTask" onClick={handleUpdate}>
					<UpdateTask task={editedTask} editStatus={isEditing}/>
				</div>

				<div className="deleteTask">
					<DeleteTask task={currentTask}/>
				</div>

				{ !(isEditing) &&
					<div className="TaskInfo">
						<h4 className="text-2xl font-semibold text-gray-800 mb-2">{currentTask.title}</h4>
						<p  className="text-sm text-gray-500 mb-2"
							>Created on: {new Date(currentTask.createdAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
						</p> 
						<p className="text-gray-600 mb-4">{currentTask.description}</p>
					</div>
				}

				{ isEditing &&
					<div className="TaskInfo">
						<textarea
							
							className="text-2xl font-semibold text-gray-800 mb-2 border border-gray-300 rounded-lg p-2 w-full"
							value={editedTask.title}
							onChange={(e) => handleInputChange('title', e.target.value)}
						/>
						<textarea
							className="text-gray-600 mb-4 border border-gray-300 rounded-lg p-2 w-full"
							value={editedTask.description}
							onChange={(e) => handleInputChange('description', e.target.value)}
						/>
						<button 
                            className="text-sm font-bold bg-gray-300 rounded-lg text-red-500"
                            onClick={handleCancelEdit}
                        >
                            Cancel Edit
                        </button>
					</div>
				}

				<p  className={`text-sm ${task.isCompleted ? 'text-green-500' : 'text-red-500'}`}>Completed: {task.isCompleted ? 'Yes' : 'No'}</p>
			</li>

		</div>
	);
};

export default Task;