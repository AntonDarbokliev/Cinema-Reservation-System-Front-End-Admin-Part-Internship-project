import { Form, Modal } from "react-bootstrap";
import ButtonC from "../../../common/components/ButtonC/ButtonC";
import { useEffect, useState } from "react";
import { Row, Seat, SeatType } from "../../../HallsList/interfaces/hallInterface";
import { useEditHall } from "../../hooks/useEditHall";

interface Props {
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
    rowsSetter: React.Dispatch<React.SetStateAction<Row[]>>;
    rows: Row[];
}

export const AddRowModal: React.FC<Props> = ({ modalSetter, show, rowsSetter, rows }) => {
    const [counter, setCounter] = useState(0);
    const { editHallHandler } = useEditHall();
    useEffect(() => {
        if (counter < 0) {
            setCounter(0);
        }
    }, [counter]);

    const onAdd = async () => {
        const newArr: Seat[] = new Array(counter).fill({ type: SeatType.SEAT_BLANK } as Seat);

        const editedHall = await editHallHandler([...rows, { seats: newArr }]);
        if (editedHall) {
            const row = editedHall.seatsLayout[editedHall.seatsLayout.length - 1];

            const newRowId = row.seats[row.seats.length - 1]._id;

            rowsSetter((s) => {
                return [...s, { seats: row.seats, _id: newRowId }];
            });

            modalSetter(false);
        }
    };

    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <h4>Add a Row</h4>
                <ButtonC onClick={() => setCounter((s) => (s += 1))}>+</ButtonC>
                <Form.Label>Available spaces</Form.Label>
                <Form.Control type="number" readOnly={true} value={counter} />
                <ButtonC onClick={() => setCounter((s) => (s -= 1))}>-</ButtonC>
            </Modal.Body>
            <Modal.Footer>
                <ButtonC onClick={onAdd}>Add</ButtonC>
                <ButtonC onClick={() => modalSetter(false)}>Close</ButtonC>
            </Modal.Footer>
        </Modal>
    );
};
