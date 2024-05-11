import Button  from "react-bootstrap/Button";
import styles from './ButtonC.module.scss';
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
    additionalClasses?: string
}

const ButtonC: React.FC<Props> = ({children, onClick, additionalClasses}) => {
    return <Button type="submit" onClick={onClick} className={styles['custom-button'] + ` ${additionalClasses}`}>{children}</Button>;
};

export default ButtonC;
