import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IShow } from "../../helpers/interfaces/IShow";
import { RootState } from "../../app/store";
import { getTvShow } from "../../services/tvShows";
import { IWatchlistItem } from "../../helpers/interfaces/IWatchlistItem";

export const fetchBySearchQuery = createAsyncThunk(
    "shows/fetchBySearchQuery",
    async (searchQuery: string) => getTvShow(searchQuery)
);

export interface ShowsState {
    watchlist: IWatchlistItem[];
    results: IShow[];
    details: IShow;
    query: string;
    loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ShowsState = {
    watchlist: [],
    results: [],
    details: {
        id: 0,
        name: "",
        genres: [],
        image: {
            medium: "",
        },
        summary: "",
    },
    query: "",
    loading: "idle",
};

export const showsSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setDetails: (state, action: PayloadAction<IShow>) => {
            state.details.id = action.payload.id;
            state.details.name = action.payload.name;
            state.details.genres = action.payload.genres;
            action.payload.image.medium
                ? (state.details.image.medium = action.payload.image.medium)
                : (state.details.image.medium = "");
            action.payload.summary
                ? (state.details.summary = action.payload.summary)
                : (state.details.summary = "");
        },
        addToWatchlist: (state, action: PayloadAction<IWatchlistItem>) => {
            state.watchlist = state.watchlist.concat(action.payload);
        },
        removeShowFromWatchlist: (state, action: PayloadAction<number>) => {
            state.watchlist = state.watchlist.filter(
                (show) => show.id !== action.payload
            );
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBySearchQuery.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(fetchBySearchQuery.fulfilled, (state, action) => {
                state.loading = "succeeded";
                if (state.results.length === 0) {
                    state.results = state.results.concat(action.payload);
                } else {
                    state.results.splice(
                        0,
                        state.results.length,
                        ...action.payload
                    );
                }
            })
            .addCase(fetchBySearchQuery.rejected, (state) => {
                state.loading = "failed";
            });
    },
});

export const {
    setSearchQuery,
    setDetails,
    addToWatchlist,
    removeShowFromWatchlist,
} = showsSlice.actions;

export const selectQuery = (state: RootState) => state.shows.query;
export const selectStatus = (state: RootState) => state.shows.loading;
export const selectResults = (state: RootState) => state.shows.results;
export const selectDetails = (state: RootState) => state.shows.details;
export const selectWatchlist = (state: RootState) => state.shows.watchlist;

export default showsSlice.reducer;
