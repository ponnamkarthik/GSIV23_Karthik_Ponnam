import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchMovies } from '../redux/movieSlice';
import MovieCard from '../components/MovieCard';


const ListPage: React.FC = () => {
    const dispatch = useDispatch();
    const { movies, loading, error, page, totalPages } = useSelector((state: RootState) => state.movies);

    const loader = useRef<HTMLDivElement | null>(null);

    const loadMore = () => {
        if (loader.current && !loading && page <= totalPages) {
            const rect = loader.current.getBoundingClientRect();
            if (rect.top <= window.innerHeight) {
                // @ts-ignore
                dispatch(fetchMovies(page + 1));
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [page, totalPages, loading]); // Update the dependencies array

    useEffect(() => {
        // Trigger initial fetch only if it hasn't been done before
        if (page === 1) {
            // @ts-ignore
            dispatch(fetchMovies());
        }
    }, [dispatch, page]);


    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mx-8 my-8">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
            <div ref={loader}>{loading && page <= totalPages ? 'Loading...' : 'All movies loaded'}</div>
        </div>
    );
};

export default ListPage;
