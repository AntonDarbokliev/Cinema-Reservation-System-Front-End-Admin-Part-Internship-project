import { ProjectionType } from "../../MovieDetails/interfaces/Projection";

export interface CreateProjection {
    startTime: string;

    startDate: string;

    projectionType: ProjectionType;

    baseTicketPrice: string;

    movie: string;

    cinema: string;

    hall: string;
}
