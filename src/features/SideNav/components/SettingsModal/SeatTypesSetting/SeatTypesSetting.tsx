import Card from "react-bootstrap/Card";
import { useSeatTypes } from "../../../../HallLayout/hooks/useSeatTypes";
import { SeatTypeName } from "../../../../HallsList/interfaces/hallInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair } from "@fortawesome/free-solid-svg-icons";

export const SeatTypesSetting = () => {
    const { seatTypes } = useSeatTypes();

    return (
        <>
            {seatTypes?.map((seatType) => {
                if (seatType.name !== SeatTypeName.SEAT_BLANK) {
                    return (
                        <Card style={{ width: "18rem", minHeight: "35vh", margin: "1rem" }}>
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
