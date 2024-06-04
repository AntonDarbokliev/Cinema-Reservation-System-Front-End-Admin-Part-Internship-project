import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Countdown.module.scss";

interface Props {
    initialMinutes: number;
    onTimerComplete?: () => void;
}

export const CountdownTimer: React.FC<Props> = ({ initialMinutes, onTimerComplete }) => {
    const [remainingMinutes, setRemainingMinutes] = useState(initialMinutes * 60);

    useEffect(() => {
        if (remainingMinutes <= 0) {
            if (onTimerComplete) {
                onTimerComplete();
            }
            setRemainingMinutes(initialMinutes * 60); // Reset to initial value
        } else {
            const timer = setTimeout(() => {
                setRemainingMinutes(remainingMinutes - 1);
            }, 1000);
            return () => clearTimeout(timer); // Cleanup timeout on unmount
        }
    }, [remainingMinutes]);

    const minutes = Math.floor(remainingMinutes / 60);
    const seconds = remainingMinutes % 60;

    return (
        <Container>
            <Row>
                <Col className={styles["countdown"]}>
                    <h4>Make a selection</h4>
                    <div className={styles["countdown-time"]}>
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
