import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootOverlay } from "../RootOverlay/RootOverlay";
import { LoginContainer } from "../../../Login/containers/LoginContainer";
import RegisterContainer from "../../../Register/containers/RegisterContainer";
import { Logout } from "../../../Logout/Logout";
import { CinemaPage } from "../../../CinemaPage/components/CinemaPage/CinemaPage";
import { HallsList } from "../../../HallsList/components/HallsList/HallsList";
import { HallLayout } from "../../../HallLayout/components/HallLayout/HallLayout";
import { MoviesList } from "../../../MoviesList/components/MoviesList/MoviesList";
import { MovieDetails } from "../../../MovieDetails/components/MovieDetails/MovieDetails";
import { ProjectionDetails } from "../../../ProjectionDetails/components/ProjectionDetails/ProjectionDetails";
import { CinemasList } from "../../../CinemasList/components/CinemasList/CinemasList";
import { FoodAndBeveragesList } from "../../../FoodAndBeverages/components/FoodAndBeveragesList/FoodAndBeveragesList";
import { ProjectionHallLayout } from "../../../ProjectionDetails/components/ProjectionHallLayout/ProjectionHallLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootOverlay />,
        children: [
            {
                path: "/",
                element: <CinemasList />,
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
                        path: "/cinema/:id/movies",
                        element: <MoviesList />,
                    },
                    {
                        path: "/cinema/:id/movies/:movieId",
                        element: <MovieDetails />,
                    },
                    {
                        path: "/cinema/:id/halls",
                        element: <HallsList />,
                    },
                    {
                        path: "/cinema/:id/halls/:hallId",
                        element: <HallLayout />,
                    },
                    {
                        path: "/cinema/:id/projections/:projectionId",
                        element: <ProjectionDetails />,
                    },
                    {
                        path: "/cinema/:id/projections/:projectionId/hall",
                        element: <ProjectionHallLayout />,
                    },
                    {
                        path: "/cinema/:id/food-and-beverages",
                        element: <FoodAndBeveragesList />,
                    },
                ],
            },
        ],
    },
]);

export const RouteComponent = () => {
    return <RouterProvider router={router} />;
};
