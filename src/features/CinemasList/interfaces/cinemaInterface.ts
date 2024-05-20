import { Hall } from "../../HallsList/interfaces/hallInterface";
import { Movie } from "../../MoviesList/interfaces/Movie";

export interface Cinema {
    _id: string;

    address: string;

    name: string;

    numberOfHalls: string;

    halls: Hall[];

    menu: object[];

    projections: object[];

    movies: Movie[];
}
