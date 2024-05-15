import { Col, Row as RowComponent } from "react-bootstrap";
import { Row, Seat, SeatType } from "../../../HallsList/interfaces/hallInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import styles from "./Rows.module.scss";

interface Props {
    rows: Row[];
    setRows: React.Dispatch<React.SetStateAction<Row[]>>;
    editMode: boolean;
    addSeatType: SeatType;
}

export const Rows: React.FC<Props> = ({ rows, editMode, addSeatType, setRows }) => {
    const seatOnClickHandler = (seat: Seat, rowIndex: number) => {
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

                                return (
                                    <Col key={seat._id} className={styles["col"]} onClick={() => seatOnClickHandler(seat, rowIndex)}>
                                        <FontAwesomeIcon className={styles["chair-icon"]} icon={faChair} />
                                        {!editMode && (
                                            <>
                                                <p className={styles["seat-text"]}>
                                                    {currentSeatNumber} - {seat.type}
                                                </p>
                                            </>
                                        )}
                                    </Col>
                                );
                            } else {
                                if (editMode) {
                                    return (
                                        <Col
                                            onClick={() => seatOnClickHandler(seat, rowIndex)}
                                            key={seat._id}
                                            style={{ border: "none", background: "#cccc" }}
                                        />
                                    );
                                }
                                return <Col key={seat._id} style={{ border: "none" }} />;
                            }
                        })}
                    </RowComponent>
                );
            })}
        </>
    );
};
