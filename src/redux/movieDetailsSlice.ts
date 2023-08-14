import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import {TMDB_API_KEY} from "../config";

interface MovieDetails {
    title: string;
    poster_path: string; // URL to the poster image
    vote_average: number;
    release_date: string; // Date of release
    runtime: number; // Length in minutes
    overview: string;
    credits: {
        cast: {
            id: number;
            name: string;
            character: string;
            profile_path: string | null; // URL to the actor's profile image
        }[];
        crew: {
            id: number;
            name: string;
            department: string;
            job: string;
            profile_path: string | null; // URL to the crew member's profile image
        }[];
    };
}

interface MovieDetailsState {
    movieDetails: MovieDetails | null;
    loading: boolean;
    error: string | null;
}

const initialState: MovieDetailsState = {
    movieDetails: null,
    loading: false,
    error: null,
};

const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState,
    reducers: {
        fetchMovieDetailsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchMovieDetailsSuccess(state, action: PayloadAction<MovieDetails>) {
            state.movieDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchMovieDetailsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchMovieDetailsStart, fetchMovieDetailsSuccess, fetchMovieDetailsFailure } =
    movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;

// Async thunk for fetching movie details
export const fetchMovieDetails = (movieId: number): AppThunk => async dispatch => {
    try {
        dispatch(fetchMovieDetailsStart());
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits`);
        const data = await response.json();
        dispatch(fetchMovieDetailsSuccess(data));
    } catch (error) {
        dispatch(fetchMovieDetailsFailure('Error fetching movie details.'));
    }
};
