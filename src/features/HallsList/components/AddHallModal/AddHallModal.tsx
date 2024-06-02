import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "../../../common/components/Button/Button";
import { useDispatch } from "react-redux";
import { useForm } from "../../../common/hooks/useForm";
import { Hall } from "../../interfaces/hallInterface";
import { useAddHall } from "../../hooks/useAddHall";
import { hideAddHallModal } from "../../../../store/addHallModal/addHallModalSlice";

interface Props {
    show: boolean;
    hallSetter: React.Dispatch<React.SetStateAction<Hall[]>>;
}

export const AddHallModal: React.FC<Props> = ({ show, hallSetter }) => {
    const dispatch = useDispatch();
    const { addHallHandler } = useAddHall(hallSetter);

    const { formValues, onChangeHandler } = useForm({
        name: "",
    });

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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={() => dispatch(hideAddHallModal())}>
                    Close
                </Button>
                <Button
                    type="button"
                    onClick={async () => {
                        await addHallHandler(formValues.name);
                        dispatch(hideAddHallModal());
                    }}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
