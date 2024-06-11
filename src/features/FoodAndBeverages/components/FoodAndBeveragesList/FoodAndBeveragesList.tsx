import { Container } from "react-bootstrap";
import { useFoodAndBeverages } from "../../hooks/useFoodAndBeverages";
import { FoodAndBeverageCard } from "../FoodAndBeverageCard/FoodAndBeverageCard";
import { IRootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { AddFoodAndBeverageModal } from "../AddFoodAndBeverageModal/AddFoodAndBeverageModal";
import styles from "./FoodAndBeveragesList.module.scss";

export const FoodAndBeveragesList = () => {
    const { foodBeverages, setFoodBeverages } = useFoodAndBeverages();
    const show = useSelector((state: IRootState) => state.addFoodAndBeverageModal.show);
    return (
        <Container>
            <AddFoodAndBeverageModal stateSetter={setFoodBeverages} show={show} />
            <div className={styles["food-and-beverages-list"]}>
                {foodBeverages.map((f) => (
                    <FoodAndBeverageCard key={f._id} foodAndBeverage={f} />
                ))}
            </div>
        </Container>
    );
};
