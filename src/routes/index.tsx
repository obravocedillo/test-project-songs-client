import { createBrowserRouter, Navigate } from "react-router";
import { Songs } from "../pages/songs/songs";
import { RootLayout } from "../layouts/RootLayout";
import { Artist } from "../pages/artist/artist";
import { Genres } from "../pages/genres/genres";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/songs",
        element: <Songs />,
      },
      {
        path: "/artists",
        element: <Artist />,
      },
      {
        path: "/genres",
        element: <Genres />,
      },
      {
        path: "*",
        element: <Navigate to="/songs" />,
      },
    ],
  },
]);
