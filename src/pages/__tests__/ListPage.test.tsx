// @ts-nocheck
import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ListPage from '../ListPage';
import {RootState} from "../../redux/store";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ListPage Component', () => {

    it('renders error state correctly', () => {

        const initialState: RootState = {
            movies: {movies: [], loading: false, error: 'Error fetching movies.'},
        };
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ListPage/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Error: Error fetching movies.')).toBeInTheDocument();
    });

    it('renders movie cards correctly', () => {

        const initialState: RootState = {
            movies: {
                movies: [
                    {
                        id: 1,
                        poster_path: '/zN41DPmPhwmgJjHwezALdrdvD0h.jpg',
                        title: 'Test Movie 1',
                        vote_average: 8.2,
                        overview: 'This is a test movie 1 summary.',
                    },
                    {
                        id: 2,
                        poster_path: '/zN41DPmPhwmgJjHwezALdrdvD0h.jpg',
                        title: 'Test Movie 2',
                        vote_average: 7.2,
                        overview: 'This is a test movie 2 summary.',
                    },
                ], loading: false, error: null
            },
        };
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ListPage/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
        expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    });
});
