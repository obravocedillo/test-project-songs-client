import { createBrowserRouter, Navigate } from "react-router";
import { Songs } from "../pages/songs";
import { RootLayout } from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/songs",
        element: <Songs />,
      },
      {
        path: "*",
        element: <Navigate to="/songs" />,
      },
    ],
  },
]);
