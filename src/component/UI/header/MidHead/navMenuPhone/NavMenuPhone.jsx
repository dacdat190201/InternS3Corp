import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../../../../services/auth/context/AuthContext';
import { Button, Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import './NavMenuPhone.css';
const NavMenuPhone = () => {
    const { token, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleOpen = () => {
        setOpen(true);
        setLoading(false);
    };
    const handleLogout = () => {
        logout(token);
    };
    const handleClose = () => {
        setOpen(false);
        setLoading(false);
    };
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle('responsive_nav');
    };
    useEffect(() => {});
    if (loading === true) {
        <>....</>;
    }
    return (
        <>
            <svg
                onClick={showNavbar}
                className="bar_mobile-btn"
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 448 512"
            >
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>

            <div className="head__mobile">
                <div className="navbar__mobile" ref={navRef}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 20 }}>
                        <h3 className="logo_navbar" style={{ fontWeight: 700 }}>
                            Exclusive
                        </h3>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={showNavbar}
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 1.2L10.8 0L6 4.8L1.2 0L0 1.2L4.8 6L0 10.8L1.2 12L6 7.2L10.8 12L12 10.8L7.2 6L12 1.2Z"
                                fill="#212529"
                            />
                        </svg>
                    </div>
                    <ul className="navbar__mobile-ul">
                        <li>
                            <Link
                                to={'/home'}
                                onClick={showNavbar}
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16,
                                }}
                            >
                                <i className="fa-solid fa-house"></i>
                                <h3>Home</h3>
                            </Link>
                        </li>
                        <hr></hr>
                        <li>
                            <Link
                                to={'/contact'}
                                onClick={showNavbar}
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex',

                                    alignItems: 'center',
                                    gap: 16,
                                }}
                            >
                                <i className="fa-solid fa-envelope"></i>
                                <h3>Contact</h3>
                            </Link>
                        </li>
                        <hr></hr>
                        <li>
                            <Link
                                to={'/about'}
                                onClick={showNavbar}
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex',

                                    alignItems: 'center',
                                    gap: 16,
                                }}
                            >
                                <i className="fa-brands fa-weixin"></i>
                                <h3>About</h3>
                            </Link>
                        </li>
                        <hr></hr>
                        {token.token ? (
                            <li onClick={handleLogout}>
                                <div
                                    // onClick={showNavbar}
                                    style={{
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                    }}
                                >
                                    <i className="fa-solid fa-user-tie"></i>
                                    <h3>Logout</h3>
                                </div>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to={'/signup'}
                                    onClick={showNavbar}
                                    style={{
                                        textDecoration: 'none',
                                        display: 'flex',

                                        alignItems: 'center',
                                        gap: 16,
                                    }}
                                >
                                    <i className="fa-solid fa-user-tie"></i>
                                    <h3>Signup</h3>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavMenuPhone;
