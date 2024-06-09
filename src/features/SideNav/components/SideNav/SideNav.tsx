import { useRef, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "../../../common/components/Button/Button";
import styles from "./SideNav.module.scss";
import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { showAddEditMovieModal } from "../../../../store/addEditMovieModal/addEditMovieModalSlice";
import { showAddCinemaModal } from "../../../../store/addCinemaModal/addCinemaModalSlice";
import { showAddHallModal } from "../../../../store/addHallModal/addHallModalSlice";
import { showAddFoodAndBeverageModal } from "../../../../store/addFoodBeverageModal/addFoodBeverageModalSlice";
import { SettingsModal } from "../SettingsModal/SettingsModal";

export const SideNav = () => {
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    const handleClose = () => setShowOffCanvas(false);
    const handleShow = () => setShowOffCanvas(true);

    const linkRefs = useRef<HTMLAnchorElement[]>([]);

    const handleTabClick = (tabIndex: number) => {
        handleClose();
        linkRefs.current[tabIndex].click();
    };

    const location = useLocation();
    const cinemaMoviesPathPattern = /^\/cinema\/[a-f0-9]{24}\/movies$/;
    const cinemaHallsPathPattern = /^\/cinema\/[a-f0-9]{24}\/halls$/;
    const cinemaFoodAndBeveragesPathPattern = /^\/cinema\/[a-f0-9]{24}\/food-and-beverages$/;

    const dispatch = useDispatch();

    const user = useSelector((state: IRootState) => state.user);

    return (
        <>
            <Offcanvas show={showOffCanvas} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu {user.firstName ? `- ${user.firstName} ${user.lastName}` : ""}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className={`flex-column ${styles["nav"]}`} variant="pills">
                        <Nav.Item onClick={() => handleTabClick(0)}>
                            <Nav.Link eventKey="first">
                                <Link to="/" ref={(el) => (el != null ? (linkRefs.current[0] = el) : {})}>
                                    Home
                                </Link>
                            </Nav.Link>
                        </Nav.Item>

                        {!user.email && (
                            <>
                                <Nav.Item onClick={() => handleTabClick(1)}>
                                    <Nav.Link eventKey="second">
                                        <Link ref={(el) => (el != null ? (linkRefs.current[1] = el) : {})} to="/register">
                                            Register
                                        </Link>
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item onClick={() => handleTabClick(2)}>
                                    <Nav.Link eventKey="third">
                                        <Link ref={(el) => (el != null ? (linkRefs.current[2] = el) : {})} to="/login">
                                            Login
                                        </Link>
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                        )}

                        {user.email && (
                            <>
                                <Nav.Item onClick={() => handleTabClick(3)}>
                                    <Nav.Link eventKey="third">
                                        <Link
                                            ref={(el) => (el != null ? (linkRefs.current[3] = el) : {})}
                                            to="#"
                                            onClick={() => setShowSettingsModal(true)}
                                        >
                                            Settings
                                        </Link>
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item onClick={() => handleTabClick(4)}>
                                    <Nav.Link eventKey="third">
                                        <Link ref={(el) => (el != null ? (linkRefs.current[4] = el) : {})} to="/logout">
                                            Logout
                                        </Link>
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
            <SettingsModal show={showSettingsModal} setShow={setShowSettingsModal} />

            <div className={styles["side-buttons-div"]}>
                <Button onClick={handleShow} additionalClasses={`me-2 ${styles["side-nav-button"]}`}>
                    Menu
                </Button>
                {cinemaMoviesPathPattern.test(location.pathname) && <Button onClick={() => dispatch(showAddEditMovieModal())}>Add Movie</Button>}
                {cinemaHallsPathPattern.test(location.pathname) && <Button onClick={() => dispatch(showAddHallModal())}>Add Hall</Button>}
                {cinemaFoodAndBeveragesPathPattern.test(location.pathname) && (
                    <Button onClick={() => dispatch(showAddFoodAndBeverageModal())}>Add Item</Button>
                )}
                {location.pathname === "/" && <Button onClick={() => dispatch(showAddCinemaModal())}>Add Cinema</Button>}
            </div>
        </>
    );
};
