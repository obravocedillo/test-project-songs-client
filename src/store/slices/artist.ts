import { createSlice } from "@reduxjs/toolkit";
import type { IArtistsState } from "../types/artists";
import { artistsApi } from "../services/artists";

const initialState: IArtistsState = {
  artists: [],
};

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      artistsApi.endpoints.getArtists.matchFulfilled,
      (state, action) => {
        state.artists = action.payload.data;
      },
    );
  },
});

export const { reducer: artistsReducer } = artistsSlice;
