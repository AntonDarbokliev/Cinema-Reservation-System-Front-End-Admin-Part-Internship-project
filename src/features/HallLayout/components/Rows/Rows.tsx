import { Button, Row as RowComponent } from "react-bootstrap";
import { Row, Seat as SeatInterface, SeatTypeName } from "../../../HallsList/interfaces/hallInterface";
import { Seat } from "../Seat/Seat";
import styles from "./Rows.module.scss";
import { Reservation } from "../../../MovieDetails/interfaces/Reservation";
import { SeatStatus } from "../../interfaces/SeatStatus";
import { SelectedSeat } from "../../interfaces/SelectedSeat";
import { SeatType } from "../../../HallsList/interfaces/SeatType";
import { Ticket } from "../../interfaces/Ticket";

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
    projectionMode?: boolean;
    reservations?: Reservation[];
    setSelectedSeat?: React.Dispatch<React.SetStateAction<SelectedSeat | null>>;
    selectedSeat?: SelectedSeat | null;
    blankSeatType: SeatType;
    tickets?: Ticket[];
}

export const Rows: React.FC<Props> = ({
    rows,
    editMode,
    addSeatType,
    blankSeatType,
    setRows,
    deleteModalSetter,
    projectionMode,
    reservations,
    setSelectedSeat,
    selectedSeat,
    tickets,
}) => {
    const seatOnClickHandler = (seat: SeatInterface, rowIndex: number, seatNumber: number) => {
        if (projectionMode && reservations && setSelectedSeat) {
            if (reservations.some((reservation) => reservation.seat === seat._id)) {
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

                            if (projectionMode) {
                                if (tickets?.some((ticket) => ticket.seat === seat._id)) {
                                    seatStatus = SeatStatus.SEAT_TAKEN;
                                } else if (reservations?.some((reservation) => reservation.seat === seat._id)) {
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
