import React from 'react';
import {Movie} from "../types";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="movie-card">
            MovieCard
        </div>
    );
};

export default MovieCard;
