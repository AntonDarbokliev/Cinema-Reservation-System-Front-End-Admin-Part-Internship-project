import { Cinema } from "../../CinemasList/interfaces/cinemaInterface";
import { Hall } from "../../HallsList/interfaces/hallInterface";

export enum ProjectionType {
  PROJECTION_2D = '2D',
  PROJECTION_3D = '3D',
  PROJECTION_4DX = '4DX',
}


export interface Projection {
    startTime: string;

    startDate: Date;

    cinema: Cinema;

    hall: Hall;

    projectionType: ProjectionType;

    baseTicketPrice: number;
}
