import {Button as BootstrapBtn} from "react-bootstrap";
import styles from "./Button.module.scss";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
    additionalClasses?: string;
}

const Button: React.FC<Props> = ({ children, onClick, additionalClasses }) => {
    return (
        <BootstrapBtn type="submit" onClick={onClick} className={styles["custom-button"] + ` ${additionalClasses}`}>
            {children}
        </BootstrapBtn>
    );
};

export default Button;
