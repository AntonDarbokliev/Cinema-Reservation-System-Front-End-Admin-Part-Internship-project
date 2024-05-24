import { Col } from "react-bootstrap";
import { Seat as SeatInterface, SeatType } from "../../../HallsList/interfaces/hallInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import styles from "./Seat.module.scss";

interface Props {
    seat: SeatInterface;
    rowIndex: number;
    onClickHandler: (seat: SeatInterface, rowIndex: number) => void;
    editMode: boolean;
    seatNumber: number;
}

export const Seat: React.FC<Props> = ({ seat, onClickHandler, rowIndex, editMode, seatNumber }) => {
    return (
        <>
            {seat.type != SeatType.SEAT_BLANK && (
                <Col key={seat._id} className={styles["col"]} onClick={() => onClickHandler(seat, rowIndex)}>
                    <FontAwesomeIcon className={styles["chair-icon"]} icon={faChair} />
                    {!editMode && (
                        <>
                            <p className={styles["seat-text"]}>
                                {seatNumber} - {seat.type}
                            </p>
                        </>
                    )}
                </Col>
            )}

            {seat.type === SeatType.SEAT_BLANK && editMode && (
                <Col className={styles["col"]} onClick={() => onClickHandler(seat, rowIndex)} key={seat._id} style={{ border: "none", background: "#cccc" }} />
            )}

            {seat.type === SeatType.SEAT_BLANK && !editMode && <Col className={styles["col"]} key={seat._id} style={{ border: "none" }} />}
        </>
    );
};
