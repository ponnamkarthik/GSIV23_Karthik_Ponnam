import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchMovies } from '../redux/movieSlice';
import MovieCard from '../components/MovieCard';

const ListPage: React.FC = () => {
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector((state: RootState) => state.movies);
    // const { loading } = useSelector((state: RootState) => state.loading);
    // const { error } = useSelector((state: RootState) => state.error);
    // const loading = false;
    // const error = null;
    //
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchMovies());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default ListPage;
