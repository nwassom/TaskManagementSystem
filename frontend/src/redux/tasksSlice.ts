import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Task from '../Models/Task';

interface TasksState
{
	tasks: Task[];
}

const initialState: TasksState = {
	tasks: [],
};

const tasksslice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask(state, action: PayloadAction<Task>)
		{
			state.tasks.push(action.payload);
		},
		setTasks(state, action: PayloadAction<Task[]>)
		{
			state.tasks = action.payload;
		},
	},
});

export const { addTask, setTasks } = tasksslice.actions;
export default tasksslice.reducer;