import { Projection } from "../../MovieDetails/interfaces/Projection";
import { Genre } from "./Genre";
import { Rating } from "./Rating";

export interface Movie {
    genres: Genre[];

    name: string;

    length: string;

    director: Rating;

    description: Rating;

    actors: string[];

    language: string;

    poster: string;

    production?: Rating;

    subtitles?: string;

    _id: string;

    rating: string;

    projections: Projection[];
}
