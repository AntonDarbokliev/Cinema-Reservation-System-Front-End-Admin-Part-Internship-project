import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "../../../common/components/Button/Button";
import { hideAddCinemaModal } from "../../../../store/addCinemaModal/addCinemaModalSlice";
import { useDispatch } from "react-redux";
import { useForm } from "../../../common/hooks/useForm";
import { useAddCinema } from "../hooks/useAddCinema";
import { Cinema } from "../../interfaces/cinemaInterface";

interface Props {
    show: boolean;
    cinemaSetter: React.Dispatch<React.SetStateAction<Cinema[]>>;
}

export const AddCinemaModal: React.FC<Props> = ({ show, cinemaSetter }) => {
    const dispatch = useDispatch();
    const { createCinemaHandler } = useAddCinema(cinemaSetter);

    const { formValues, onChangeHandler } = useForm({
        address: "",
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

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext5">
                        <Form.Label column sm="2">
                            Address
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="address" value={formValues.address} onChange={(e) => onChangeHandler(e)} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={() => dispatch(hideAddCinemaModal())}>
                    Close
                </Button>
                <Button
                    type="button"
                    onClick={async () => {
                        await createCinemaHandler(formValues);
                        dispatch(hideAddCinemaModal());
                    }}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
