import React from 'react';
import {Link} from 'react-router-dom';
import {Movie} from "../types";
import placeholder from '../images/placeholder.jpg';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
    let poster;
    if (movie.poster_path) {
        poster = <img className="flex-1 h-full object-cover"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>;
    } else {
        poster = <img className="flex-1 h-full object-cover"
                      src={placeholder} alt={movie.title}/>;
    }
    return (
        <Link to={`/movie/${movie.id}`}
              className="bg-white shadow-2xl overflow-hidden rounded-xl flex flex-col w-full space-y-4">
            {poster}
            <div className="h-24 px-4 space-y-2 text-start">
                <div className="flex flex-row justify-between">
                    <h3 className="line-clamp-1 flex-1 color-gray">{movie.title}</h3>
                    <p className="color-light-gray">Rating: {movie.vote_average.toFixed(1)}</p>
                </div>
                <p className="line-clamp-2 color-gray">{movie.overview}</p>
            </div>
        </Link>
    );
};

export default MovieCard;
