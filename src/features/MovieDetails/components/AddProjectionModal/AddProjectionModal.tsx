import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "../../../common/components/Button/Button";
import { useProjectionTypes } from "../../../ProjectionDetails/hooks/useProjectionTypes";
import { useHalls } from "../../../HallsList/hooks/useHalls";
import { useParams } from "react-router-dom";
import { useForm } from "../../../common/hooks/useForm";
import { useCreateProjection } from "../../../ProjectionDetails/hooks/useCreateProjection";
import { Projection, ProjectionType } from "../../interfaces/Projection";

interface Props {
    show: boolean;
    showAddProjectionModal: React.Dispatch<React.SetStateAction<boolean>>;
    setProjections: React.Dispatch<React.SetStateAction<Projection[]>>;
}

export const AddProjectionModal: React.FC<Props> = ({ show, showAddProjectionModal, setProjections }) => {
    const { projectionTypes } = useProjectionTypes();
    const { halls } = useHalls();
    const cinemaId = useParams().id;
    const movieId = useParams().movieId;
    const { formValues, onChangeHandler } = useForm({
        startDate: "",
        startTime: "",
        projectionType: ProjectionType.PROJECTION_2D,
        hall: "",
        baseTicketPrice: "",
        movie: movieId ?? "",
        cinema: cinemaId ?? "",
    });
    const { createProjectionHandler } = useCreateProjection();

    const createProjectionOnClick = async () => {
        const projection = await createProjectionHandler(formValues);
        setProjections((state) => [...state, projection]);
        showAddProjectionModal(false);
    };

    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Add a Projection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Projection Type</Form.Label>
                <Form.Select
                    onChange={onChangeHandler}
                    name="projectionType"
                    value={formValues.projectionType}
                    aria-label="Default select example"
                >
                    <option>Select projection type</option>
                    {projectionTypes.map((projectionType) => (
                        <option value={projectionType}>{projectionType}</option>
                    ))}
                </Form.Select>

                <Form.Label>Hall</Form.Label>
                <Form.Select name="hall" value={formValues.hall} onChange={onChangeHandler} aria-label="Default select example">
                    <option>Choose a Hall</option>
                    {halls.map((hall) => (
                        <option value={hall._id}>
                            {hall.name} - {hall.numberOfSeats} seats
                        </option>
                    ))}
                </Form.Select>
                <Form.Label>Date</Form.Label>
                <Form.Control value={formValues.startDate} onChange={onChangeHandler} name="startDate" type="date" />

                <Form.Label>Time</Form.Label>
                <Form.Control onChange={onChangeHandler} name="startTime" value={formValues.startTime} type="time" />

                <Form.Label>Base ticket price $ - common seat, no sides</Form.Label>
                <Form.Control onChange={onChangeHandler} name="baseTicketPrice" value={formValues.baseTicketPrice} type="number" />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => showAddProjectionModal(false)}>Close</Button>
                <Button onClick={createProjectionOnClick}>Add projeciton</Button>
            </Modal.Footer>
        </Modal>
    );
};
