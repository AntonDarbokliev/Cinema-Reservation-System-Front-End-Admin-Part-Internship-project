import { Card } from "react-bootstrap";
import { UnpopulatedProjection } from "../../interfaces/unpopulatedProjection";
import Button from "../../../common/components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import styles from './MovieDetailsProjection.module.scss';

interface Props {
    projection: UnpopulatedProjection;
}

export const MovieDetailsProjection: React.FC<Props> = ({ projection }) => {
    const navigate = useNavigate();
    const params = useParams();
    return (
        <Card className={styles["projection-card"]} style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title>{projection.projectionType}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{projection.startDate}</Card.Subtitle>
                <Card.Text>{projection.startTime}</Card.Text>
                <Card.Text>Base price: {projection.baseTicketPrice}$</Card.Text>
                <Button onClick={() => navigate(`/cinema/${params.id}/projections/${projection._id}`)}>Goto</Button>
            </Card.Body>
        </Card>
    );
};
