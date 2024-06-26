import Card from "react-bootstrap/Card";
import { Hall } from "../../interfaces/hallInterface";
import Button from "../../../common/components/Button/Button";
import styles from "./HallCard.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
    hall: Hall;
    hallIndex: number;
}

export const HallCard: React.FC<Props> = ({ hall, hallIndex }) => {
    const navigate = useNavigate();
    return (
        <Card className={`text-center ${styles["card"]}`}>
            <Card.Header>{hallIndex + 1}</Card.Header>
            <Card.Body>
                <Card.Title>Number of seats: {hall.numberOfSeats}</Card.Title>
                <Button onClick={() => navigate(`${hall._id}`)}>Go to</Button>
            </Card.Body>
        </Card>
    );
};
