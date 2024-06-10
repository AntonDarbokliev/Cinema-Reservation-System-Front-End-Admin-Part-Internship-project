import ToastContainer from "react-bootstrap/ToastContainer";
import { ToastNotification } from "./ToastNotification";
import { IRootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import styles from './ToastList.module.scss';

export const ToastList = () => {
    const toasts = useSelector((state: IRootState) => state.toast.toasts);
    return (
        <ToastContainer className={`position-fixed ${styles['toast-container']}`}>
            {toasts.map((notfication) => (
                <ToastNotification key={notfication.id} text={notfication.text} type={notfication.type} />
            ))}
        </ToastContainer>
    );
};
