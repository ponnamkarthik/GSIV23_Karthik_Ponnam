import React from 'react';
import { Link } from 'react-router-dom';
import {Movie} from "../types";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
            <p>{movie.overview}</p>
            <Link to={`/details/${movie.id}`}>Details</Link>
        </div>
    );
};

export default MovieCard;
