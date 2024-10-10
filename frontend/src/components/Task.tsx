import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import TaskModel from '../Models/Task';
import { setTasks, addTask } from '../redux/taskSlice';
import { RootState } from '../redux/store';

import DeleteTask from './DeleteTask';
import UpdateTask from './UpdateTask';

interface TaskProps 
{
	task: TaskModel;
}

const Task: React.FC<TaskProps> = ({ task }) =>
{	

	return (
		<li key={task.id} 
			className="relative TaskBox bg-white shadow-lg shadow-amber-200/60 rounded-lg p-10 shadow-sm min-w-[300px] max-w-[300px] flex-shrink-0">
			<div className="updateTask">
				<UpdateTask task={task}/>
			</div>
			<div className="deleteTask">
				<DeleteTask task={task}/>
			</div>
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
			<p  className={`text-sm ${task.isCompleted ? 'text-green-500' : 'text-red-500'}`}>Completed: {task.isCompleted ? 'Yes' : 'No'}</p>
			</div>
		</li>
	);
};

export default Task;