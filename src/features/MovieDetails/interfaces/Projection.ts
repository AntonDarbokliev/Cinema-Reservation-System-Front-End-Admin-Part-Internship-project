import { Cinema } from "../../CinemasList/interfaces/cinemaInterface";
import { Ticket } from "../../HallLayout/interfaces/Ticket";
import { Hall } from "../../HallsList/interfaces/hallInterface";
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

    movieId: string;

    movieLength: string | number;

    _id: string;

    reservations: Reservation[];

    status: ProjectionStatus;

    tickets: Ticket[];
}
