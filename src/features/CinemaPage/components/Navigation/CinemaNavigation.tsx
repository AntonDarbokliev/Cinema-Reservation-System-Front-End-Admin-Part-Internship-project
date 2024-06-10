import { Nav } from "react-bootstrap";
import styles from "./CinemaNavigation.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";

export const CinemaNavigation = () => {
    const navigate = useNavigate();
    const cinema = useSelector((state: IRootState) => state.cinema);
    return (
        <Nav justify variant="tabs" defaultActiveKey="/home" className={styles["nav"]}>
            <Nav.Item className={styles["nav-item-cinema"]}>
                <p>
                    {cinema.name} - {cinema.address}
                </p>
            </Nav.Item>

            <Nav.Item onClick={() => navigate("halls")} className={styles["nav-item"]}>
                <Nav.Link as={"div"} className={styles["nav-link"]} eventKey="link-1">
                    <Link to="halls">Halls</Link>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => navigate("movies")} className={styles["nav-item"]}>
                <Nav.Link as={"div"} className={styles["nav-link"]} eventKey="link-2">
                    <Link to="movies">Movies</Link>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item onClick={() => navigate("food-and-beverages")} className={styles["nav-item"]}>
                <Nav.Link as={"div"} className={styles["nav-link"]} eventKey="link-4">
                    <Link to="food-and-beverages">Food & Beverages</Link>
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};
