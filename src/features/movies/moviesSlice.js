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
export const sortItems = (items, key) => {
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
    reducers: {
        sortBy(state, action) {
            state.sortBy = action.payload;
        }
    },
    extraReducers: {
        [getMovies.pending]: (state, action) => {
            state.status = "loading";
            state.movies = [];
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

// Selector for movies
export const selectMovies = (state) => {
    const movieItems = state.movies &&
        state.movies.movies &&
        state.movies.movies.find(element => element.type === "movie-list");
    return !!movieItems ? movieItems.items : [];
};

// Selector for sort orders
export const selectOrderBy = (state) => {
    const orderByItems = state.movies &&
        state.movies.movies &&
        state.movies.movies.find(element => element.type === "order-select");
    return !!orderByItems ? orderByItems.items : []
};

// Selector to get selected sort order
export const selectSortBy = (state) => {
    return state.movies && state.movies.sortBy;
};

export const { sortBy } = moviesSlice.actions;
export default moviesSlice.reducer;