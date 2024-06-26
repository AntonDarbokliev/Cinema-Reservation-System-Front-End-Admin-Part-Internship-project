import ListGroup from "react-bootstrap/ListGroup";
import { CinemaCard } from "../CinemaCard/CinemaCard";
import { AddCinemaModal } from "../AddCinemaModal/AddCinemaModal";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { Container } from "react-bootstrap";
import { useAllCinemas } from "../hooks/useAllCinemas";

export const CinemasList = () => {
    const { cinemas, setCinemas } = useAllCinemas();
    const show = useSelector((state: IRootState) => state.addCinemaModal.show);
    return (
        <Container>
            <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>Cinemas</h1>
            <AddCinemaModal cinemaSetter={setCinemas} show={show} />
            <ListGroup>
                {cinemas.map((c) => (
                    <CinemaCard key={c._id} cinema={c} />
                ))}
            </ListGroup>
        </Container>
    );
};
