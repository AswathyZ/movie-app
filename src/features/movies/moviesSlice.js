import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch data
export const getMovies = createAsyncThunk(
    "movies/getMovies",
    async () => {
        const res = await fetch('http://localhost:9000/components');
        return res.json();
    }
);

/**
 * Sort by given order  
 * @param items items to be sorted
 * @param key sort items based on order
 */
export const sortBy = (items, key) => {
    let newList = [...items];
    newList = (newList && newList.length > 0 && key) &&
        newList.sort((a, b) => parseFloat(a[key]) - parseFloat(b[key]));
    return newList;
}

// Movie Slice which calls the API and stores data in redux store
const moviesSlice = createSlice({
    name: "moviesList",
    initialState: {
        movies: [],

        status: null,
    },
    extraReducers: {
        [getMovies.pending]: (state, action) => {
            state.status = "loading";
        },
        [getMovies.fulfilled]: (state, action) => {
            state.status = "success";
            state.movies = action.payload;
        },
        [getMovies.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

// Selectors for movies
export const selectMovies = (state) => {
    const movieItems = state.movies &&
        state.movies.movies &&
        state.movies.movies.find(element => element.type === "movie-list");
    return !!movieItems ? movieItems.items : [];
};

// Selectors for sort order
export const selectOrderBy = (state) => {
    const orderByItems = state.movies &&
        state.movies.movies &&
        state.movies.movies.find(element => element.type === "order-select");
    return !!orderByItems ? orderByItems.items : []
};

export default moviesSlice.reducer;