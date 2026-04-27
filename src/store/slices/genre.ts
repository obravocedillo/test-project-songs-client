import { createSlice } from "@reduxjs/toolkit";
import { genresApi } from "../services/genres";
import type { IGenresState } from "../types/genres";

const initialState: IGenresState = {
  genres: [],
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      genresApi.endpoints.getGenres.matchFulfilled,
      (state, action) => {
        state.genres = action.payload.data;
      },
    );
  },
});

export const { reducer: genresReducer } = genresSlice;
