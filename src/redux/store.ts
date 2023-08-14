import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import movieDetailsReducer from './movieDetailsSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        movies: movieReducer,
        movieDetails: movieDetailsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>; // Define AppThunk type

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
