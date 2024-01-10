import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import themeReducer from '~/redux/slices/theme';
import userReducer from '~/redux/slices/user';

const reducers = combineReducers({
    theme: themeReducer,
    user: userReducer,
});

const persistConfig = {
    key: 'Mynx',
    storage,
    // ? Saving only theme in local storage
    whitelist: ['theme']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const reduxStore = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
})

export default reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch