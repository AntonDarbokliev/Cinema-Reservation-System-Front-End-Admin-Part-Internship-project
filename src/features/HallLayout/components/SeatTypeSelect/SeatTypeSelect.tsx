import Form from "react-bootstrap/Form";
import { SeatType } from "../../../HallsList/interfaces/SeatType";
import { useEffect } from "react";

interface Props {
    seatTypeSetter: React.Dispatch<React.SetStateAction<SeatType | undefined>>;
    seatTypes: SeatType[];
}

export const SeatTypeSelect: React.FC<Props> = ({ seatTypeSetter, seatTypes }) => {
    useEffect(() => {
        seatTypeSetter(seatTypes[0]);
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const seatType = seatTypes.find((seatType) => seatType._id === e.target.value);
        if (seatType) seatTypeSetter(seatType);
    };

    return (
        <Form.Select onChange={onChange}>
            <option>Select seat type</option>
            {seatTypes.map((seatType) => (
                <>{seatType.name !== "blank" && <option value={seatType._id}>{seatType.name}</option>}</>
            ))}
        </Form.Select>
    );
};
