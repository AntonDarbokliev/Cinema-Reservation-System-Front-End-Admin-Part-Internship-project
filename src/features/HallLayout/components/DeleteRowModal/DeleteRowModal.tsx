import { Button as BootstrapButton, Modal } from "react-bootstrap";
import Button from "../../../common/components/Button/Button";
import { Row } from "../../../HallsList/interfaces/hallInterface";

interface Props {
    show: boolean;
    modalSetter: React.Dispatch<
        React.SetStateAction<{
            show: boolean;
            row: Row;
        }>
    >;
    row: Row;
    rowsSetter: React.Dispatch<React.SetStateAction<Row[]>>;
}

export const DeleteRowModal: React.FC<Props> = ({ show, modalSetter, row, rowsSetter }) => {
    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <h4>Delete this Row?</h4>
            </Modal.Body>
            <Modal.Footer>
                <BootstrapButton
                    variant="danger"
                    onClick={async () => {
                        modalSetter({ show: false, row: { _id: "", seats: [] } });
                        rowsSetter((state) => state.filter((currentRow) => currentRow._id != row._id));
                    }}
                >
                    Delete
                </BootstrapButton>
                <Button onClick={() => modalSetter({ show: false, row: { _id: "", seats: [] } })}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};
