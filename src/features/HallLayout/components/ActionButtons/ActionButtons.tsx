import { SeatType } from "../../../HallsList/interfaces/SeatType";
import { Row } from "../../../HallsList/interfaces/hallInterface";
import Button from "../../../common/components/Button/Button";
import { useEditHall } from "../../hooks/useEditHall";
import { SelectedSeat } from "../../interfaces/SelectedSeat";
import { SeatTypeSelect } from "../SeatTypeSelect/SeatTypeSelect";
import styles from "./ActionButtons.module.scss";

interface Props {
    projectionMode: boolean;
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    rows: Row[];
    setAddRowModal: React.Dispatch<React.SetStateAction<boolean>>;
    seatTypes: SeatType[];
    setAddSeatType: React.Dispatch<React.SetStateAction<SeatType | undefined>>;
    selectedSeat: SelectedSeat | null;
    setShowReserveModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowBuyTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ActionButtons: React.FC<Props> = ({
    projectionMode,
    editMode,
    setEditMode,
    rows,
    setAddRowModal,
    seatTypes,
    setAddSeatType,
    selectedSeat,
    setShowBuyTicketModal,
    setShowReserveModal,
}) => {
    const { editHallHandler } = useEditHall();

    const saveOrEditClickHandler = async () => {
        if (editMode) {
            await editHallHandler(rows);
        }
        setEditMode(!editMode);
    };

    return (
        <div className={styles["util-btn-group"]}>
            {!projectionMode && (
                <>
                    {editMode && <SeatTypeSelect seatTypes={seatTypes} seatTypeSetter={setAddSeatType}></SeatTypeSelect>}
                    <Button onClick={saveOrEditClickHandler}>{editMode ? "Save" : "Edit Mode"}</Button>
                    <Button onClick={() => setAddRowModal(true)}>Add Row</Button>
                </>
            )}
            {projectionMode && (
                <>
                    {!selectedSeat?.reserved && !selectedSeat?.bought && (
                        <>
                            <Button onClick={() => setShowReserveModal(true)}>Reserve</Button>
                        </>
                    )}
                    {selectedSeat?.reserved && !selectedSeat?.bought && (
                        <>
                            <Button onClick={() => setShowReserveModal(true)}>Cancel Reservation</Button>
                        </>
                    )}
                    {!selectedSeat?.bought && (
                        <>
                            <Button onClick={() => setShowBuyTicketModal(true)}>Buy ticket</Button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
