// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'; // Use BrowserRouter for testing
import Header from '../HeaderComponent';
import {RootState} from "../../redux/store";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Header component', () => {
    it('should render search input field when not on details page', () => {
        const initialState: RootState = {
            movies: {movies: [], loading: true, error: null},
        };
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search Movies...');
        expect(searchInput).toBeInTheDocument();
    });

    it('should not render search input field on details page', () => {
        const initialState: RootState = {
            movies: {movies: [], loading: true, error: null},
        };
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/movie/123']}>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        // Simulate navigating to details page
        window.history.pushState({}, 'Details', '/movie/123');

        const searchInput = screen.queryByPlaceholderText('Search Movies...');

        expect(searchInput).toBeNull();
    });
});
