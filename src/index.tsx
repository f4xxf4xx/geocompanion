import React from "react";
import ReactDOM from "react-dom/client";
import "index.css";
import App from "App";
import reportWebVitals from "reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Comparator from "containers/comparator";
import PracticeTool from "containers/practice-tool";
import Country from "containers/country";
import Home from "containers/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/compare",
    element: <Comparator />,
  },
  {
    path: "/practice-tool",
    element: <PracticeTool />,
  },
  {
    path: "/:countryCode",
    element: <Country />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
