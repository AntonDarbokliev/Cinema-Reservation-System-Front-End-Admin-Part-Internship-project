import { Button, Row as RowComponent } from "react-bootstrap";
import { Row, Seat as SeatInterface, SeatTypeName } from "../../../HallsList/interfaces/hallInterface";
import { Seat } from "../Seat/Seat";
import styles from "./Rows.module.scss";
import { SeatStatus } from "../../interfaces/SeatStatus";
import { SelectedSeat } from "../../interfaces/SelectedSeat";
import { SeatType } from "../../../HallsList/interfaces/SeatType";
import { ReservationStatus } from "../../interfaces/ReservationStatus";
import { IRootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { Projection } from "../../../MovieDetails/interfaces/Projection";

interface Props {
    rows: Row[];
    setRows: React.Dispatch<React.SetStateAction<Row[]>>;
    deleteModalSetter: React.Dispatch<
        React.SetStateAction<{
            show: boolean;
            row: Row;
        }>
    >;
    editMode: boolean;
    addSeatType: SeatType | undefined;
    setSelectedSeat?: React.Dispatch<React.SetStateAction<SelectedSeat | null>>;
    selectedSeat?: SelectedSeat | null;
    blankSeatType: SeatType;
    projection?: Projection;
}

export const Rows: React.FC<Props> = ({
    rows,
    editMode,
    addSeatType,
    blankSeatType,
    setRows,
    deleteModalSetter,
    setSelectedSeat,
    selectedSeat,
    projection,
}) => {
    const socketSelectedSeats = useSelector((state: IRootState) => state.socket.seats);
    const socketReservations = useSelector((state: IRootState) => state.socket.reservations);
    const socketTickets = useSelector((state: IRootState) => state.socket.tickets);

    const checkIfSeatIsReserved = (seat: SeatInterface, checkInSocket?: boolean) => {
        if (!projection) return false;

        if (checkInSocket) {
            return socketReservations.some(
                (reservation) =>
                    reservation.seat === seat._id && reservation.projection === projection._id && reservation.status === ReservationStatus.ACTIVE
            );
        }

        return projection.reservations.some((reservation) => reservation.seat === seat._id && reservation.status === ReservationStatus.ACTIVE);
    };

    const seatOnClickHandler = (seat: SeatInterface, rowIndex: number, seatNumber: number) => {
        if (projection && socketSelectedSeats.some((scoketSeat) => scoketSeat._id === seat._id && scoketSeat.projectionId === projection._id)) {
            return;
        } else if (projection && setSelectedSeat) {
            if (projection.tickets.some((ticket) => ticket.seat === seat._id)) {
                setSelectedSeat({ seat, seatRow: rowIndex + 1, seatNumber, bought: true });
            } else if (checkIfSeatIsReserved(seat) || checkIfSeatIsReserved(seat, true)) {
                setSelectedSeat({ seat, seatRow: rowIndex + 1, seatNumber, reserved: true });
            } else {
                setSelectedSeat({ seat, seatRow: rowIndex + 1, seatNumber });
            }
        } else if (editMode) {
            if (seat.type.name === SeatTypeName.SEAT_BLANK && addSeatType) {
                seat.type = addSeatType;
            } else {
                seat.type = blankSeatType;
            }
            const rowsCopy = [...rows];
            const seatsCopy = rowsCopy[rowIndex].seats;
            const seatIndex = seatsCopy.findIndex((currentSeat) => currentSeat._id === seat._id);
            seatsCopy[seatIndex] = seat;
            rowsCopy[rowIndex].seats = seatsCopy;
            setRows(rowsCopy);
        }
    };

    let currentSeatNumber: number;
    return (
        <>
            {rows.map((row, rowIndex) => {
                currentSeatNumber = 0;
                let seatStatus: SeatStatus | null;
                return (
                    <RowComponent className={`${styles["row"]} ${editMode ? styles["row-edit"] : ""}`} key={row._id}>
                        {editMode && (
                            <Button onClick={() => deleteModalSetter({ show: true, row })} className={styles["delete-btn"]} variant="danger">
                                x
                            </Button>
                        )}
                        {row.seats.map((seat) => {
                            seatStatus = null;

                            if (projection) {
                                if (
                                    socketSelectedSeats.some(
                                        (socketSeat) => socketSeat._id === seat._id && projection._id === socketSeat.projectionId
                                    )
                                ) {
                                    seatStatus = SeatStatus.SEAT_BlOCKED;
                                } else if (
                                    projection.tickets?.some((ticket) => ticket.seat === seat._id) ||
                                    socketTickets.some((ticket) => ticket.seat === seat._id)
                                ) {
                                    seatStatus = SeatStatus.SEAT_TAKEN;
                                } else if (checkIfSeatIsReserved(seat) || checkIfSeatIsReserved(seat, true)) {
                                    seatStatus = SeatStatus.SEAT_RESERVERED;
                                } else if (selectedSeat?.seat._id === seat._id) {
                                    seatStatus = SeatStatus.SEAT_SELECTED;
                                } else {
                                    seatStatus = SeatStatus.SEAT_FREE;
                                }
                            }

                            if (seat.type.name !== blankSeatType.name) {
                                currentSeatNumber++;
                            }

                            return (
                                <Seat
                                    blankSeatType={blankSeatType}
                                    editMode={editMode}
                                    onClickHandler={seatOnClickHandler}
                                    rowIndex={rowIndex}
                                    seat={seat}
                                    seatNumber={currentSeatNumber}
                                    key={seat._id}
                                    seatStatus={seatStatus}
                                    isSelected={selectedSeat?.seat._id === seat._id}
                                />
                            );
                        })}
                    </RowComponent>
                );
            })}
        </>
    );
};
