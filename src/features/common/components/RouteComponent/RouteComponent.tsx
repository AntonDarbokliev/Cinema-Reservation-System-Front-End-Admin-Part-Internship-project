import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootOverlay } from "../RootOverlay/RootOverlay";
import { LoginContainer } from "../../../Login/containers/LoginContainer";
import RegisterContainer from "../../../Register/containers/RegisterContainer";
import { Logout } from "../../../Logout/Logout";
import { CinemaPage } from "../../../CinemaPage/components/CinemaPage/CinemaPage";
import { CinemaInfoContainer } from "../../../CinemaInfo/container/CinemaInfoContainer";
import { HallsList } from "../../../HallsList/components/HallsList/HallsList";
import { HallLayout } from "../../../HallLayout/components/HallLayout/HallLayout";
import { CinemaListContainer } from "../../../CinemasList/containers/CinemaListContainer";

export const router = createBrowserRouter([
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
                    {
                        path: "/cinema/:id/halls/:hallId",
                        element: <HallLayout />,
                    },
                ],
            },
        ],
    },
]);

export const RouteComponent = () => {
    return <RouterProvider router={router} />;
};
