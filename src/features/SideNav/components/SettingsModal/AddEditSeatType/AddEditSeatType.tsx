import { Form } from "react-bootstrap";
import Button from "../../../../common/components/Button/Button";
import { useState } from "react";
import { useForm } from "../../../../common/hooks/useForm";
import { useAddSeatType } from "../../../hooks/useAddSeatType";
import { useParams } from "react-router-dom";
import { Setting } from "../SettingsModal";

interface Props {
    setSetting: React.Dispatch<React.SetStateAction<Setting | null>>;
}

export const AddEditSeatType: React.FC<Props> = ({ setSetting }) => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const { formValues, onChangeHandler } = useForm({
        name: "",
        price: 0,
    });
    const { addSeatTypeHandler } = useAddSeatType();
    const cinemaId = useParams().id;
    return (
        <Form>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={formValues.name} onChange={onChangeHandler} type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control name="price" value={formValues.price} onChange={onChangeHandler} type="number" placeholder="Enter price" />
            </Form.Group>

            <Form.Group controlId="formFile" style={{ marginBottom: "1rem" }}>
                <Form.Label>Image (optional)</Form.Label>

                <Form.Control
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : undefined)}
                />
            </Form.Group>

            <Button
                type="button"
                onClick={async () => {
                    if (cinemaId) {
                        await addSeatTypeHandler({ ...formValues, cinema: cinemaId }, file);
                        setSetting(Setting.SEAT_TYPES);
                    }
                }}
            >
                Add Seat Type
            </Button>
        </Form>
    );
};
