import { Container } from "react-bootstrap";
import { useFoodAndBeverages } from "../../hooks/useFoodAndBeverages";
import { FoodAndBeverageCard } from "../FoodAndBeverageCard/FoodAndBeverageCard";
import { IRootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { AddEditFoodAndBeverageModal } from "../AddEditFoodAndBeverageModal/AddEditFoodAndBeverageModal";
import styles from "./FoodAndBeveragesList.module.scss";
import { FoodAndBeverage } from "../../interfaces/FoodAndBeverage";
import { useState } from "react";
import { DeleteFoodAndBeverageModal } from "../DeleteFoodAndBeverageModal/DeleteFoodAndBeverageModal";

export const FoodAndBeveragesList = () => {
    const { foodBeverages, setFoodBeverages } = useFoodAndBeverages();
    const [foodAndBeverageToEditDelete, setFoodAndBeverageToEditDelete] = useState<FoodAndBeverage | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const showEditAddModal = useSelector((state: IRootState) => state.addFoodAndBeverageModal.show);
    return (
        <Container>
            <AddEditFoodAndBeverageModal
                setFoodAndBeverage={setFoodAndBeverageToEditDelete}
                foodAndBeverage={foodAndBeverageToEditDelete ?? null}
                stateSetter={setFoodBeverages}
                show={showEditAddModal}
            />
            <DeleteFoodAndBeverageModal
                foodAndBeverage={foodAndBeverageToEditDelete!}
                setFoodAndBeverages={setFoodBeverages}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                setFoodAndBeverage={setFoodAndBeverageToEditDelete}
            ></DeleteFoodAndBeverageModal>
            <div className={styles["food-and-beverages-list"]}>
                {foodBeverages.map((f) => (
                    <FoodAndBeverageCard
                        setShowDeleteModal={setShowDeleteModal}
                        setFoodAndBeverageToEdit={setFoodAndBeverageToEditDelete}
                        key={f._id}
                        foodAndBeverage={f}
                    />
                ))}
            </div>
        </Container>
    );
};
