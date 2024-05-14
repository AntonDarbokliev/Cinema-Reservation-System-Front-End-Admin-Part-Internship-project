import { Col, Container, Row } from "react-bootstrap";
import "./HallLayout.scss";
import { useHall } from "../../hooks/useHall";
// import chair from "../../../../assets/chair-solid-normal.svg";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChair} from '@fortawesome/free-solid-svg-icons';
export const HallLayout = () => {
    const { hall } = useHall();
    let currentSeatNumber = 0;
    return (
        <>
            <h1>Screen</h1>
            <Container fluid>
                {hall.seatsLayout.map((row) => {
                    currentSeatNumber = 0;
                    return (
                        <Row>
                            {row.map((seat) => {
                                if (seat != "blank") {
                                    currentSeatNumber++;
                                    return (
                                        <Col className="col-sm">
                                            <FontAwesomeIcon className="chair-icon" icon={faChair}/>
                                            {/* <svg viewBox="0 0 448 512">
                                                <path
                                                    fill="#29d13d"
                                                    d="M248 48V256h48V58.7c23.9 13.8 40 39.7 40 69.3V256h48V128C384 57.3 326.7 0 256 0H192C121.3 0 64 57.3 64 128V256h48V128c0-29.6 16.1-55.5 40-69.3V256h48V48h48zM48 288c-12.1 0-23.2 6.8-28.6 17.7l-16 32c-5 9.9-4.4 21.7 1.4 31.1S20.9 384 32 384l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32V384H352v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384c11.1 0 21.4-5.7 27.2-15.2s6.4-21.2 1.4-31.1l-16-32C423.2 294.8 412.1 288 400 288H48z"
                                                    />
                                            </svg> */}
                                                    <h4>
                                                       {currentSeatNumber}
                                                   </h4>
                                                   <p>{seat}</p>
                                        </Col>
                                    );
                                } else {
                                    return <Col style={{ border: "none" }} />;
                                }
                            })}
                        </Row>
                    );
                })}
            </Container>
        </>
    );
};
