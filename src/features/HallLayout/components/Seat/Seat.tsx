import { Col } from "react-bootstrap";
import { Seat as SeatInterface } from "../../../HallsList/interfaces/hallInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import styles from "./Seat.module.scss";
import { SeatStatus } from "../../interfaces/SeatStatus";
import { useEffect, useState } from "react";
import { SeatType } from "../../../HallsList/interfaces/SeatType";

interface Props {
    seat: SeatInterface;
    rowIndex: number;
    onClickHandler: (seat: SeatInterface, rowIndex: number, seatNumber: number) => void;
    editMode: boolean;
    seatNumber: number;
    seatStatus?: SeatStatus | null;
    isSelected: boolean;
    blankSeatType: SeatType;
}

export const Seat: React.FC<Props> = ({ seat, onClickHandler, rowIndex, editMode, seatNumber, seatStatus, isSelected, blankSeatType }) => {
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
            {seat.type.name != blankSeatType.name && (
                <Col key={seat._id} className={styles["col"]} onClick={() => onClickHandler(seat, rowIndex, seatNumber)}>
                    <FontAwesomeIcon color={color} className={styles["chair-icon"]} icon={faChair} />
                    {!editMode && (
                        <>
                            <p className={styles["seat-text"]}>
                                {seatNumber} - {seat.type.name}
                            </p>
                        </>
                    )}
                </Col>
            )}

            {seat.type.name === blankSeatType.name && editMode && (
                <Col
                    className={styles["col"]}
                    onClick={() => onClickHandler(seat, rowIndex, seatNumber)}
                    key={seat._id}
                    style={{ border: "none", background: "#cccc" }}
                />
            )}

            {seat.type.name === blankSeatType.name && !editMode && <Col className={styles["col"]} key={seat._id} style={{ border: "none" }} />}
        </>
    );
};
