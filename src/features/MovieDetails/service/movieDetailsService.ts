import { Movie } from "../../MoviesList/interfaces/Movie";
import { RequestFactory } from "../../common/services/requester";
import { Projection } from "../interfaces/Projection";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getProjections = (movieId: string): Promise<Projection[]> => request.get(`${baseUrl}/projections/movie/${movieId}`);
export const getMovie = (movieId: string): Promise<Movie> => request.get(`${baseUrl}/movies/${movieId}`);
