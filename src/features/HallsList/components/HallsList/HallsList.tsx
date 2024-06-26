import { useSelector } from "react-redux";
import Container from "../../../common/components/Container/Container";
import { useHalls } from "../../hooks/useHalls";
import { AddHallModal } from "../AddHallModal/AddHallModal";
import { HallCard } from "../HallCard/HallCard";
import { IRootState } from "../../../../store/store";

export const HallsList = () => {
    const { halls, setHalls } = useHalls();
    const show = useSelector((state: IRootState) => state.addHallModal.show);
    return (
        <Container>
            <AddHallModal hallSetter={setHalls} show={show} />
            {halls.map((hall, i) => (
                <HallCard key={hall._id} hall={hall} hallIndex={i} />
            ))}
        </Container>
    );
};
