import { Table } from "react-bootstrap";
import { Movie } from "../../../MoviesList/interfaces/Movie";

interface Props {
    movie: Movie;
}

export const MovieDetailsTable: React.FC<Props> = ({ movie }) => {
    return (
        <Table striped>
            <tbody>
                <tr>
                    <td>Movie Name</td>
                    <td>{movie.name}</td>
                </tr>
                <tr>
                    <td>Director</td>
                    <td>{movie.director}</td>
                </tr>
                <tr>
                    <td>Genre/s</td>
                    <td>{movie.genres}</td>
                </tr>
                <tr>
                    <td>Actors</td>
                    <td>{movie.actors.join(", ")}</td>
                </tr>
                <tr>
                    <td>Age Rating</td>
                    <td>{movie.rating}</td>
                </tr>
                <tr>
                    <td>Language</td>
                    <td>{movie.language}</td>
                </tr>
                <tr>
                    <td>Subtitles</td>
                    <td>{movie.subtitles ?? "No subtitles"}</td>
                </tr>
            </tbody>
        </Table>
    );
};
