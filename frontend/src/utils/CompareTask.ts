import Task from '../Models/Task';

// Function to compare attributes of two tasks from the Task Model
export const CompareTask = (task1: Task, task2: Task): boolean =>
{
	return (
		task1.title === task2.title &&
		task1.description === task2.description &&
		task1.isCompleted === task2.isCompleted
	);
};