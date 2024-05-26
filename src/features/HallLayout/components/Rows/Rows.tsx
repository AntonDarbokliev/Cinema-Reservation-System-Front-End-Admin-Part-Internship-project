import { Button, Row as RowComponent } from "react-bootstrap";
import { Row, Seat as SeatInterface, SeatType } from "../../../HallsList/interfaces/hallInterface";
import { Seat } from "../Seat/Seat";
import styles from "./Rows.module.scss";
import { Reservation } from "../../../MovieDetails/interfaces/Reservation";
import { SeatStatus } from "../../interfaces/SeatStatus";
import { SelectedSeat } from "../../interfaces/SelectedSeat";

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
    addSeatType: SeatType;
    reserveMode?: boolean;
    reservations?: Reservation[];
    setSelectedReserveSeat?: React.Dispatch<React.SetStateAction<SelectedSeat | null>>;
    selectedReserveSeat?: SelectedSeat | null;
}

export const Rows: React.FC<Props> = ({
    rows,
    editMode,
    addSeatType,
    setRows,
    deleteModalSetter,
    reserveMode,
    reservations,
    setSelectedReserveSeat,
    selectedReserveSeat,
}) => {
    const seatOnClickHandler = (seat: SeatInterface, rowIndex: number, seatNumber: number) => {
        if (reserveMode && reservations && setSelectedReserveSeat) {
            if (!reservations.some((reservation) => reservation.seat === seat._id)) {
                setSelectedReserveSeat({ seat, seatRow: rowIndex + 1, seatNumber });
            }
        } else if (editMode) {
            if (seat.type === SeatType.SEAT_BLANK) {
                seat.type = addSeatType;
            } else {
                seat.type = SeatType.SEAT_BLANK;
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

                            if (reservations) {
                                if (reservations?.some((reservation) => reservation.seat === seat._id)) {
                                    seatStatus = SeatStatus.SEAT_RESERVERED;
                                } else if (selectedReserveSeat?.seat._id === seat._id) {
                                    seatStatus = SeatStatus.SEAT_SELECTED;
                                } else {
                                    seatStatus = SeatStatus.SEAT_FREE;
                                }
                            }

                            if (seat.type != SeatType.SEAT_BLANK) {
                                currentSeatNumber++;
                            }

                            return (
                                <Seat
                                    editMode={editMode}
                                    onClickHandler={seatOnClickHandler}
                                    rowIndex={rowIndex}
                                    seat={seat}
                                    seatNumber={currentSeatNumber}
                                    key={seat._id}
                                    seatStatus={seatStatus}
                                    isSelected={selectedReserveSeat?.seat._id === seat._id}
                                />
                            );
                        })}
                    </RowComponent>
                );
            })}
        </>
    );
};
