import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../../services/auth/context/AuthContext';
import { Button, Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import './NavMenuPhone.css';
const NavMenuPhone = () => {
    const { token, handleLogout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleOpen = () => {
        setOpen(true);
        setLoading(false);
    };

    const handleClose = () => {
        setOpen(false);
        setLoading(false);
    };

    useEffect(() => {});
    if (loading === true) {
        <>....</>;
    }
    return (
        <>
            <div className="bar_mobile-icon" onClick={handleOpen}>
                <svg className="bar_mobile-btn" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="nav_menu_mobile">
                    <Button onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                        </svg>
                    </Button>

                    <ul className="nav_menu_mobile-ul" id="test">
                        <Button className="nav_menu_mobile-li" onClick={handleClose}>
                            <Link to="/home" className="nav_menu_mobile-link">
                                Home
                            </Link>
                        </Button>
                        <Button className="nav_menu_mobile-li" onClick={handleClose}>
                            <Link to="/contact" className="nav_menu_mobile-link">
                                Contact
                            </Link>
                        </Button>
                        <Button className="nav_menu_mobile-li" onClick={handleClose}>
                            <Link to="/about" className="nav_menu_mobile-link">
                                About
                            </Link>
                        </Button>
                        <Button className="nav_menu_mobile-li" onClick={handleClose}>
                            {token.token ? (
                                <div onClick={handleLogout} className="nav_menu_mobile-link">
                                    Logout
                                </div>
                            ) : (
                                <Link to="/signup" className="nav_menu_mobile-link" onClick={handleClose}>
                                    SIGNUP
                                </Link>
                            )}
                        </Button>
                    </ul>
                </div>
            </Dialog>
            {/* {show ? (
                <div className="nav_menu_mobile">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" onClick={handle}>
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                    </svg>

                    <ul className="nav_menu_mobile-ul" id="test">
                        <li className="nav_menu_mobile-li">
                            <Link to="/home" className="nav_menu_mobile-link" onClick={() => handle()}>
                                Home
                            </Link>
                        </li>
                        <li className="nav_menu_mobile-li">
                            <Link to="/contact" className="nav_menu_mobile-link" onClick={() => handle()}>
                                Contact
                            </Link>
                        </li>
                        <li className="nav_menu_mobile-li">
                            <Link to="/about" className="nav_menu_mobile-link" onClick={() => handle()}>
                                About
                            </Link>
                        </li>
                        <li className="nav_menu_mobile-li">
                            {token.token ? (
                                <div onClick={handleLogout} className="nav_menu_mobile-link">
                                    Logout
                                </div>
                            ) : (
                                <Link to="/signup" className="nav_menu_mobile-link" onClick={() => handle()}>
                                    SIGNUP
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            ) : null} */}
        </>
    );
};

export default NavMenuPhone;
