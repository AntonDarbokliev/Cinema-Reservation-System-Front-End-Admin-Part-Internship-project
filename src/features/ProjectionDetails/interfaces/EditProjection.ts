import { ProjectionType } from "../../MovieDetails/interfaces/Projection";

export interface EditProjection {
    startTime?: string;

    startDate?: string;

    projectionType?: ProjectionType;

    baseTicketPrice?: string;
}
