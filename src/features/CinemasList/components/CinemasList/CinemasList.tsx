import ListGroup from "react-bootstrap/ListGroup";
import { CinemaCard } from "../CinemaCard/CinemaCard";
import { Cinema } from "../../interfaces/cinemaInterface";

interface Props {
    cinemas: Cinema[];
}

export const CinemasList: React.FC<Props> = ({ cinemas }) => {
    return (
        <ListGroup>
            {cinemas.map((c) => (
                <CinemaCard key={c._id} cinema={c} />
            ))}
        </ListGroup>
    );
};
