import { Col, Form } from "react-bootstrap";
import Button from "../../../../common/components/Button/Button";
import { useCinema } from "../../../../CinemaPage/hooks/useCinema";
import { useForm } from "../../../../common/hooks/useForm";
import { useEffect } from "react";
import { useUpdateAwaitingStatusMargin } from "../../../hooks/useUpdateAwaitingStatusMargin";
import { Setting } from "../SettingsModal";

interface Props {
    setSetting: React.Dispatch<React.SetStateAction<Setting | null>>;
}

export const ChangeProjectionMargin: React.FC<Props> = ({ setSetting }) => {
    const { cinema } = useCinema();

    const initialValue = {
        minutesAwaitingStatusMargin: cinema?.minutesAwaitingStatusMargin,
    };

    const { formValues, onChangeHandler, updateInitialValue } = useForm(initialValue);

    useEffect(() => {
        updateInitialValue(initialValue);
    }, [cinema]);

    const { updateAwaitingStatusMarginHandler } = useUpdateAwaitingStatusMargin(cinema?._id);
    return (
        <>
            <h1>Change Projection Margin</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formPlaintext1">
                    <Form.Label>Projection Awaiting status margin before projection (minutes)</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="number"
                            name="minutesAwaitingStatusMargin"
                            value={formValues.minutesAwaitingStatusMargin ?? ''}
                            onChange={(e) => onChangeHandler(e)}
                        />
                        <Form.Label>Note: Changes will only be reflected on projections made after saving</Form.Label>
                    </Col>
                </Form.Group>
            </Form>
            <Button
                onClick={() => {
                    updateAwaitingStatusMarginHandler(Number(formValues.minutesAwaitingStatusMargin));
                    setSetting(null);
                }}
            >
                Save
            </Button>
        </>
    );
};
