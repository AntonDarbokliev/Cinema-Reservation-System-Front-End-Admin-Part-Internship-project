import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/styles.scss";
import "bootstrap";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginContainer } from "./features/Login/containers/LoginContainer.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import RegisterContainer from "./features/Register/containers/RegisterContainer.tsx";
import { RootOverlay } from "./features/common/components/RootOverlay/RootOverlay.tsx";
import { Logout } from "./features/Logout/Logout.tsx";
import { CinemaListContainer } from "./features/CinemasList/containers/CinemaListContainer.tsx";
import { CinemaPage } from "./features/CinemaPage/components/CinemaPage/CinemaPage.tsx";
import { CinemaInfoContainer } from "./features/CinemaInfo/container/CinemaInfoContainer.tsx";
import { HallsList } from "./features/HallsList/components/HallsList/HallsList.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootOverlay />,
        children: [
            {
                path: "/",
                element: <CinemaListContainer />,
            },
            {
                path: "/login",
                element: <LoginContainer />,
            },
            {
                path: "/register",
                element: <RegisterContainer />,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
            {
                path: "/cinema/:id",
                element: <CinemaPage />,
                children: [
                    {
                        path: "/cinema/:id",
                        element: <CinemaInfoContainer />,
                    },
                    {
                        path: "/cinema/:id/halls",
                        element: <HallsList />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
