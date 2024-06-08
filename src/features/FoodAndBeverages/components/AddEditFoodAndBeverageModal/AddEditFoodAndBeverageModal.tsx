import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "../../../common/components/Button/Button";
import { useForm } from "../../../common/hooks/useForm";
import { useDispatch } from "react-redux";
import { useCreateFoodAndBeverage } from "../../hooks/useCreateFoodAndBeverage";
import { useEffect, useState } from "react";
import { hideAddFoodAndBeverageModal } from "../../../../store/addFoodBeverageModal/addFoodBeverageModalSlice";
import { FoodAndBeverage } from "../../interfaces/FoodAndBeverage";
import { Image } from "react-bootstrap";
import { useEditFoodAndBeverage } from "../../hooks/useEditFoodAndBeverage";

interface Props {
    show: boolean;
    stateSetter?: React.Dispatch<React.SetStateAction<FoodAndBeverage[]>>;
    foodAndBeverage?: FoodAndBeverage | null;
    setFoodAndBeverage?: React.Dispatch<React.SetStateAction<FoodAndBeverage | null>>;
}

export const AddEditFoodAndBeverageModal: React.FC<Props> = ({ show, stateSetter, foodAndBeverage, setFoodAndBeverage }) => {
    const initialValue = {
        name: foodAndBeverage?.name ?? "",
        description: foodAndBeverage?.description ?? "",
        price: foodAndBeverage?.price ?? 0,
    };

    const { formValues, onChangeHandler, updateInitialValue } = useForm(initialValue);

    useEffect(() => {
        updateInitialValue(initialValue);
        setImage(foodAndBeverage?.image ?? null);
    }, [foodAndBeverage]);

    const { createFoodAndBeverageHandler } = useCreateFoodAndBeverage(stateSetter);
    const { editFoodAndBeverageHandler } = useEditFoodAndBeverage(stateSetter);
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>(foodAndBeverage?.image ?? null);

    const dispatch = useDispatch();
    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{foodAndBeverage ? foodAndBeverage.name : "Add Food Or Beverage"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext5">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="name" value={formValues.name} onChange={(e) => onChangeHandler(e)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext5">
                        <Form.Label column sm="2">
                            Description
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="description" value={formValues.description} onChange={(e) => onChangeHandler(e)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext5">
                        <Form.Label column sm="2">
                            Price
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="number" name="price" value={formValues.price} onChange={(e) => onChangeHandler(e)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formFile" className="mb-3">
                        <Form.Label column sm="2">
                            Image
                        </Form.Label>
                        <Col sm="10" className="d-flex">
                            {image && (
                                <>
                                    <Image width={"15%"} src={image} alt="poster" />
                                    <Button onClick={() => setImage(null)}>X</Button>
                                </>
                            )}
                            {!image && (
                                <Form.Control
                                    type="file"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : null)}
                                />
                            )}
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    onClick={() => {
                        if (setFoodAndBeverage) setFoodAndBeverage(null);
                        dispatch(hideAddFoodAndBeverageModal());
                    }}
                >
                    Close
                </Button>
                <Button
                    type="button"
                    onClick={async () => {
                        if (!foodAndBeverage) {
                            if (file) {
                                await createFoodAndBeverageHandler({ ...formValues, image: file ?? image });
                            }
                        } else if (file || image) {
                            await editFoodAndBeverageHandler({ ...formValues, image: image ?? (file as File) }, foodAndBeverage._id);
                        }
                        dispatch(hideAddFoodAndBeverageModal());
                    }}
                >
                    {foodAndBeverage ? "Edit" : "Add"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
