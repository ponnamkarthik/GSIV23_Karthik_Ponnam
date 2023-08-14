// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import DetailsPage from '../DetailsPage';
import { fetchMovieDetails } from '../../redux/movieDetailsSlice';
import { RootState } from '../../redux/store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('DetailsPage component', () => {
    const initialState: RootState = {
        movieDetails: {
            movieDetails: {
                title: 'Test Movie',
                poster_path: '/test-poster.jpg',
                vote_average: 8.5,
                release_date: '2023-08-14',
                runtime: 120,
                overview: 'This is a description of movie.',
                credits: {
                    cast: [{ name: 'Actor 1' }, { name: 'Actor 2' }],
                    crew: [{ job: 'Director', name: 'Director 1' }],
                },
            },
            loading: false,
            error: null,
        },
    };

    const store = mockStore(initialState);

    it('should render movie details correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/details/1']}>
                    <DetailsPage />
                </MemoryRouter>
            </Provider>
        );

        const titleElement = screen.getByText('Test Movie',  { exact: false });
        const runtimeElement = screen.getByText('02:00');
        const castElement = screen.getByText('Cast: Actor 1, Actor 2');
        const descriptionElement = screen.getByText('Description: This is a description of movie.');

        expect(titleElement).toBeInTheDocument();
        expect(runtimeElement).toBeInTheDocument();
        expect(castElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
    });
});
