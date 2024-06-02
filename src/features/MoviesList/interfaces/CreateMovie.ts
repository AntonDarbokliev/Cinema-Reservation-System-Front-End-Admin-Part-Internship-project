import { Genre } from "./Genre";
import { Rating } from "./Rating";

export interface CreateMovie {
    genres: Genre[];

    name: string;

    length: string;

    director: string;

    description: string;

    actors: string[];

    language: string;

    poster: File;

    production: string;

    subtitles: string[];

    rating: Rating;

    cinemaId: string;
}
