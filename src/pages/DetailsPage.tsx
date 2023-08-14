import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../redux/movieDetailsSlice';
import {RootState} from "../redux/store";

const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
};

const DetailsPage: React.FC = () => {
    const dispatch = useDispatch();
    const { movieId } = useParams<{ movieId: string }>();
    const { movieDetails, loading, error } = useSelector((state: RootState) => state.movieDetails);

    const [expandCast, setExpandCast] = useState(false);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchMovieDetails(parseInt(movieId)));
    }, [dispatch, movieId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movieDetails) {
        return null;
    }

    const { title, poster_path, vote_average, release_date, runtime, overview, credits } = movieDetails;

    // loop credits.cast and credits.crew to get the director
    const cast = credits.cast.map(actor => actor.name).join(', ')
    // multiple directors to comma separated string
    const directors = credits.crew.filter(crew => crew.job === 'Director').map(crew => crew.name).join(', ')
    return (
        <div className="p-6">
            <div className="flex flex-row items-start justify-start">
                <img className="w-40 object-contain" src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={title} style={{ marginRight: '16px' }} />
                <div className="text-start flex-1 flex flex-col space-y-2">
                    <h2>
                        <span>{title}</span> (<span>{vote_average.toFixed(1) }</span>)
                    </h2>
                    <p>
                        <span>{release_date.substring(0, 4)}</span> | <span>{formatRuntime(runtime)}</span> | <span>{directors}</span>
                    </p>
                    <p className={!expandCast ? 'line-clamp-1 cursor-pointer' : 'cursor-pointer'} onClick={() => setExpandCast(!expandCast)}>
                        Cast: {cast}
                    </p>
                    <p>Description: {overview}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
