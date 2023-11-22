import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    authStatus: 'loading' as 'unauthenticated' | "authenticated" | 'loading',
    name: '',
    mail: '',
    username: '',
    dateJoined: '',
    userImg: '',
    userId : '',
}

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        updateUserData: (state, action: PayloadAction<typeof initialState>) => {
            state.name = action.payload.name;
            state.mail = action.payload.mail;
            state.username = action.payload.username;
            state.dateJoined = action.payload.dateJoined;
            state.userImg = action.payload.userImg;
            state.authStatus = action.payload.authStatus;
            state.userId = action.payload.userId;
        }
    },
})

export const { updateUserData } = userSlice.actions;
export default userSlice.reducer;