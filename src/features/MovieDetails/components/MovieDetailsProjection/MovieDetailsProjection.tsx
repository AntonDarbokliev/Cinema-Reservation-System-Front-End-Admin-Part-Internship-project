import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "../../../common/components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./MovieDetailsProjection.module.scss";
import { ProjectionStatus } from "../../interfaces/ProjectionStatus";
import { Projection } from "../../interfaces/Projection";

interface Props {
    projection: Projection;
}

export const MovieDetailsProjection: React.FC<Props> = ({ projection }) => {
    const navigate = useNavigate();
    const params = useParams();
    const pillColor = () => {
        switch (projection.status) {
            case ProjectionStatus.PROJECTION_SCHEDULED:
                return "primary";
            case ProjectionStatus.PROJECTION_AWAITING:
                return "warning";
            case ProjectionStatus.PROJECTION_RUNNING:
                return "success";
            case ProjectionStatus.PROJECTION_ENDED:
                return "danger";
        }
    };
    return (
        <Card className={styles["projection-card"]} style={{ width: "18rem" }}>
            <Card.Body>
                <Badge pill bg={pillColor()}>
                    {projection.status}
                </Badge>
                <Card.Title>{projection.projectionType}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{projection.startDate}</Card.Subtitle>
                <Card.Text>{projection.startTime}</Card.Text>
                <Card.Text>Base price: {projection.baseTicketPrice}$</Card.Text>
                <Button onClick={() => navigate(`/cinema/${params.id}/projections/${projection._id}`)}>Goto</Button>
            </Card.Body>
        </Card>
    );
};
