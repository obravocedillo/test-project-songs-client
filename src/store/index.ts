import { configureStore } from "@reduxjs/toolkit";
import { songsReducer } from "./slices/songs";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { songsApi } from "./services/songs";

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    [songsApi.reducerPath]: songsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(songsApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const songsState = (state: RootState) => state.songs;
