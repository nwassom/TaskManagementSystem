/*
	Model for task 
*/
interface Task
{
	id?: number;
	title: string;
	description?: string;
	isCompleted: boolean;
	createdAt: string;
	date?: string;
	startTime?: string;
}

export default Task;