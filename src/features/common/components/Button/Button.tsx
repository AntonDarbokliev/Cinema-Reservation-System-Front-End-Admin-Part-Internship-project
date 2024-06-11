import { Button as BootstrapBtn } from "react-bootstrap";
import styles from "./Button.module.scss";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
    additionalClasses?: string;
    type?: "button" | "submit";
}

const Button: React.FC<Props> = ({ children, onClick, additionalClasses, type }) => {
    return (
        <BootstrapBtn type={type ? type : "submit"} onClick={onClick} className={styles["custom-button"] + ` ${additionalClasses}`}>
            {children}
        </BootstrapBtn>
    );
};

export default Button;
