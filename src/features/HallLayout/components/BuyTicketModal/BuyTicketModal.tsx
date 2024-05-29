import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { Projection } from "../../../MovieDetails/interfaces/Projection";
import { Reservation } from "../../../MovieDetails/interfaces/Reservation";
import { SelectedSeat } from "../../interfaces/SelectedSeat";
import Button from "../../../common/components/Button/Button";
import Form from "react-bootstrap/Form";
import { useFoodAndBeverages } from "../../hooks/useFoodAndBeverages";
import { FoodAndBeverage } from "../../../FoodAndBeverages/interfaces/FoodAndBeverage";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import { BuyTicketModalCheckoutStage } from "./BuyTicketModalCheckoutStage";

interface Props {
    showBuyTicketModal: boolean;
    setShowBuyTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
    projection: Projection;
    reservation?: Reservation;
    selectedSeat: SelectedSeat | null;
    setSelectedSeat: React.Dispatch<React.SetStateAction<SelectedSeat | null>>;
}

export const BuyTicketModal: React.FC<Props> = ({
    showBuyTicketModal,
    projection,
    reservation,
    selectedSeat,
    setShowBuyTicketModal,
    setSelectedSeat,
}) => {
    const { foodAndBeverages } = useFoodAndBeverages();

    const [selectedFoodAndBeverage, setSelectedFoodAndBeverage] = useState<string>("");
    const [foodAndBeverageQuantity, setFoodAndBeverageQuantity] = useState<{
        [key: string]: { quantity: number; foodAndBeverage: FoodAndBeverage };
    }>({});

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFoodAndBeverage(e.target.value);
    };

    const [modalStage, setModalStage] = useState(0);

    const onAdd = () => {
        if (selectedFoodAndBeverage !== "") {
            const item = foodAndBeverageQuantity[selectedFoodAndBeverage];

            if (item) {
                item.quantity += 1;
                setFoodAndBeverageQuantity((state) => {
                    return { ...state, [selectedFoodAndBeverage]: item };
                });
            } else {
                setFoodAndBeverageQuantity((state) => {
                    return {
                        ...state,
                        [selectedFoodAndBeverage]: {
                            quantity: 1,
                            foodAndBeverage: foodAndBeverages.find((f) => f.name === selectedFoodAndBeverage)!,
                        },
                    };
                });
            }
        }
    };

    // const onRemoveItem = (name: string) => {
    //     setFoodAndBeverageQuantity((state) => ({ ...state, name: undefined }));
    // };

    const onPlusMinus = (name: string, plusOrMinus: "plus" | "minus") => {
        const item = foodAndBeverageQuantity[name];
        if (item) {
            if (plusOrMinus === "plus") {
                item.quantity += 1;
            } else if (plusOrMinus === "minus") {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    // onRemoveItem(name);
                }
            }
            setFoodAndBeverageQuantity((state) => {
                return { ...state, [name]: item };
            });
        }
    };

    return (
        <Modal show={showBuyTicketModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalStage === 0 && (
                    <>
                        <h1>Buy Ticket</h1>
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>Movie: </td>
                                    <td>{projection?.movie.name}</td>
                                </tr>
                                <tr>
                                    <td>Seat Type: </td>
                                    <td>{selectedSeat?.seat.type}</td>
                                </tr>
                                <tr>
                                    <td>Projection Start: </td>
                                    <td>
                                        {projection?.startDate}/{projection?.startTime}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Projection Type: </td>
                                    <td>{projection?.projectionType}</td>
                                </tr>
                                <tr>
                                    <td>Row: </td>
                                    <td>{selectedSeat?.seatRow}</td>
                                </tr>
                                <tr>
                                    <td>Seat: </td>
                                    <td>{selectedSeat?.seatNumber}</td>
                                </tr>
                            </tbody>
                            <h1>Reservation</h1>
                            <tbody>
                                {reservation && (
                                    <>
                                        <tr>
                                            <td>Made: </td>
                                            <td>{reservation?.made}</td>
                                        </tr>

                                        <tr>
                                            <td>Reservation ID: </td>
                                            <td>{reservation?._id}</td>
                                        </tr>
                                    </>
                                )}

                                {!reservation && <p>Seat is not reserved</p>}
                            </tbody>
                        </Table>
                        <Form.Group>
                            <Form.Label>Sides</Form.Label>
                            <Form.Select onChange={onChange} value={selectedFoodAndBeverage}>
                                <option value={""}>Select Sides</option>

                                {foodAndBeverages.map((f) => (
                                    <option key={f._id} value={f.name}>
                                        {f.name}
                                    </option>
                                ))}
                            </Form.Select>
                            {selectedFoodAndBeverage !== "" && <Button onClick={onAdd}>Add</Button>}
                            {Object.entries(foodAndBeverageQuantity).map(([key, value]) => (
                                <>
                                    {value !== undefined && (
                                        <Card key={key}>
                                            <Card.Body>
                                                {key}: <Button onClick={() => onPlusMinus(key, "minus")}>-</Button> {value.quantity}
                                                <Button onClick={() => onPlusMinus(key, "plus")}>+</Button>
                                            </Card.Body>
                                        </Card>
                                    )}
                                </>
                            ))}
                        </Form.Group>
                    </>
                )}
                {modalStage === 1 && (
                    <>
                        <BuyTicketModalCheckoutStage foodAndBeverageQuantity={foodAndBeverageQuantity} />
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        setModalStage(0);
                        setShowBuyTicketModal(false);
                    }}
                >
                    Close
                </Button>
                <Button
                    onClick={() => {
                        setSelectedSeat(null);
                        setModalStage(1);
                    }}
                >
                    Go to checkout
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
