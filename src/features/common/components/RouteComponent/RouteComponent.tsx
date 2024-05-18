import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootOverlay } from "../RootOverlay/RootOverlay";
import App from "../../../../App";
import { LoginContainer } from "../../../Login/containers/LoginContainer";
import RegisterContainer from "../../../Register/containers/RegisterContainer";
import { Logout } from "../../../Logout/Logout";

export const router = createBrowserRouter([
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

export const RouteComponent = () => {
    return <RouterProvider router={router} />;
};
