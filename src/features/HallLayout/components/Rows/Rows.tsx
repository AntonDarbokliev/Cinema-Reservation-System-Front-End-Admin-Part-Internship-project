import { Row as RowComponent } from "react-bootstrap";
import { Row, Seat as SeatInterface, SeatType } from "../../../HallsList/interfaces/hallInterface";
import { Seat } from "../Seat/Seat";

interface Props {
    rows: Row[];
    setRows: React.Dispatch<React.SetStateAction<Row[]>>;
    editMode: boolean;
    addSeatType: SeatType;
}

export const Rows: React.FC<Props> = ({ rows, editMode, addSeatType, setRows }) => {
    const seatOnClickHandler = (seat: SeatInterface, rowIndex: number) => {
        if (editMode) {
            if (seat.type == SeatType.SEAT_BLANK) {
                seat.type = addSeatType;
            } else {
                seat.type = SeatType.SEAT_BLANK;
            }
            const rowsCopy = [...rows];
            const seatsCopy = rowsCopy[rowIndex].seats;
            const seatIndex = seatsCopy.findIndex((currentSeat) => currentSeat._id == seat._id);
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
                return (
                    <RowComponent key={row._id}>
                        {row.seats.map((seat) => {
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
                                />
                            );
                        })}
                    </RowComponent>
                );
            })}
        </>
    );
};
