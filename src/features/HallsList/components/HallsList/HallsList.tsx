import Container from "../../../common/components/Container/Container";
import { useHalls } from "../../hooks/useHalls";
import { HallCard } from "../HallCard/HallCard";

export const HallsList = () => {
    const { halls } = useHalls();
    return (
        <Container>
            {halls.map((hall, i) => (
                <HallCard hall={hall} hallIndex={i} />
            ))}
        </Container>
    );
};
