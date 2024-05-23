import { Container } from "react-bootstrap";
import { useFoodAndBeverages } from "../../hooks/useFoodAndBeverages";
import { FoodAndBeverageCard } from "../FoodAndBeverageCard/FoodAndBeverageCard";

export const FoodAndBeveragesList = () => {
    const { foodBeverages } = useFoodAndBeverages();
    return (
        <Container>
            {foodBeverages.map((f) => (
                <FoodAndBeverageCard key={f._id} foodAndBeverage={f} />
            ))}
        </Container>
    );
};
