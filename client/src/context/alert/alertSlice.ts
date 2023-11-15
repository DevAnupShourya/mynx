import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { alertInterface } from "~/types/types.barrel";

const initialState = {
    show: false,
    type: null,
    msg: null,
} as alertInterface;


export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<alertInterface>) => {
            state.show = action.payload.show;
            state.type = action.payload.type;
            state.msg = action.payload.msg;
        }
    },
})

export const { showAlert } = alertSlice.actions
export default alertSlice.reducer;