import { useEffect } from "react";
import { SelectedSeat } from "../../interfaces/SelectedSeat";
import { SelectedItem } from "./BuyTicketModal";
import styles from "./BuyTicketModalCheckoutPage.module.scss";

interface Props {
    selectedSeat: SelectedSeat | null;
    selectedItems: { [key: string]: SelectedItem };
    setSelectedSeat: React.Dispatch<React.SetStateAction<SelectedSeat | null>>;
    setPrice: React.Dispatch<React.SetStateAction<number>>;
    price: number;
}

export const BuyTicketModalCheckoutStage: React.FC<Props> = ({ selectedItems, selectedSeat, setPrice, price }) => {
    useEffect(() => {
        setPrice(
            Object.values(selectedItems).reduce((acc, item) => (acc += item.item.price * item.quantity), 0) +
                (selectedSeat?.seat.type.price ?? 0)
        );
    }, []);
    return (
        <>
            {selectedSeat && (
                <>
                    <h1>Checkout</h1>

                    <div className={styles["item-card"]}>
                        <h5>{selectedSeat?.seat.type.name} Seat</h5>
                        <p>1x ${selectedSeat?.seat.type.price}</p>
                    </div>

                    {Object.values(selectedItems).map((selectedItem) => (
                        <div key={selectedItem.item._id} className={styles["item-card"]}>
                            <h5>{selectedItem.item.name}</h5>
                            <p>
                                {selectedItem.quantity}x ${selectedItem.item.price}
                            </p>
                        </div>
                    ))}

                    <br />
                    <div key={selectedSeat?.seat._id} className={styles["item-card"]}>
                        <h1>Total Price</h1>
                        <h5>${price.toFixed(2)}</h5>
                    </div>
                </>
            )}
        </>
    );
};
