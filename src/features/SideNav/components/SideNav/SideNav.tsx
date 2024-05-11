import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import ButtonC from "../../../common/components/ButtonC/ButtonC";
import styles from "./SideNav.module.scss";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export const SideNav = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <ButtonC onClick={handleShow} additionalClasses={`me-2 ${styles["side-nav-button"]}`}>
                Menu
            </ButtonC>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Link to="/" onClick={handleClose}>Home</Link>
                        <Link to="/register" onClick={handleClose}>Register</Link>
                        <Link to="/login" onClick={handleClose}>Login</Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};
