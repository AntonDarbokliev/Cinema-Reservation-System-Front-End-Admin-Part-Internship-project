import { Container } from "react-bootstrap";
import { useHall } from "../../hooks/useHall";
import { useState } from "react";
import { Row, Hall } from "../../../HallsList/interfaces/hallInterface";
import { AddRowModal } from "../AddRowModal/AddRowModal";
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
import { useSocketConnection } from "../../../common/hooks/useSocketConnection";
import { useMovie } from "../../../MovieDetails/hooks/useMovie";
import { ActionButtons } from "../ActionButtons/ActionButtons";

interface Props {
    projectionMode?: boolean;
    projection?: Projection;
    setProjection?: React.Dispatch<React.SetStateAction<Projection>>;
}

export const HallLayout: React.FC<Props> = ({ projectionMode, projection, setProjection }) => {
    let hallToUse: Hall;
    const hallObj = useHall();
    hallToUse = hallObj.hall;
    const { movie } = useMovie(projection?.movieId);

    if (projection) {
        hallToUse = projection?.hall;
    }

    useSocketConnection();

    const { seatTypes } = useSeatTypes();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [addSeatType, setAddSeatType] = useState<SeatType | undefined>(undefined);
    const [addRowModal, setAddRowModal] = useState(false);
    const [showReserveModal, setShowReserveModal] = useState(false);
    const [showBuyTicketModal, setShowBuyTicketModal] = useState(false);
    const [deleteRowModal, setDeleteRowModal] = useState<{ show: boolean; row: Row }>({ show: false, row: { _id: "", seats: [] } });
    const { rows, setRows } = useHallRowsCopy(hallToUse);
    const [selectedSeat, setSelectedSeat] = useState<SelectedSeat | null>(null);

    if (seatTypes && seatTypes.length > 0) {
        return (
            <>
                <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>Screen</h1>
                <AddRowModal blankSeatType={seatTypes[0]} rowsSetter={setRows} rows={rows} show={addRowModal} openModalSetter={setAddRowModal} />
                <DeleteRowModal rowsSetter={setRows} modalSetter={setDeleteRowModal} show={deleteRowModal.show} row={deleteRowModal.row} />
                {projectionMode && (
                    <>
                        <ReserveSeatModal
                            selectedSeat={selectedSeat}
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
                            movie={movie!}
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
                            movie={movie!}
                        />
                    </>
                )}
                <Container>
                    <Rows
                        projection={projection}
                        blankSeatType={seatTypes[0]}
                        deleteModalSetter={setDeleteRowModal}
                        addSeatType={addSeatType}
                        editMode={editMode}
                        rows={rows}
                        setRows={setRows}
                        selectedSeat={selectedSeat}
                        setSelectedSeat={setSelectedSeat}
                    />
                </Container>

                <ActionButtons
                    projectionMode={projectionMode ?? false}
                    editMode={editMode}
                    rows={rows}
                    seatTypes={seatTypes}
                    setEditMode={setEditMode}
                    setAddSeatType={setAddSeatType}
                    selectedSeat={selectedSeat}
                    setShowBuyTicketModal={setShowBuyTicketModal}
                    setShowReserveModal={setShowReserveModal}
                    setAddRowModal={setAddRowModal}
                />
            </>
        );
    }
};
