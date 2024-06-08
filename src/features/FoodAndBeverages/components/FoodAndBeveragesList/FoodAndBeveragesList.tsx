import { Container } from "react-bootstrap";
import { useFoodAndBeverages } from "../../hooks/useFoodAndBeverages";
import { FoodAndBeverageCard } from "../FoodAndBeverageCard/FoodAndBeverageCard";
import { IRootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { AddEditFoodAndBeverageModal } from "../AddEditFoodAndBeverageModal/AddEditFoodAndBeverageModal";
import styles from "./FoodAndBeveragesList.module.scss";
import { FoodAndBeverage } from "../../interfaces/FoodAndBeverage";
import { useState } from "react";

export const FoodAndBeveragesList = () => {
    const { foodBeverages, setFoodBeverages } = useFoodAndBeverages();
    const [foodAndBeverageToEdit, setFoodAndBeverageToEdit] = useState<FoodAndBeverage | null>(null);
    const show = useSelector((state: IRootState) => state.addFoodAndBeverageModal.show);
    return (
        <Container>
            <AddEditFoodAndBeverageModal
                setFoodAndBeverage={setFoodAndBeverageToEdit}
                foodAndBeverage={foodAndBeverageToEdit ?? null}
                stateSetter={setFoodBeverages}
                show={show}
            />
            <div className={styles["food-and-beverages-list"]}>
                {foodBeverages.map((f) => (
                    <FoodAndBeverageCard setFoodAndBeverageToEdit={setFoodAndBeverageToEdit} key={f._id} foodAndBeverage={f} />
                ))}
            </div>
        </Container>
    );
};
