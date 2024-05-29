import { Modal, Table } from "react-bootstrap";
import Button from "../../../common/components/Button/Button";
import { Projection } from "../../../MovieDetails/interfaces/Projection";
import { useReserveSeat } from "../../hooks/useReserveSeat";
import { SelectedSeat } from "../../interfaces/SelectedSeat";

interface Props {
    showReserveModal: boolean;
    setShowReserveModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedSeat: SelectedSeat;
    projection: Projection;
    projectionSetter: React.Dispatch<React.SetStateAction<Projection>>;
    setSelectedSeat: React.Dispatch<React.SetStateAction<SelectedSeat | null>>;
}

export const ReserveSeatModal: React.FC<Props> = ({
    showReserveModal,
    setShowReserveModal,
    projection,
    selectedSeat,
    projectionSetter,
    setSelectedSeat,
}) => {
    const { reserveSeatHandler } = useReserveSeat();

    const onReserveClickHandler = async () => {
        const reservation = await reserveSeatHandler({
            projection: projection._id,
            seat: selectedSeat.seat._id,
            seatRow: selectedSeat.seatRow,
            seatNumber: selectedSeat.seatNumber,
        });
        projectionSetter((state) => {
            return { ...state, reservations: [...state.reservations, reservation] };
        });
        setShowReserveModal(false);
        setSelectedSeat(null);
    };
    return (
        <>
            {/* Check is needed since booststrap always renders the modal but hides it. Otherwise modal couldn't even be opened without selecting
            a seat. */}
            {selectedSeat && (
                <Modal show={showReserveModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>Reserve Seat</h1>
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>Movie: </td>
                                    <td>{projection.movie.name}</td>
                                </tr>
                                <tr>
                                    <td>Seat Type: </td>
                                    <td>{selectedSeat.seat.type.name}</td>
                                </tr>
                                <tr>
                                    <td>Projection Start: </td>
                                    <td>
                                        {projection.startDate}/{projection.startTime}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Projection Type: </td>
                                    <td>{projection.projectionType}</td>
                                </tr>
                                <tr>
                                    <td>Row: </td>
                                    <td>{selectedSeat.seatRow}</td>
                                </tr>
                                <tr>
                                    <td>Seat: </td>
                                    <td>{selectedSeat.seatNumber}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setShowReserveModal(false)}>Close</Button>
                        <Button onClick={onReserveClickHandler}>Reserve</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};
