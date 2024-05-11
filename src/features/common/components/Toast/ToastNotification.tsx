import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";

interface Props {
    text: string;
    type: "danger" | "success";
}

export const ToastNotification: React.FC<Props> = ({ text, type }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
        return () => {
            setTimeout(() => {
                setShow(false);
                console.log("unmounting");
            }, 4900);
        };
        // React-bootstrap doesn't allow for dynamic rendering of notifications (with animation)
        // to apply an animation, setting the show prop to true/false is required
    }, []);
    return (
        <Toast show={show} animation={true} bg={type}>
            <Toast.Body>{text}</Toast.Body>
        </Toast>
    );
};
