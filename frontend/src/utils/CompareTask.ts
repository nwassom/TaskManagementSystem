import Task from '../Models/Task';

// Function to compare attributes of two tasks from the Task Model
export const CompareTask = (task1: Task, task2: Task): Partial<Task> =>
{
	const changes: Partial<Task> = {};

	if (task1.title !== task2.title)
	{
		changes.title = task2.title;
	}
	if (task1.description !== task2.description)
	{
		changes.description = task2.description;
	}
	if (task1.isCompleted !== task2.isCompleted)
	{
		changes.isCompleted = task2.isCompleted;
	}

	return changes;
};