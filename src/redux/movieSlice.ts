import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import {Movie} from "../types";

interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
}

const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        fetchMoviesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchMoviesSuccess(state, action: PayloadAction<Movie[]>) {
            state.movies = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchMoviesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } = movieSlice.actions;

export default movieSlice.reducer;

export const fetchMovies = (): AppThunk => async dispatch => {
    try {
        dispatch(fetchMoviesStart());
        const apiKey = '8a877c4a962c6670a8a36c2798f97262';
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc&api_key=${apiKey}`);
        const data = await response.json();
        dispatch(fetchMoviesSuccess(data.results));
    } catch (error) {
        dispatch(fetchMoviesFailure('Error fetching movies.'));
    }
};
