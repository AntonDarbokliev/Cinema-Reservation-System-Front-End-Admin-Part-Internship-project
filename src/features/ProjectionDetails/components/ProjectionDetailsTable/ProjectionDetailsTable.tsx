import { Table } from "react-bootstrap";
import { Projection } from "../../../MovieDetails/interfaces/Projection";
import { Movie } from "../../../MoviesList/interfaces/Movie";
import { ReservationStatus } from "../../../HallLayout/interfaces/ReservationStatus";

interface Props {
    projection: Projection;
    movie: Movie;
}

export const ProjectionDetailsTable: React.FC<Props> = ({ projection, movie }) => {
    return (
        <Table striped>
            <tbody>
                <tr>
                    <td>Base ticket price &#40;common seat, no sides&#41;</td>
                    <td>{projection.baseTicketPrice}$</td>
                </tr>

                <tr>
                    <td>Hall</td>
                    <td>{projection.hall.name}</td>
                </tr>
                <tr>
                    <td>Movie</td>
                    <td>{movie.name}</td>
                </tr>
                <tr>
                    <td>Projection Type</td>
                    <td>{projection.projectionType}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>{projection.startDate}</td>
                </tr>
                <tr>
                    <td>Time</td>
                    <td>{projection.startTime}</td>
                </tr>
                <tr>
                    <td>Reservations Made</td>
                    <td>{projection.reservations.filter((res) => res.status !== ReservationStatus.CANCELLED).length}</td>
                </tr>
                <tr>
                    <td>Tickets Sold</td>
                    <td>{projection.tickets?.length}</td>
                </tr>
            </tbody>
        </Table>
    );
};
