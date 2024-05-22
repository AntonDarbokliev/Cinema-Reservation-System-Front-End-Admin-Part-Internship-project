import { ProjectionType } from "./Projection";

export interface UnpopulatedProjection {
    startTime: string;

    startDate: string;

    cinema: string;

    hall: string;

    projectionType: ProjectionType;

    baseTicketPrice: number;

    movie: string;

    _id: string;
}
