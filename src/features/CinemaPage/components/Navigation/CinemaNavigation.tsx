import { Nav } from "react-bootstrap";
import styles from "./CinemaNavigation.module.scss";
import { Link } from "react-router-dom";

export const CinemaNavigation = () => {
    return (
        <Nav justify variant="tabs" defaultActiveKey="/home" className={styles["nav"]}>
            <Nav.Item className={styles["nav-item"]}>
                <Nav.Link as={'div'} className={styles["nav-link"]} eventKey="link-0">
                    <Link to="/">Info</Link>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles["nav-item"]}>
                <Nav.Link as={'div'}  className={styles["nav-link"]} eventKey="link-1">
                    <Link to="halls">Halls</Link>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles["nav-item"]}>
                <Nav.Link as={'div'}  className={styles["nav-link"]} eventKey="link-2">
                    <Link to="/">Projections</Link>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles["nav-item"]}>
                <Nav.Link as={'div'}  className={styles["nav-link"]} eventKey="link-3">
                    <Link to="/">Menu</Link>
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};
