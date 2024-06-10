import { Modal } from "react-bootstrap";
import Button from "../../../../common/components/Button/Button";
import { SeatType } from "../../../../HallsList/interfaces/SeatType";
import { Setting } from "../SettingsModal";
import { useDeleteSeatType } from "../../../hooks/useDeleteSeatType";

interface Props {
    seatType: SeatType;
    setSetting: React.Dispatch<React.SetStateAction<Setting | null>>;
}

export const DeleteSeatType: React.FC<Props> = ({ seatType, setSetting }) => {
    const { deleteSeatTypeHandler } = useDeleteSeatType();
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Delete {seatType.name}?</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button
                    onClick={async () => {
                        await deleteSeatTypeHandler(seatType._id);
                        setSetting(Setting.SEAT_TYPES);
                    }}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </>
    );
};
