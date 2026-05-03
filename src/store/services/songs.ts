import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ISong } from "../types/songs";
import type { TypedResponse } from "../types/response";

export const songsApi = createApi({
  reducerPath: "songsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:3002/api",
  }),
  tagTypes: ["Songs"],
  endpoints: (build) => ({
    getSongs: build.query<TypedResponse<ISong[]>, void>({
      query: () => `/songs`,
      providesTags: ["Songs"],
    }),
    saveSong: build.mutation<
      TypedResponse<ISong>,
      { objectInformation: Partial<ISong> }
    >({
      query: (song) => ({
        url: `/songs`,
        method: "POST",
        body: song,
      }),
      invalidatesTags: ["Songs"],
    }),
    updateSong: build.mutation<
      TypedResponse<ISong>,
      { objectId: number; objectInformation: Partial<ISong> }
    >({
      query: ({ objectId, objectInformation }) => ({
        url: `/songs`,
        method: "PUT",
        body: { objectId, objectInformation },
      }),
      invalidatesTags: ["Songs"],
    }),
    deleteSong: build.mutation<TypedResponse<string>, { id: number }>({
      query: ({ id }) => ({
        url: `/songs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Songs"],
    }),
  }),
});

export const {
  useGetSongsQuery,
  useSaveSongMutation,
  useUpdateSongMutation,
  useDeleteSongMutation,
} = songsApi;
