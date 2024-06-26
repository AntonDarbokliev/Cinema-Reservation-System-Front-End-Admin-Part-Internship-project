import Card from "react-bootstrap/Card";
import { FoodAndBeverage } from "../../interfaces/FoodAndBeverage";
import styles from "./FoodAndBeverageCard.module.scss";
import Button from "../../../common/components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { showAddFoodAndBeverageModal } from "../../../../store/addFoodBeverageModal/addFoodBeverageModalSlice";
import { useDispatch } from "react-redux";

interface Props {
    foodAndBeverage: FoodAndBeverage;
    setFoodAndBeverageToEdit: React.Dispatch<React.SetStateAction<FoodAndBeverage | null>>;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FoodAndBeverageCard: React.FC<Props> = ({ foodAndBeverage, setFoodAndBeverageToEdit, setShowDeleteModal }) => {
    const dispatch = useDispatch();
    return (
        <Card className={styles["food-beverage-card"]}>
            <div className={styles["edit-delete-btns"]}>
                <Button
                    onClick={() => {
                        setFoodAndBeverageToEdit(foodAndBeverage);
                        dispatch(showAddFoodAndBeverageModal());
                    }}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <Button
                    onClick={() => {
                        setFoodAndBeverageToEdit(foodAndBeverage);
                        setShowDeleteModal(true);
                    }}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </Button>
            </div>
            <Card.Img variant="top" src={foodAndBeverage.image} />
            <Card.Body>
                <Card.Title>{foodAndBeverage.name}</Card.Title>
                <Card.Text>{foodAndBeverage.price}$</Card.Text>
                <Card.Text>{foodAndBeverage.description}</Card.Text>
            </Card.Body>
        </Card>
    );
};
