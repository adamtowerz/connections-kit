import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import PuzzlePageWrapper from "./PuzzlePageWrapper.tsx";
import PuzzleCreaterPage from "./PuzzleCreaterPage.tsx";
import Root from "./Root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PuzzleCreaterPage />,
        children: [{}],
      },
      {
        path: "puzzle/:puzzle",
        element: <PuzzlePageWrapper />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
