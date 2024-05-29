import { Table } from "react-bootstrap";
import { Projection } from "../../../MovieDetails/interfaces/Projection";

interface Props {
    projection: Projection;
}

export const ProjectionDetailsTable: React.FC<Props> = ({ projection }) => {
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
                    <td>{projection.movie.name}</td>
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
            </tbody>
        </Table>
    );
};
