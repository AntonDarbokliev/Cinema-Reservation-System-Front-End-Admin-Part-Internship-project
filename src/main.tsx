import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./scss/styles.scss";
import "bootstrap";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginContainer } from "./features/Login/containers/LoginContainer.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <LoginContainer />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
