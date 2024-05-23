import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "../../../common/components/Button/Button";
import { useForm } from "../../../common/hooks/useForm";
import { useDispatch } from "react-redux";
import { useCreateFoodAndBeverage } from "../../hooks/useCreateFoodAndBeverage";
import { useState } from "react";
import { hideAddFoodAndBeverageModal } from "../../../../store/addFoodBeverageModal/addFoodBeverageModalSlice";
import { FoodAndBeverage } from "../../interfaces/FoodAndBeverage";

interface Props {
    show: boolean;
    stateSetter?: React.Dispatch<React.SetStateAction<FoodAndBeverage[]>>;
}

export const AddFoodAndBeverageModal: React.FC<Props> = ({ show, stateSetter }) => {
    const { formValues, onChangeHandler } = useForm({ name: "", description: "", price: 0 });
    const { createFoodAndBeverageHandler } = useCreateFoodAndBeverage(stateSetter);
    const [file, setFile] = useState<File | null>(null);

    const dispatch = useDispatch();
    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
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
                        <Col sm="10">
                            <Form.Control
                                type="file"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : null)}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={() => dispatch(hideAddFoodAndBeverageModal())}>
                    Close
                </Button>
                <Button
                    type="button"
                    onClick={async () => {
                        if (file) {
                            await createFoodAndBeverageHandler({ ...formValues, image: file });
                            dispatch(hideAddFoodAndBeverageModal());
                        }
                    }}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
