import { Projection } from "../../MovieDetails/interfaces/Projection";
import { Genre } from "./Genre";
import { Rating } from "./Rating";

export interface Movie {
    genres: Genre[];

    name: string;

    length: string;

    director: string;

    description: string;

    actors: string[];

    language: string;

    poster: string;

    production: string;

    subtitles: string[];

    rating: Rating;

    projections: Projection[];

    _id: string;
}
