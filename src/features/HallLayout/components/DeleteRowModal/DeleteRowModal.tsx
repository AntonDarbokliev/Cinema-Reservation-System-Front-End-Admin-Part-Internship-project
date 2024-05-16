import { Button, Modal } from "react-bootstrap";
import ButtonC from "../../../common/components/ButtonC/ButtonC";
// import { useDeleteHallRow } from "../../hooks/useDeleteHallRow";
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
    // const { deleteHallRowHandler } = useDeleteHallRow();
    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <h4>Delete this Row?</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    onClick={async () => {
                        // await deleteHallRowHandler(row._id);
                        modalSetter({ show: false, row: { _id: "", seats: [] } });
                        rowsSetter((state) => state.filter((currentRow) => currentRow._id != row._id));
                    }}
                >
                    Delete
                </Button>
                <ButtonC onClick={() => modalSetter({ show: false, row: { _id: "", seats: [] } })}>Cancel</ButtonC>
            </Modal.Footer>
        </Modal>
    );
};
