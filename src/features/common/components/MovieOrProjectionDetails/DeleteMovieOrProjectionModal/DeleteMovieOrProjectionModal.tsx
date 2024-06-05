import { Modal } from "react-bootstrap";
import Button from "../../Button/Button";
import { Movie } from "../../../../MoviesList/interfaces/Movie";
import { Projection } from "../../../../MovieDetails/interfaces/Projection";
import { useDeleteMovie } from "../../../../MovieDetails/hooks/useDeleteMovie";
import { useDeleteProjectoin } from "../../../../ProjectionDetails/hooks/useDeleteProjection";

interface Props {
    show: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    movie?: Movie;
    projection?: Projection;
}

export const DeleteMovieOrProjectionModal: React.FC<Props> = ({ show, setShowModal, movie, projection }) => {
    const { deleteMovieHandler } = useDeleteMovie();
    const { deleteProjectionHandler } = useDeleteProjectoin(movie?._id);
    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                {projection && <Modal.Title id="contained-modal-title-vcenter">Delete Projection?</Modal.Title>}
                {!projection && movie && <Modal.Title id="contained-modal-title-vcenter">Delete Movie - {movie.name}?</Modal.Title>}
            </Modal.Header>

            <Modal.Footer>
                <Button
                    onClick={async () => {
                        if (projection) {
                            await deleteProjectionHandler(projection._id);
                        } else if (movie) {
                            await deleteMovieHandler(movie._id);
                        }
                        setShowModal(false);
                    }}
                >
                    Delete
                </Button>
                <Button onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
