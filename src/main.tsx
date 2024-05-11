import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./scss/styles.scss";
import "bootstrap";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginContainer } from "./features/Login/containers/LoginContainer.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import RegisterContainer from "./features/Register/containers/RegisterContainer.tsx";
// import { SideNav } from "./features/SideNav/components/SideNav/SideNav.tsx";
import { RootOverlay } from "./features/common/components/RootOverlay/RootOverlay.tsx";
import { Logout } from "./features/Logout/Logout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootOverlay />,
        children: [
            {
                path: "/",
                element: <App />,
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
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <SideNav /> */}
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
