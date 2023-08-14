import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCard from '../MovieCard';
import { MemoryRouter } from 'react-router-dom';

describe('MovieCard Component', () => {
    const mockMovie = {
        id: 1,
        poster_path: '/zN41DPmPhwmgJjHwezALdrdvD0h.jpg',
        title: 'Test Movie',
        vote_average: 8.2,
        overview: 'This is a test movie summary.',
    };

    it('renders movie card correctly', () => {
        render(
            <MemoryRouter>
                <MovieCard movie={mockMovie} />
            </MemoryRouter>
        );

        expect(screen.getByText('Test Movie')).toBeInTheDocument();
        expect(screen.getByAltText('Test Movie')).toBeInTheDocument();
        expect(screen.getByText('Rating: 8.2')).toBeInTheDocument();
        expect(screen.getByText('This is a test movie summary.')).toBeInTheDocument();
    });
});
