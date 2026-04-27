import { configureStore } from "@reduxjs/toolkit";
import { songsReducer } from "./slices/songs";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { songsApi } from "./services/songs";
import { genresReducer } from "./slices/genre";
import { artistsReducer } from "./slices/artist";
import { genresApi } from "./services/genres";
import { artistsApi } from "./services/artists";

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    genres: genresReducer,
    artists: artistsReducer,
    [songsApi.reducerPath]: songsApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [artistsApi.reducerPath]: artistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(songsApi.middleware)
      .concat(genresApi.middleware)
      .concat(artistsApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const songsState = (state: RootState) => state.songs;
export const genresState = (state: RootState) => state.genres;
export const artistsState = (state: RootState) => state.artists;
