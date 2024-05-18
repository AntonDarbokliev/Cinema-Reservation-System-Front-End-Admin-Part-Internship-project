import ToastContainer from "react-bootstrap/ToastContainer";
import { ToastNotification } from "./ToastNotification";
import { IRootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import styles from './ToastList.module.scss';

export const ToastList = () => {
    const toasts = useSelector((state: IRootState) => state.toast.toasts);
    return (
        <ToastContainer className={`position-absolute ${styles['toast-container']}`}>
            {toasts.map((notfication) => (
                <ToastNotification text={notfication.text} type={notfication.type} />
            ))}
        </ToastContainer>
    );
};
