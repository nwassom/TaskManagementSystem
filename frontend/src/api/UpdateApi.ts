import Task from '../models/Task';
import axios from 'axios';

// Api call to backend to update the task
export const UpdateApi = async (taskId: number | undefined, changes: Partial<Task>) =>
{
	try
	{
		const response = await axios.patch(`http://localhost:5000/api/task/${taskId}`, changes);
		console.log(response);
	}
	catch (error)
	{
		console.error('Error updating task:', error);
	}
};