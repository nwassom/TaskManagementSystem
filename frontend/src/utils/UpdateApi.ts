import Task from '../Models/Task';
import axios from 'axios';

// Api call to backend to update the task
export const UpdateApi = async (updatedTask: Task) =>
{
	try
	{
		const response = await axios.patch(`http://localhost:5000/api/task/${updatedTask.id}`, updatedTask);
		console.log(response);
	}
	catch (error)
	{
		console.error('Error updating task:', error);
	}
};