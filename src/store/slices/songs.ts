import { createSlice } from "@reduxjs/toolkit";
import type { ISongsState } from "../types/songs";
import { songsApi } from "../services/songs";

const initialState: ISongsState = {
  songs: [],
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      songsApi.endpoints.getSongs.matchFulfilled,
      (state, action) => {
        state.songs = action.payload.data;
      },
    );
  },
});

export const { reducer: songsReducer } = songsSlice;
