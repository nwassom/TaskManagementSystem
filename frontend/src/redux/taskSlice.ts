import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Task from '../models/Task';

interface TasksState
{
	tasks: Task[];
}

const initialState: TasksState = {
	tasks: [],
};

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Task>) =>
		{
			state.tasks.push(action.payload);
		},
		setTasks(state, action: PayloadAction<Task[]>)
		{
			state.tasks = action.payload;
		},
		deleteTask: (state, action: PayloadAction<number>) =>
		{
			state.tasks = state.tasks.filter(task => task.id !== action.payload);
		},
		updateTask: (state, action: PayloadAction<Task>) =>
		{
			const index = state.tasks.findIndex((task) => task.id === action.payload.id);
			if (index !== -1)
			{
				state.tasks[index] = action.payload;
			}
		}
	},
});

export const { addTask, setTasks, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;