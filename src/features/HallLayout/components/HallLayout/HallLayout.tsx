import { Col, Container, Row } from "react-bootstrap";
import "./HallLayout.scss";
import { useHall } from "../../hooks/useHall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ButtonC from "../../../common/components/ButtonC/ButtonC";
import { Row as RowType, Seat, SeatType } from "../../../HallsList/interfaces/hallInterface";
import { AddRowModal } from "../AddRowModal/AddRowModal";
export const HallLayout = () => {
    const { hall } = useHall();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [addSeatType, setAddSeatType] = useState<SeatType>(SeatType.SEAT_COMMON);
    const [addRowModal, setAddRowModal] = useState(false);
    const [rows, setRows] = useState<RowType[]>([]);
    let currentSeatNumber = 0;
    // const rowsCopy = [...hall.seatsLayout];
    useEffect(() => {
        setRows([...hall.seatsLayout]);
    }, [hall.seatsLayout]);

    const seatOnClickHandler = (seat: Seat, rowIndex: number) => {
        if (editMode) {
            console.log(seat.type);
            if (seat.type == SeatType.SEAT_BLANK) {
                seat.type = addSeatType;
                // console.log("Clicked on blank seat");
                //TODO: Make it so clicking on a seat removes the seat or adds it on the place where the user has clicked
                // depending on the seat type selected (can be selected when edit mode is enabled)
                // also, instead of having a literal blank, add something so the user knows where he can place seats when in edit mode
                // also, add an add/remove row feature
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

    return (
        <>
            <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>Screen</h1>
            <AddRowModal rowsSetter={setRows} rows={rows} show={addRowModal} modalSetter={setAddRowModal} />
            <Container>
                {rows.map((row, rowIndex) => {
                    currentSeatNumber = 0;
                    return (
                        <Row key={row._id}>
                            {row.seats.map((seat) => {
                                if (seat.type != SeatType.SEAT_BLANK) {
                                    currentSeatNumber++;

                                    return (
                                        <Col key={seat._id} className="col-sm" onClick={() => seatOnClickHandler(seat, rowIndex)}>
                                            <FontAwesomeIcon className="chair-icon" icon={faChair} />
                                            {!editMode && (
                                                <>
                                                    <p>
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
                        </Row>
                    );
                })}
            </Container>
            <ButtonC onClick={() => setEditMode(!editMode)}>{editMode ? "Save" : "Edit Mode"}</ButtonC>
            <ButtonC onClick={() => setAddRowModal(true)}>Add Row</ButtonC>
        </>
    );
};
