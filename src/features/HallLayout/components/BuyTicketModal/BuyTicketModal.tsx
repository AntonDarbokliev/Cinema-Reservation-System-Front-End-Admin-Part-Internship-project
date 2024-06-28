import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { Projection } from "../../../MovieDetails/interfaces/Projection";
import { Reservation } from "../../../MovieDetails/interfaces/Reservation";
import { SelectedSeat } from "../../interfaces/SelectedSeat";
import Button from "../../../common/components/Button/Button";
import { useFoodAndBeverages } from "../../hooks/useFoodAndBeverages";
import { FoodAndBeverage } from "../../../FoodAndBeverages/interfaces/FoodAndBeverage";
import { useState } from "react";
import { Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import { BuyTicketModalCheckoutStage } from "./BuyTicketModalCheckoutStage";
import { useBuyTicket } from "../../hooks/useBuyTicket";
import { useManageSocketSeat } from "../../hooks/useManageSocketSeat";
import { CountdownTimer } from "../../../common/components/Countdown/Countdown";
import { useSelectionCountdownEnd } from "../../hooks/useSelectionCountdownEnd";
import { Movie } from "../../../MoviesList/interfaces/Movie";
import { CreateTicket } from "../../interfaces/CreateTicket";
import { useDispatch } from "react-redux";
import { unselectSeat } from "../../../../store/webSocket/socketSlice";

export interface SelectedItem {
    item: FoodAndBeverage;
    quantity: number;
}

interface Props {
    showBuyTicketModal: boolean;
    setShowBuyTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
    projection: Projection;
    reservation?: Reservation;
    selectedSeat: SelectedSeat | null;
    setSelectedSeat: React.Dispatch<React.SetStateAction<SelectedSeat | null>>;
    setProjection: React.Dispatch<React.SetStateAction<Projection>>;
    movie: Movie;
}

export const BuyTicketModal: React.FC<Props> = ({
    showBuyTicketModal,
    projection,
    reservation,
    selectedSeat,
    setShowBuyTicketModal,
    setSelectedSeat,
    setProjection,
    movie,
}) => {
    const { foodAndBeverages } = useFoodAndBeverages();
    const dispatch = useDispatch();

    const [modalStage, setModalStage] = useState(0);
    const [selectedItems, setSelectedItems] = useState<{ [key: string]: SelectedItem }>({});
    const [price, setPrice] = useState(0);

    useManageSocketSeat(selectedSeat, showBuyTicketModal, projection._id);

    const handleSelect = (item: FoodAndBeverage) => {
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [item._id]: {
                item,
                quantity: prevSelectedItems[item._id] ? prevSelectedItems[item._id].quantity : 1,
            },
        }));
    };

    const handleIncreaseQuantity = (itemId: string) => {
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [itemId]: {
                ...prevSelectedItems[itemId],
                quantity: prevSelectedItems[itemId].quantity + 1,
            },
        }));
    };

    const handleDecreaseQuantity = (itemId: string) => {
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [itemId]: {
                ...prevSelectedItems[itemId],
                quantity: Math.max(1, prevSelectedItems[itemId].quantity - 1),
            },
        }));
    };

    const handleRemoveItem = (itemId: string) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedItems = { ...prevSelectedItems };
            delete updatedItems[itemId];
            return updatedItems;
        });
    };

    const { buyTicketHandler } = useBuyTicket(setProjection);
    const { selectionCountdownEndHandler } = useSelectionCountdownEnd(setShowBuyTicketModal);

    const onBuyTicket = async () => {
        const foodAndBeverages: FoodAndBeverage[] = [];

        Object.values(selectedItems).forEach((value) => {
            for (let i = 0; i < value.quantity; i++) {
                foodAndBeverages.push(value.item);
            }
        });

        const ticketObj: CreateTicket = {
            projection: projection._id,
            seat: selectedSeat!.seat._id,
            price: price.toFixed(2),
            reservaton: reservation?._id,
            seatRow: selectedSeat!.seatRow,
            seatNumber: selectedSeat!.seatNumber,
        };

        if (foodAndBeverages.length > 0) {
            ticketObj.foodAndBeverages = foodAndBeverages;
        }

        await buyTicketHandler(ticketObj);
        setSelectedSeat(null);
        dispatch(unselectSeat({ seat: { ...selectedSeat!.seat, projectionId: projection._id } }));
        setShowBuyTicketModal(false);
    };

    return (
        <Modal show={showBuyTicketModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <CountdownTimer initialMinutes={5} onTimerComplete={selectionCountdownEndHandler} />
            </Modal.Header>
            <Modal.Body>
                {modalStage === 0 && (
                    <>
                        <h1>Buy Ticket</h1>
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>Movie: </td>
                                    <td>{movie?.name}</td>
                                </tr>
                                <tr>
                                    <td>Seat Type: </td>
                                    <td>{selectedSeat?.seat.type.name}</td>
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
                        </Table>

                        <h1>Reservation</h1>
                        <Table striped bordered hover>
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
                            </tbody>
                        </Table>
                        {!reservation && <p>Seat is not reserved</p>}
                        <div>
                            <h1>Sides</h1>
                            <DropdownButton id="dropdown-basic-button" title="Select Item">
                                {foodAndBeverages.map((item) => (
                                    <Dropdown.Item key={item._id} onClick={() => handleSelect(item)}>
                                        {item.name}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>

                            <div className="mt-3">
                                {Object.values(selectedItems).map(({ item, quantity }) => (
                                    <div key={item._id} className="mb-3">
                                        <h5>{item.name}</h5>
                                        <p>{item.description}</p>
                                        <p>Price: ${item.price}</p>
                                        <InputGroup>
                                            <Button onClick={() => handleDecreaseQuantity(item._id)}>-</Button>
                                            <Form.Control type="text" value={quantity} readOnly />
                                            <Button onClick={() => handleIncreaseQuantity(item._id)}>+</Button>
                                            <Button onClick={() => handleRemoveItem(item._id)}>Remove</Button>
                                        </InputGroup>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {modalStage === 1 && (
                    <>
                        <BuyTicketModalCheckoutStage
                            price={price}
                            setSelectedSeat={setSelectedSeat}
                            selectedItems={selectedItems}
                            selectedSeat={selectedSeat}
                            setPrice={setPrice}
                        />
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                {modalStage === 0 && (
                    <>
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
                                setModalStage(1);
                            }}
                        >
                            Go to checkout
                        </Button>
                    </>
                )}

                {modalStage === 1 && (
                    <>
                        <Button
                            onClick={() => {
                                dispatch(unselectSeat({ seat: { ...selectedSeat!.seat, projectionId: projection._id } }));
                                setModalStage(0);
                            }}
                        >
                            Back
                        </Button>
                        <Button onClick={onBuyTicket}>Buy</Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};
