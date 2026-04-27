import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ISong } from "../types/songs";
import type { TypedResponse } from "../types/response";

export const songsApi = createApi({
  reducerPath: "songsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:3002/api",
  }),
  endpoints: (build) => ({
    getSongs: build.query<TypedResponse<ISong[]>, void>({
      query: () => `/songs`,
    }),
  }),
});

export const { useGetSongsQuery } = songsApi;
