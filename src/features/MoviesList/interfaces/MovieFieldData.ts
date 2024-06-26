import { Genre } from "./Genre";
import { Rating } from "./Rating";

export interface MovieFieldData {
    language: string;
    name: string;
    length: string;
    director: string;
    description: string;
    production: string;
    rating: Rating;
    poster: File | string;
    actors: string[];
    subtitles: string[];
    genres: Genre[];
}
