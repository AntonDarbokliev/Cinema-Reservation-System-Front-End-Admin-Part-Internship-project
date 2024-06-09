import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "../../../common/components/Button/Button";
import { useState } from "react";
import { SeatTypesSetting } from "./SeatTypesSetting/SeatTypesSetting";
import { AddEditSeatType } from "./AddEditSeatType/AddEditSeatType";

interface Props {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum Setting {
    SEAT_TYPES = 0,
    ADD_SEAT_TYPE = 1,
}

export const SettingsModal: React.FC<Props> = ({ show, setShow }) => {
    const [setting, setSetting] = useState<Setting | null>(null);

    return (
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                {setting === null && (
                    <>
                        <Card style={{ margin: "1rem" }}>
                            <Card.Body>
                                <Card.Title>Type of Seats</Card.Title>
                                <Card.Text>Add types, prices and more.</Card.Text>
                                <Button onClick={() => setSetting(Setting.SEAT_TYPES)}>Go</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ margin: "1rem" }}>
                            <Card.Body>
                                <Card.Title>Projection</Card.Title>
                                <Card.Text>Adjust projection settings.</Card.Text>
                                <Button>Go</Button>
                            </Card.Body>
                        </Card>
                    </>
                )}
                {setting === Setting.SEAT_TYPES && <SeatTypesSetting />}
                {setting === Setting.ADD_SEAT_TYPE && <AddEditSeatType setSetting={setSetting} />}
            </Modal.Body>
            <Modal.Footer>
                {setting !== null && <Button onClick={() => setSetting(null)}>Back</Button>}
                {setting === Setting.SEAT_TYPES && <Button onClick={() => setSetting(Setting.ADD_SEAT_TYPE)}>Add Seat Type</Button>}
                <Button onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
