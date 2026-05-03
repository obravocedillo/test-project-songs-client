import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TypedResponse } from "../types/response";
import type { IGenre } from "../types/genres";

export const genresApi = createApi({
  reducerPath: "genreAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:3002/api",
  }),
  tagTypes: ["Genres"],
  endpoints: (build) => ({
    getGenres: build.query<TypedResponse<IGenre[]>, void>({
      query: () => `/genre`,
      providesTags: ["Genres"],
    }),
    saveGenre: build.mutation<
      TypedResponse<IGenre>,
      { objectInformation: Partial<IGenre> }
    >({
      query: (genre) => ({
        url: `/genre`,
        method: "POST",
        body: genre,
      }),
      invalidatesTags: ["Genres"],
    }),
    updateGenre: build.mutation<
      TypedResponse<IGenre>,
      { objectId: number; objectInformation: Partial<IGenre> }
    >({
      query: ({ objectId, objectInformation }) => ({
        url: `/genre`,
        method: "PUT",
        body: { objectId, objectInformation },
      }),
      invalidatesTags: ["Genres"],
    }),
    deleteGenre: build.mutation<TypedResponse<string>, { id: number }>({
      query: ({ id }) => ({
        url: `/genre/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Genres"],
    }),
  }),
});

export const {
  useGetGenresQuery,
  useSaveGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} = genresApi;
