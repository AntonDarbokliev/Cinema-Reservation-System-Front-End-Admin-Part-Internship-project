import Card from "react-bootstrap/Card";
import Button from "../../../common/components/Button/Button";
import { Cinema } from "../../interfaces/cinemaInterface";
import { useNavigate } from "react-router-dom";
import styles from './CinemaCard.module.scss';


interface Props {
    cinema: Cinema;
}

export const CinemaCard: React.FC<Props> = ({ cinema }) => {
    const navigate = useNavigate();
    return (
        <Card className={`text-center ${styles['card']}`}>
            <Card.Header>Halls: {cinema.numberOfHalls}</Card.Header>
            <Card.Body>
                <Card.Title>{cinema.name}</Card.Title>
                <Card.Text>{cinema.address}</Card.Text>
                <Button onClick={() => navigate(`cinema/${cinema._id}/halls`)}>Go to</Button>
            </Card.Body>
        </Card>
    );
};
