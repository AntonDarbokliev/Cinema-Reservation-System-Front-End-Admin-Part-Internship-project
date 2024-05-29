import { FoodAndBeverage } from "../../../FoodAndBeverages/interfaces/FoodAndBeverage";

interface Props {
    foodAndBeverageQuantity: {
        [key: string]: {
            quantity: number;
            foodAndBeverage: FoodAndBeverage;
        };
    };
}

export const BuyTicketModalCheckoutStage: React.FC<Props> = ({ foodAndBeverageQuantity }) => {
    return (
        <>
            <h1>Checkout</h1>
            {Object.keys(foodAndBeverageQuantity).map((key) => (
                <div key={key}>
                    <p>
                        {foodAndBeverageQuantity[key].foodAndBeverage.name} : {' '} 
                        {foodAndBeverageQuantity[key].quantity} x ${foodAndBeverageQuantity[key].foodAndBeverage.price}
                    </p>
                </div>
            ))}
        </>
    );
};
