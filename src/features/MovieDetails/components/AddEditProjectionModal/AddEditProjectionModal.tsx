import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "../../../common/components/Button/Button";
import { useProjectionTypes } from "../../../ProjectionDetails/hooks/useProjectionTypes";
import { useHalls } from "../../../HallsList/hooks/useHalls";
import { useParams } from "react-router-dom";
import { useForm } from "../../../common/hooks/useForm";
import { useCreateProjection } from "../../../ProjectionDetails/hooks/useCreateProjection";
import { Projection, ProjectionType } from "../../interfaces/Projection";
import { useEditProjection } from "../../../ProjectionDetails/hooks/useEditProjection";
import { useEffect } from "react";
import { useMovie } from "../../hooks/useMovie";
import { Movie } from "../../../MoviesList/interfaces/Movie";

interface Props {
    show: boolean;
    showAddProjectionModal: React.Dispatch<React.SetStateAction<boolean>>;
    projection?: Projection;
    setProjection?: React.Dispatch<React.SetStateAction<Projection>>;
    setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
}

export const AddEditProjectionModal: React.FC<Props> = ({ show, showAddProjectionModal, setMovie, projection, setProjection }) => {
    const { projectionTypes } = useProjectionTypes();
    const { halls } = useHalls();
    const cinemaId = useParams().id;
    const movieId = useParams().movieId;

    const { movie } = useMovie();

    const initialValue = {
        startDate: projection?.startDate.split("T")[0] ?? "",
        startTime: projection?.startTime ?? "",
        projectionType: projection?.projectionType ?? ProjectionType.PROJECTION_2D,
        hall: projection?.hall._id ?? "",
        baseTicketPrice: String(projection?.baseTicketPrice) ?? "",
        movieId: movieId ?? "",
        movieLength: movie?.length ?? 0,
        cinemaId: cinemaId ?? "",
    };

    const { formValues, onChangeHandler, updateInitialValue } = useForm(initialValue);
    const { createProjectionHandler } = useCreateProjection();
    const { editProjectionHandler } = useEditProjection();

    useEffect(() => {
        updateInitialValue(initialValue);
    }, [projection]);

    const createProjectionOnClick = async () => {
        // updateInitialValue() for some reason isn't updating the movieLength
        formValues.movieLength = Number(movie?.length);

        const projection = await createProjectionHandler(formValues);
        setMovie((state) => (state ? { ...state, projections: [...state.projections, projection] } : undefined));
        showAddProjectionModal(false);
    };

    const editProjectionOnClick = async () => {
        if (setProjection) {
            const projection = await editProjectionHandler({
                baseTicketPrice: formValues.baseTicketPrice,
                projectionType: formValues.projectionType,
                startDate: formValues.startDate,
                startTime: formValues.startTime,
            });
            setProjection(projection);
            showAddProjectionModal(false);
        }
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
                        <option key={hall._id} value={hall._id}>
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
                {!projection && <Button onClick={createProjectionOnClick}>Add projeciton</Button>}
                {projection && <Button onClick={editProjectionOnClick}>Edit</Button>}
            </Modal.Footer>
        </Modal>
    );
};
