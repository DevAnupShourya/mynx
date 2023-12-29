import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import themeReducer from '~/redux/theme/ThemeSlice';
import userReducer from '~/redux/user/userSlice';
import alertReducer from '~/redux/alert/alertSlice';

const reducers = combineReducers({
    theme: themeReducer,
    user: userReducer,
    alert: alertReducer,
});

const persistConfig = {
    key: 'Mynx',
    storage,
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