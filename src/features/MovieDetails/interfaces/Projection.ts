import { Cinema } from "../../CinemasList/interfaces/cinemaInterface";
import { Hall } from "../../HallsList/interfaces/hallInterface";
import { Movie } from "../../MoviesList/interfaces/Movie";
import { ProjectionStatus } from "./ProjectionStatus";
import { Reservation } from "./Reservation";

export enum ProjectionType {
    PROJECTION_2D = "2D",
    PROJECTION_3D = "3D",
    PROJECTION_4DX = "4DX",
}

export interface Projection {
    startTime: string;

    startDate: string;

    cinema: Cinema;

    hall: Hall;

    projectionType: ProjectionType;

    baseTicketPrice: number;

    movie: Movie;

    _id: string;

    reservations: Reservation[];

    status: ProjectionStatus;
}
