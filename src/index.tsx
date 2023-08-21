import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/scss/main.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./app/store";
import SearchResult from "./pages/SearchResult";
import Details from "./pages/Details";
import ErrorPage from "./pages/ErrorPage";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/results/*",
                element: <SearchResult />,
            },
            {
                path: "/details/*",
                element: <Details />,
            },
        ],
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
