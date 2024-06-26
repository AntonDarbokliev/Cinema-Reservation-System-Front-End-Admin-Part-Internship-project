import { Modal, Table } from "react-bootstrap";
import Button from "../../../common/components/Button/Button";
import { Projection } from "../../../MovieDetails/interfaces/Projection";
import { useReserveSeat } from "../../hooks/useReserveSeat";
import { SelectedSeat } from "../../interfaces/SelectedSeat";
import { IRootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { Role } from "../../../common/interfaces/Role";
import { CreateReservation } from "../../interfaces/CreateReservation";
import { useCancelReservation } from "../../hooks/useCancelReservation";
import { useManageSocketSeat } from "../../hooks/useManageSocketSeat";
import { CountdownTimer } from "../../../common/components/Countdown/Countdown";
import { useSelectionCountdownEnd } from "../../hooks/useSelectionCountdownEnd";
import { Movie } from "../../../MoviesList/interfaces/Movie";

interface Props {
    showReserveModal: boolean;
    setShowReserveModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedSeat: SelectedSeat | null;
    projection: Projection;
    projectionSetter: React.Dispatch<React.SetStateAction<Projection>>;
    setSelectedSeat: React.Dispatch<React.SetStateAction<SelectedSeat | null>>;
    cancelReservationId?: string;
    movie: Movie;
}

export const ReserveSeatModal: React.FC<Props> = ({
    showReserveModal,
    setShowReserveModal,
    projection,
    selectedSeat,
    projectionSetter,
    setSelectedSeat,
    cancelReservationId,
    movie,
}) => {
    const { reserveSeatHandler } = useReserveSeat();
    const { cancelReservationHandler } = useCancelReservation();

    useManageSocketSeat(selectedSeat, showReserveModal, projection._id);

    const user = useSelector((state: IRootState) => state.user);

    const onCancelClickHandler = async () => {
        await cancelReservationHandler(cancelReservationId!);
        setShowReserveModal(false);
        setSelectedSeat(null);
        projectionSetter((state) => {
            return { ...state, reservations: [...state.reservations.filter((r) => r._id !== cancelReservationId)] };
        });
    };

    const onReserveClickHandler = async () => {
        if (selectedSeat) {
            const reservationObj: CreateReservation = {
                projectionId: projection._id,
                seat: selectedSeat.seat._id,
                seatRow: selectedSeat.seatRow,
                seatNumber: selectedSeat.seatNumber,
                movieName: movie.name,
                moviePoster: movie.poster,
            };

            if (user.roles.every((role) => role > Role.ADMIN)) {
                reservationObj.user = user.id;
            }

            const reservation = await reserveSeatHandler(reservationObj);
            projectionSetter((state) => {
                return { ...state, reservations: [...state.reservations, reservation] };
            });
            setShowReserveModal(false);
            setSelectedSeat(null);
        }
    };

    const { selectionCountdownEndHandler } = useSelectionCountdownEnd(setShowReserveModal);
    return (
        <>
            {/* Check is needed since booststrap always renders the modal but hides it. Otherwise modal couldn't even be opened without selecting
            a seat. */}
            {selectedSeat && (
                <Modal show={showReserveModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <CountdownTimer initialMinutes={5} onTimerComplete={selectionCountdownEndHandler} />
                    </Modal.Header>
                    <Modal.Body>
                        <h1>Reserve Seat</h1>
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>Movie: </td>
                                    <td>{movie.name}</td>
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
                        {cancelReservationId && <Button onClick={onCancelClickHandler}>Cancel Reservation</Button>}
                        {!cancelReservationId && <Button onClick={onReserveClickHandler}>Reserve</Button>}
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};
