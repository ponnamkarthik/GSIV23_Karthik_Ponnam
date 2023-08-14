import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchMovies } from '../redux/movieSlice';
import MovieCard from '../components/MovieCard';

const ListPage: React.FC = () => {
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector((state: RootState) => state.movies);

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
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 my-8">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default ListPage;
