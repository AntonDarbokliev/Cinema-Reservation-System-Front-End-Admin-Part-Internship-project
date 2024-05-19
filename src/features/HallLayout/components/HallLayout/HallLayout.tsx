import { Container } from "react-bootstrap";
import { useHall } from "../../hooks/useHall";
import { useState } from "react";
import Button from "../../../common/components/Button/Button";
import { SeatType, Row } from "../../../HallsList/interfaces/hallInterface";
import { AddRowModal } from "../AddRowModal/AddRowModal";
import { useEditHall } from "../../hooks/useEditHall";
import styles from "./HallLayout.module.scss";
import { SeatTypeSelect } from "../SeatTypeSelect/SeatTypeSelect";
import { useHallRowsCopy } from "../../hooks/useHallRowsCopy";
import { Rows } from "../Rows/Rows";
import { DeleteRowModal } from "../DeleteRowModal/DeleteRowModal";

export const HallLayout = () => {
    const { hall } = useHall();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [addSeatType, setAddSeatType] = useState<SeatType>(SeatType.SEAT_COMMON);
    const [addRowModal, setAddRowModal] = useState(false);
    const [deleteRowModal, setDeleteRowModal] = useState<{ show: boolean; row: Row }>({ show: false, row: { _id: "", seats: [] } });
    const { rows, setRows } = useHallRowsCopy(hall);

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
            <AddRowModal rowsSetter={setRows} rows={rows} show={addRowModal} modalSetter={setAddRowModal} />
            <DeleteRowModal rowsSetter={setRows} modalSetter={setDeleteRowModal} show={deleteRowModal.show} row={deleteRowModal.row} />
            <Container>
                <Rows deleteModalSetter={setDeleteRowModal} addSeatType={addSeatType} editMode={editMode} rows={rows} setRows={setRows}></Rows>
            </Container>
            <div className={styles["util-btn-group"]}>
                {editMode && <SeatTypeSelect seatTypeSetter={setAddSeatType}></SeatTypeSelect>}
                <Button onClick={saveOrEditClickHandler}>{editMode ? "Save" : "Edit Mode"}</Button>
                <Button onClick={() => setAddRowModal(true)}>Add Row</Button>
            </div>
        </>
    );
};
