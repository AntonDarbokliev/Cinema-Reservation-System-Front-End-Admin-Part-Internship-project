import Form from "react-bootstrap/Form";
import { SeatType } from "../../../HallsList/interfaces/hallInterface";

interface Props {
    seatTypeSetter: React.Dispatch<React.SetStateAction<SeatType>>;
}

export const SeatTypeSelect: React.FC<Props> = ({ seatTypeSetter }) => {
    return (
        <Form.Select onChange={(e) => seatTypeSetter(e.target.value as SeatType)}>
            <option value={SeatType.SEAT_COMMON}>Change seat type</option>
            <option value={SeatType.SEAT_COMMON}>Common</option>
            <option value={SeatType.SEAT_VIP}>VIP</option>
            <option value={SeatType.SEAT_COUPLES}>Couples</option>
        </Form.Select>
    );
};
