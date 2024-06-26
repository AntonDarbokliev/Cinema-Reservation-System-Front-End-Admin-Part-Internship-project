import { Modal } from "react-bootstrap";
import { FoodAndBeverage } from "../../interfaces/FoodAndBeverage";
import Button from "../../../common/components/Button/Button";
import { useDeleteFoodAndBeverage } from "../../hooks/useDeleteFoodAndBeverage";

interface Props {
    foodAndBeverage: FoodAndBeverage | null;
    setFoodAndBeverage: React.Dispatch<React.SetStateAction<FoodAndBeverage | null>>;
    showDeleteModal: boolean;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    setFoodAndBeverages: React.Dispatch<React.SetStateAction<FoodAndBeverage[]>>;
}

export const DeleteFoodAndBeverageModal: React.FC<Props> = ({
    foodAndBeverage,
    showDeleteModal,
    setShowDeleteModal,
    setFoodAndBeverages,
    setFoodAndBeverage,
}) => {
    const { deleteFoodAndBeverageHandler } = useDeleteFoodAndBeverage(setFoodAndBeverages);
    return (
        <>
            {foodAndBeverage && (
                <Modal show={showDeleteModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Delete {foodAndBeverage.name}?</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                        <Button
                            onClick={async () => {
                                deleteFoodAndBeverageHandler(foodAndBeverage._id);
                                setFoodAndBeverage(null);
                                setShowDeleteModal(false);
                            }}
                        >
                            Delete
                        </Button>
                        <Button onClick={() => setShowDeleteModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};
