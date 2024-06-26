import { useRef, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "../../../common/components/Button/Button";
import styles from "./SideNav.module.scss";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";

export const SideNav = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const linkRefs = useRef<HTMLAnchorElement[]>([]);

    const handleTabClick = (tabIndex: number) => {
        handleClose();
        linkRefs.current[tabIndex].click();
    };

    const user = useSelector((state: IRootState) => state.user);

    return (
        <>
            <Button onClick={handleShow} additionalClasses={`me-2 ${styles["side-nav-button"]}`}>
                Menu
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu {user.firstName ? `- ${user.firstName} ${user.lastName}` : ''}</Offcanvas.Title>
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

                        {user.email && 
                            <Nav.Item onClick={() => handleTabClick(3)}>
                            <Nav.Link eventKey="third">
                                <Link ref={(el) => (el != null ? (linkRefs.current[3] = el) : {})} to="/logout">
                                    Logout
                                </Link>
                            </Nav.Link>
                        </Nav.Item>
                        }
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};
