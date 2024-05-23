import Card from "react-bootstrap/Card";
import { FoodAndBeverage } from "../../interfaces/FoodAndBeverage";
import styles from "./FoodAndBeverageCard.module.scss";

interface Props {
    foodAndBeverage: FoodAndBeverage;
}

export const FoodAndBeverageCard: React.FC<Props> = ({ foodAndBeverage }) => {
    return (
        <Card className={styles["food-beverage-card"]}>
            <Card.Img variant="top" src={foodAndBeverage.image} />
            <Card.Body>
                <Card.Title>{foodAndBeverage.name}</Card.Title>
                <Card.Text>{foodAndBeverage.price}$</Card.Text>
                <Card.Text>{foodAndBeverage.description}</Card.Text>
            </Card.Body>
        </Card>
    );
};
