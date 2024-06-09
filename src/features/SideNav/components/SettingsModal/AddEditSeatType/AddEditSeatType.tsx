import { Col, Form, Image } from "react-bootstrap";
import Button from "../../../../common/components/Button/Button";
import { useState } from "react";
import { useForm } from "../../../../common/hooks/useForm";
import { useAddSeatType } from "../../../hooks/useAddSeatType";
import { useParams } from "react-router-dom";
import { Setting } from "../SettingsModal";
import { SeatType } from "../../../../HallsList/interfaces/SeatType";
import { useEditSeatType } from "../../../hooks/useEditSeatType";
import { EditSeatType } from "../../../interfaces/EditSeatType";

interface Props {
    setSetting: React.Dispatch<React.SetStateAction<Setting | null>>;
    setAddEditSeatType: React.Dispatch<React.SetStateAction<SeatType | null>>;
    addEditSeatType?: SeatType | null;
}

export const AddEditSeatType: React.FC<Props> = ({ setSetting, addEditSeatType, setAddEditSeatType }) => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [image, setImage] = useState<string | null>(addEditSeatType?.image ?? null);

    const { formValues, onChangeHandler } = useForm({
        name: addEditSeatType?.name ?? "",
        price: addEditSeatType?.price ?? 0,
    });
    const { addSeatTypeHandler } = useAddSeatType();
    const { editFoodAndBeverageHandler } = useEditSeatType();

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

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label column sm="2">
                    Image
                </Form.Label>
                <Col sm="10" className="d-flex">
                    {image && (
                        <>
                            <Image width={"15%"} src={image} alt="poster" />
                            <Button onClick={() => setImage(null)}>X</Button>
                        </>
                    )}
                    {!image && (
                        <Form.Control
                            type="file"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : undefined)}
                        />
                    )}
                </Col>
            </Form.Group>

            {!addEditSeatType && (
                <Button
                    type="button"
                    onClick={async () => {
                        if (cinemaId) {
                            await addSeatTypeHandler({ ...formValues, cinema: cinemaId }, file);
                            setAddEditSeatType(null);
                            setSetting(Setting.SEAT_TYPES);
                        }
                    }}
                >
                    Add Seat Type
                </Button>
            )}

            {addEditSeatType && (
                <Button
                    type="button"
                    onClick={() => {
                        const dataObj: EditSeatType = { ...formValues };
                        if (image || file) {
                            dataObj.image = image ?? file;
                        }
                        editFoodAndBeverageHandler(dataObj, addEditSeatType._id);
                        setAddEditSeatType(null);

                        setSetting(Setting.SEAT_TYPES);
                    }}
                >
                    Edit
                </Button>
            )}
        </Form>
    );
};
