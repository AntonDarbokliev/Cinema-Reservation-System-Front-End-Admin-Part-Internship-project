import { RequestFactory } from "../../common/services/requester";
import { Movie } from "../interfaces/Movie";

const request = RequestFactory();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const createMovie = (movieData: FormData): Promise<Movie> => request.post(`${baseUrl}/movies`, movieData);
export const editMovie = (movieData: FormData, movieId: string): Promise<Movie> => request.patch(`${baseUrl}/movies/${movieId}`, movieData);
