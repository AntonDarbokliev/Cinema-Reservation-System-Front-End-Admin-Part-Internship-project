import { Container } from "react-bootstrap";
import { useHall } from "../../hooks/useHall";
import { useState } from "react";
import Button from "../../../common/components/Button/Button";
import { SeatType, Row, Hall } from "../../../HallsList/interfaces/hallInterface";
import { AddRowModal } from "../AddRowModal/AddRowModal";
import { useEditHall } from "../../hooks/useEditHall";
import styles from "./HallLayout.module.scss";
import { SeatTypeSelect } from "../SeatTypeSelect/SeatTypeSelect";
import { useHallRowsCopy } from "../../hooks/useHallRowsCopy";
import { Rows } from "../Rows/Rows";
import { DeleteRowModal } from "../DeleteRowModal/DeleteRowModal";
import { ReserveSeatModal } from "../ReserveSeatModal/ReserveSeatModal";
import { Projection } from "../../../MovieDetails/interfaces/Projection";
import { SelectedSeat } from "../../interfaces/SelectedSeat";

interface Props {
    reserveMode?: boolean;
    projection?: Projection;
    setProjection?: React.Dispatch<React.SetStateAction<Projection>>;
}

export const HallLayout: React.FC<Props> = ({ reserveMode, projection, setProjection }) => {
    let hallToUse: Hall;
    const hallObj = useHall();
    hallToUse = hallObj.hall;
    if (projection) {
        hallToUse = projection?.hall;
    }
    const [editMode, setEditMode] = useState<boolean>(false);
    const [addSeatType, setAddSeatType] = useState<SeatType>(SeatType.SEAT_COMMON);
    const [addRowModal, setAddRowModal] = useState(false);
    const [showReserveModal, setShowReserveModal] = useState(false);
    const [deleteRowModal, setDeleteRowModal] = useState<{ show: boolean; row: Row }>({ show: false, row: { _id: "", seats: [] } });
    const { rows, setRows } = useHallRowsCopy(hallToUse);
    const [selectedSeatForReservation, setSelectedSeatForReservation] = useState<SelectedSeat | null>(null);

    const { editHallHandler } = useEditHall();

    const saveOrEditClickHandler = async () => {
        if (editMode) {
            await editHallHandler(rows);
        }
        setEditMode(!editMode);
    };

    return (
        <>
            <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>Screen</h1>
            <AddRowModal rowsSetter={setRows} rows={rows} show={addRowModal} openModalSetter={setAddRowModal} />
            <DeleteRowModal rowsSetter={setRows} modalSetter={setDeleteRowModal} show={deleteRowModal.show} row={deleteRowModal.row} />
            <ReserveSeatModal
                selectedReserveSeat={selectedSeatForReservation!}
                setShowReserveModal={setShowReserveModal}
                showReserveModal={showReserveModal}
                projection={projection!}
                projectionSetter={setProjection!}
                setSelectedSeat={setSelectedSeatForReservation}
            />
            <Container>
                <Rows
                    reservations={projection?.reservations}
                    deleteModalSetter={setDeleteRowModal}
                    addSeatType={addSeatType}
                    editMode={editMode}
                    rows={rows}
                    setRows={setRows}
                    reserveMode={reserveMode}
                    selectedReserveSeat={selectedSeatForReservation}
                    setSelectedReserveSeat={setSelectedSeatForReservation}
                ></Rows>
            </Container>
            <div className={styles["util-btn-group"]}>
                {!reserveMode && (
                    <>
                        {editMode && <SeatTypeSelect seatTypeSetter={setAddSeatType}></SeatTypeSelect>}
                        <Button onClick={saveOrEditClickHandler}>{editMode ? "Save" : "Edit Mode"}</Button>
                        <Button onClick={() => setAddRowModal(true)}>Add Row</Button>
                    </>
                )}
                {reserveMode && selectedSeatForReservation && <Button onClick={() => setShowReserveModal(true)}>Reserve</Button>}
            </div>
        </>
    );
};
