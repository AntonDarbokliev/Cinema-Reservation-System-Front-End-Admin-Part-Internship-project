import { Container } from "react-bootstrap";
import { useHall } from "../../hooks/useHall";
import { useState } from "react";
import Button from "../../../common/components/Button/Button";
import { Row, Hall } from "../../../HallsList/interfaces/hallInterface";
import { AddRowModal } from "../AddRowModal/AddRowModal";
import { useEditHall } from "../../hooks/useEditHall";
import styles from "./HallLayout.module.scss";
import { SeatTypeSelect } from "../SeatTypeSelect/SeatTypeSelect";
import { useHallRowsCopy } from "../../hooks/useHallRowsCopy";
import { Rows } from "../Rows/Rows";
import { DeleteRowModal } from "../DeleteRowModal/DeleteRowModal";
import { ReserveSeatModal } from "../ReserveSeatModal/ReserveSeatModal";
import { Projection } from "../../../MovieDetails/interfaces/Projection";
import { BuyTicketModal } from "../BuyTicketModal/BuyTicketModal";
import { SeatType } from "../../../HallsList/interfaces/SeatType";
import { useSeatTypes } from "../../hooks/useSeatTypes";
import { SelectedSeat } from "../../interfaces/SelectedSeat";
import { ReservationStatus } from "../../interfaces/ReservationStatus";

interface Props {
    projectionMode?: boolean;
    projection?: Projection;
    setProjection?: React.Dispatch<React.SetStateAction<Projection>>;
}

export const HallLayout: React.FC<Props> = ({ projectionMode, projection, setProjection }) => {
    let hallToUse: Hall;
    const hallObj = useHall();
    hallToUse = hallObj.hall;
    if (projection) {
        hallToUse = projection?.hall;
    }

    const { seatTypes } = useSeatTypes();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [addSeatType, setAddSeatType] = useState<SeatType | undefined>(undefined);
    const [addRowModal, setAddRowModal] = useState(false);
    const [showReserveModal, setShowReserveModal] = useState(false);
    const [showBuyTicketModal, setShowBuyTicketModal] = useState(false);
    const [deleteRowModal, setDeleteRowModal] = useState<{ show: boolean; row: Row }>({ show: false, row: { _id: "", seats: [] } });
    const { rows, setRows } = useHallRowsCopy(hallToUse);
    const [selectedSeat, setSelectedSeat] = useState<SelectedSeat | null>(null);

    const { editHallHandler } = useEditHall();

    const saveOrEditClickHandler = async () => {
        if (editMode) {
            await editHallHandler(rows);
        }
        setEditMode(!editMode);
    };

    if (seatTypes && seatTypes.length > 0) {
        return (
            <>
                <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>Screen</h1>
                <AddRowModal blankSeatType={seatTypes[0]} rowsSetter={setRows} rows={rows} show={addRowModal} openModalSetter={setAddRowModal} />
                <DeleteRowModal rowsSetter={setRows} modalSetter={setDeleteRowModal} show={deleteRowModal.show} row={deleteRowModal.row} />
                {projectionMode && (
                    <>
                        <ReserveSeatModal
                            selectedSeat={selectedSeat!}
                            setShowReserveModal={setShowReserveModal}
                            showReserveModal={showReserveModal}
                            projection={projection!}
                            projectionSetter={setProjection!}
                            setSelectedSeat={setSelectedSeat}
                            cancelReservationId={
                                projection?.reservations.find(
                                    (reservation) =>
                                        reservation.seat === selectedSeat?.seat._id && reservation.status === ReservationStatus.ACTIVE
                                )?._id
                            }
                        />
                        <BuyTicketModal
                            setProjection={setProjection!}
                            reservation={projection?.reservations.find(
                                (reservation) => reservation.seat === selectedSeat?.seat._id && reservation.status === ReservationStatus.ACTIVE
                            )}
                            selectedSeat={selectedSeat!}
                            setShowBuyTicketModal={setShowBuyTicketModal}
                            showBuyTicketModal={showBuyTicketModal}
                            projection={projection!}
                            setSelectedSeat={setSelectedSeat}
                        />
                    </>
                )}
                <Container>
                    <Rows
                        tickets={projection?.tickets}
                        blankSeatType={seatTypes[0]}
                        reservations={projection?.reservations}
                        deleteModalSetter={setDeleteRowModal}
                        addSeatType={addSeatType}
                        editMode={editMode}
                        rows={rows}
                        setRows={setRows}
                        projectionMode={projectionMode}
                        selectedSeat={selectedSeat}
                        setSelectedSeat={setSelectedSeat}
                    />
                </Container>
                <div className={styles["util-btn-group"]}>
                    {!projectionMode && (
                        <>
                            {editMode && <SeatTypeSelect seatTypes={seatTypes} seatTypeSetter={setAddSeatType}></SeatTypeSelect>}
                            <Button onClick={saveOrEditClickHandler}>{editMode ? "Save" : "Edit Mode"}</Button>
                            <Button onClick={() => setAddRowModal(true)}>Add Row</Button>
                        </>
                    )}
                    {projectionMode && !selectedSeat?.reserved && (
                        <>
                            <Button onClick={() => setShowReserveModal(true)}>Reserve</Button>
                        </>
                    )}
                    {projectionMode && selectedSeat?.reserved && (
                        <>
                            <Button onClick={() => setShowReserveModal(true)}>Cancel Reservation</Button>
                        </>
                    )}
                    {projectionMode && (
                        <>
                            <Button onClick={() => setShowBuyTicketModal(true)}>Buy ticket</Button>
                        </>
                    )}
                </div>
            </>
        );
    }
};
