import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";

export const CinemaInfo = () => {
    const cinema = useSelector((state: IRootState) => state.cinema);
    return (
        <Container>
            <Row>
                <Col>
                    <h1>{cinema.name}</h1>
                    <p>
                        <strong>Address:</strong> {cinema.address}
                    </p>
                    <p>
                        <strong>Number of Halls:</strong> {cinema.numberOfHalls}
                    </p>
                </Col>
            </Row>
        </Container>
    );
};
