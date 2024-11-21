import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../models/User';

interface AuthState
{
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<{ token: string; user: User }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        clearAuthData: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setAuthData, clearAuthData } = AuthSlice.actions;
export default AuthSlice.reducer;