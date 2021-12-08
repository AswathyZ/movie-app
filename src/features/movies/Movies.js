import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getMovies } from "./moviesSlice";

import SortMovies from './SortMovies';
import DisplayMovies from './DisplayMovies';

export default function Movies() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    return (
        <>
            <h1>
                Boss's favourite Movies
            </h1>
            <SortMovies />
            <DisplayMovies />
        </>
    );
}
