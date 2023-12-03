import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    authStatus: 'loading' as 'unauthenticated' | "authenticated" | "loading",
    name: '',
    mail: '',
    username: '',
    userImg: '',
}

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        updateUserData: (state, action: PayloadAction<typeof initialState>) => {
            state.name = action.payload.name;
            state.mail = action.payload.mail;
            state.username = action.payload.username;
            state.userImg = action.payload.userImg;
            state.authStatus = action.payload.authStatus;
        }
    },
})

export const { updateUserData } = userSlice.actions;
export default userSlice.reducer;