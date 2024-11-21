import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';
import AuthReducer from './slices/AuthSlice';

const store = configureStore({
	reducer:
	{
		tasks: tasksReducer,
		auth: AuthReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;