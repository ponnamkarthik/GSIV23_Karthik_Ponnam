import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ListPage from '../ListPage';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ListPage Component', () => {
    it('renders loading state correctly', () => {
        const store = mockStore({ movies: [], loading: true, error: null });
        render(
            <Provider store={store}>
                <ListPage />
            </Provider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state correctly', () => {
        const store = mockStore({ movies: [], loading: false, error: 'Error fetching movies.' });
        render(
            <Provider store={store}>
                <ListPage />
            </Provider>
        );

        expect(screen.getByText('Error: Error fetching movies.')).toBeInTheDocument();
    });

    it('renders movie cards correctly', () => {
        const movies = [
            { id: 1, title: 'Movie 1', poster_path: '/movie1.jpg' },
            { id: 2, title: 'Movie 2', poster_path: '/movie2.jpg' },
        ];
        const store = mockStore({ movies, loading: false, error: null });
        render(
            <Provider store={store}>
                <ListPage />
            </Provider>
        );

        expect(screen.getByText('Movie 1')).toBeInTheDocument();
        expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
});
