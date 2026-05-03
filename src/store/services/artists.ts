import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TypedResponse } from "../types/response";
import type { IArtist } from "../types/artists";

export const artistsApi = createApi({
  reducerPath: "artistAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:3002/api",
  }),
  tagTypes: ["Artists"],
  endpoints: (build) => ({
    getArtists: build.query<TypedResponse<IArtist[]>, void>({
      query: () => `/artist`,
      providesTags: ["Artists"],
    }),
    saveArtist: build.mutation<
      TypedResponse<IArtist>,
      { objectInformation: Partial<IArtist> }
    >({
      query: (artist) => ({
        url: `/artist`,
        method: "POST",
        body: artist,
      }),
      invalidatesTags: ["Artists"],
    }),
    updateArtist: build.mutation<
      TypedResponse<IArtist>,
      { objectId: number; objectInformation: Partial<IArtist> }
    >({
      query: ({ objectId, objectInformation }) => ({
        url: `/artist`,
        method: "PUT",
        body: { objectId, objectInformation },
      }),
      invalidatesTags: ["Artists"],
    }),
    deleteArtist: build.mutation<TypedResponse<string>, { id: number }>({
      query: ({ id }) => ({
        url: `/artist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Artists"],
    }),
  }),
});

export const {
  useGetArtistsQuery,
  useSaveArtistMutation,
  useUpdateArtistMutation,
  useDeleteArtistMutation,
} = artistsApi;
