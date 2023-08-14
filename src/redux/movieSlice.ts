import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import {Movie} from "../types";
import {TMDB_API_KEY} from "../config";

interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    page: number | 1;
    totalPages: number | 1;
}

const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        fetchMoviesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchMoviesSuccess(state, action: PayloadAction<any>) {

            if(state.page < action.payload.page) {
                state.movies.push(...action.payload.results)
            } else {
                state.movies = action.payload.results;
            }
            state.loading = false;
            state.error = null;
        },
        fetchMoviesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        setPageTotalPages(state, action: PayloadAction<any>) {
            // @ts-ignore
            state.totalPages = action.payload.total_pages;
            // @ts-ignore
            state.page = action.payload.page;
        },
    },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure, setPageTotalPages } = movieSlice.actions;

export default movieSlice.reducer;

export const fetchMovies = (page: number = 1, query: string = ''): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(fetchMoviesStart());
        let apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&page=${page}`;

        if (query) {
            apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${TMDB_API_KEY}&page=${page}`;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        dispatch(fetchMoviesSuccess(data));
        dispatch(setPageTotalPages(data));
    } catch (error) {
        dispatch(fetchMoviesFailure('Error fetching movies.'));
    }
};
