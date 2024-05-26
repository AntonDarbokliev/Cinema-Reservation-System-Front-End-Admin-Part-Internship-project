import { Col } from "react-bootstrap";
import { Seat as SeatInterface, SeatType } from "../../../HallsList/interfaces/hallInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import styles from "./Seat.module.scss";
import { SeatStatus } from "../../interfaces/SeatStatus";
import { useEffect, useState } from "react";

interface Props {
    seat: SeatInterface;
    rowIndex: number;
    onClickHandler: (seat: SeatInterface, rowIndex: number, seatNumber: number) => void;
    editMode: boolean;
    seatNumber: number;
    seatStatus?: SeatStatus | null;
    isSelected: boolean;
}

export const Seat: React.FC<Props> = ({ seat, onClickHandler, rowIndex, editMode, seatNumber, seatStatus, isSelected }) => {
    const [color, setColor] = useState("#5e829f");
    useEffect(() => {
        console.log("loading seat");

        if (isSelected) {
            setColor("#5e829f");
        } else if (seatStatus === SeatStatus.SEAT_TAKEN) {
            setColor("red");
        } else if (seatStatus === SeatStatus.SEAT_RESERVERED) {
            setColor("yellow");
        } else if (seatStatus === SeatStatus.SEAT_FREE) {
            setColor("green");
        }
    }, [isSelected]);
    return (
        <>
            {seat.type != SeatType.SEAT_BLANK && (
                <Col key={seat._id} className={styles["col"]} onClick={() => onClickHandler(seat, rowIndex, seatNumber)}>
                    <FontAwesomeIcon color={color} className={styles["chair-icon"]} icon={faChair} />
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
                <Col
                    className={styles["col"]}
                    onClick={() => onClickHandler(seat, rowIndex, seatNumber)}
                    key={seat._id}
                    style={{ border: "none", background: "#cccc" }}
                />
            )}

            {seat.type === SeatType.SEAT_BLANK && !editMode && <Col className={styles["col"]} key={seat._id} style={{ border: "none" }} />}
        </>
    );
};
