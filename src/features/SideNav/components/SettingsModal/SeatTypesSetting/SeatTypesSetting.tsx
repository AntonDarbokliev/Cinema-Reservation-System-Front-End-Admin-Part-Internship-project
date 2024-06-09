import Card from "react-bootstrap/Card";
import { useSeatTypes } from "../../../../HallLayout/hooks/useSeatTypes";
import { SeatTypeName } from "../../../../HallsList/interfaces/hallInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../common/components/Button/Button";
import styles from "./SeatTypesSetting.module.scss";
import { Setting } from "../SettingsModal";
import { SeatType } from "../../../../HallsList/interfaces/SeatType";

interface Props {
    setSetting: React.Dispatch<React.SetStateAction<Setting | null>>;
    setAddEditSeatType: React.Dispatch<React.SetStateAction<SeatType | null>>;
}

export const SeatTypesSetting: React.FC<Props> = ({ setSetting, setAddEditSeatType }) => {
    const { seatTypes } = useSeatTypes();

    return (
        <>
            {seatTypes?.map((seatType) => {
                if (seatType.name !== SeatTypeName.SEAT_BLANK) {
                    return (
                        <Card key={seatType._id} style={{ width: "18rem", minHeight: "35vh", margin: "1rem" }}>
                            <div className={styles["edit-delete-btns"]}>
                                <Button
                                    onClick={() => {
                                        setAddEditSeatType(seatType);
                                        setSetting(Setting.ADD_EDIT_SEAT_TYPE);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setAddEditSeatType(seatType);
                                        setSetting(Setting.DELETE_SEAT_TYPE);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </Button>
                            </div>
                            {seatType.image && <Card.Img variant="top" src={seatType.image} />}
                            {!seatType.image && <FontAwesomeIcon className="fa-8x" icon={faChair} />}
                            <Card.Body>
                                <Card.Title>{seatType.name}</Card.Title>
                            </Card.Body>
                            <Card.Body>
                                <p>Price: ${seatType.price}</p>
                            </Card.Body>
                        </Card>
                    );
                }
            })}
        </>
    );
};
