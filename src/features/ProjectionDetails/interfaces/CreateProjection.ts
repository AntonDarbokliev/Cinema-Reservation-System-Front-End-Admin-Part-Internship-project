import { ProjectionType } from "../../MovieDetails/interfaces/Projection";

export interface CreateProjection {
    startTime: string;

    startDate: string;

    projectionType: ProjectionType;

    baseTicketPrice: string;

    minutesAwaitingStatusMargin: number;

    movieId: string;

    movieLength: string | number;

    cinemaId: string;

    hall: string;
}
