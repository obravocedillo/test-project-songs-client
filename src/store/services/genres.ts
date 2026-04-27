import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TypedResponse } from "../types/response";
import type { IGenre } from "../types/genres";

export const genresApi = createApi({
  reducerPath: "genreAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:3002/api",
  }),
  endpoints: (build) => ({
    getGenres: build.query<TypedResponse<IGenre[]>, void>({
      query: () => `/genre`,
    }),
  }),
});

export const { useGetGenresQuery } = genresApi;
