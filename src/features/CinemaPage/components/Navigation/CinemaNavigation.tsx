import { Nav } from "react-bootstrap";
import styles from "./CinemaNavigation.module.scss";
import { Link } from "react-router-dom";

export const CinemaNavigation = () => {
    return (
        <Nav justify variant="tabs" defaultActiveKey="/home" className={styles["nav"]}>

            <Nav.Item className={styles["nav-item"]}>
                <Nav.Link as={"div"} className={styles["nav-link"]} eventKey="link-1">
                    <Link to="halls">Halls</Link>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles["nav-item"]}>
                <Nav.Link as={"div"} className={styles["nav-link"]} eventKey="link-2">
                    <Link to="movies">Movies</Link>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item className={styles["nav-item"]}>
                <Nav.Link as={"div"} className={styles["nav-link"]} eventKey="link-4">
                    <Link to="food-and-beverages">Food & Beverages</Link>
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};
