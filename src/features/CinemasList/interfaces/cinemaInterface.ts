import { Hall } from "../../HallsList/interfaces/hallInterface";
import { UnpopulatedProjection } from "../../MovieDetails/interfaces/unpopulatedProjection";
import { Movie } from "../../MoviesList/interfaces/Movie";

export interface Cinema {
    _id: string;

    address: string;

    name: string;

    numberOfHalls: string;

    halls: Hall[];

    menu: object[];

    projections: UnpopulatedProjection[];

    movies: Movie[];
}

export interface CreateCinema {
    address: string;

    name: string;
}
