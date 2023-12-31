import React, {useRef, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {fetchMovies} from '../redux/movieSlice';
import { debounce } from 'lodash';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";

const Header: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');

    const debouncedSearch = useRef(debounce((query: string) => {
        // @ts-ignore
        dispatch(fetchMovies(1, query)); // Fetch movies with the query
    }, 300)); // Set the debounce delay

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        debouncedSearch.current(event.target.value); // Call the debounced search function
    };

    console.log(location.pathname)

    const shouldRenderSearchInput = location.pathname.indexOf('/movie/') === -1;


    return (
        <nav className="bg-white shadow-2xl py-4 px-6 flex items-center justify-between">

            <div className="flex items-center">
                {shouldRenderSearchInput && (
                <div className="relative text-black">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-900">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                           viewBox="0 0 24 24" className="w-6 h-6 text-gray-900"><path
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </span>
                    <input type="search" name="search"
                           className="py-2 text-sm border-2 rounded-md pl-10 focus:outline-none bg-gray-200"
                           value={searchQuery}
                           onChange={handleSearchChange}
                           placeholder="Search Movies..." autoComplete="off"/>
                </div>
                    )}
                { !shouldRenderSearchInput && (
                    <div className="text-black">
                        <h2 className="text-2xl font-bold">Movie Details</h2>
                    </div>
                )}
            </div>

            <Link to="/">
                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="h-6 w-6 text-black cursor-pointer">
                        <path
                            d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"/>
                        <path
                            d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"/>
                    </svg>
                </div>
            </Link>
        </nav>
    );
};

export default Header;
