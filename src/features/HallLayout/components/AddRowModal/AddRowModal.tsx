import { Form, Modal } from "react-bootstrap";
import Button from "../../../common/components/Button/Button";
import { useEffect, useState } from "react";
import { Row, Seat, SeatType } from "../../../HallsList/interfaces/hallInterface";
import { useEditHall } from "../../hooks/useEditHall";

interface Props {
    openModalSetter: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
    rowsSetter: React.Dispatch<React.SetStateAction<Row[]>>;
    rows: Row[];
}

export const AddRowModal: React.FC<Props> = ({ openModalSetter, show, rowsSetter, rows }) => {
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

            openModalSetter(false);
        }
    };

    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <h4>Add a Row</h4>
                <Button onClick={() => setCounter((s) => (s += 1))}>+</Button>
                <Button onClick={() => setCounter((s) => (s += 1))}>+</Button>
                <Form.Label>Available spaces</Form.Label>
                <Form.Control min={0} type="number" readOnly={true} value={counter} />
                <Button
                    onClick={() =>
                        setCounter((s) => {
                            const newValue = s - 1;
                            if (newValue >= 0) return newValue;
                            else return s;
                        })
                    }
                >
                    -
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onAdd}>Add</Button>
                <Button onClick={() => openModalSetter(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
