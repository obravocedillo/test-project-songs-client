import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TypedResponse } from "../types/response";
import type { IGenre } from "../types/genres";

export const artistsApi = createApi({
  reducerPath: "artistAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:3002/api",
  }),
  endpoints: (build) => ({
    getArtists: build.query<TypedResponse<IGenre[]>, void>({
      query: () => `/artist`,
    }),
  }),
});

export const { useGetArtistsQuery } = artistsApi;
