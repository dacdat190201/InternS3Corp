import React, { Suspense, useContext, useState } from 'react';
import './Midhead.css';
import MobileMidle from './mobile_midle/MobileMidle';
import { Link } from 'react-router-dom';
import { Avatar, Badge, Button, CircularProgress, Menu, MenuItem, Stack } from '@mui/material';
import AuthContext from '../../../../services/auth/context/AuthContext';
import { KeyboardArrowDown } from '@mui/icons-material';
import '../MidHead/navMenuPhone/NavMenuPhone.css';
const Search = React.lazy(() => import('../../searching/Search'));

function MidHead() {
    const currentURL = window.location.href;
    const pathSegments = currentURL.split('/');
    const currentNav = pathSegments[pathSegments.length - 1];
    const [show, setShow] = useState(false);
    const [activeMenu, setActiveMenu] = useState(currentNav);
    const { token, logout, getCartQuantify, getLengthFavorites } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handle = () => {
        setShow(!show);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout(token);
    };

    return (
        <div className="main">
            <div className="navbar" id="nav-repsonse">
                <div className="logo">
                    <h2>
                        <Link
                            to="/home"
                            style={{ textDecoration: 'none', color: 'black' }}
                            className={activeMenu === 'logo' ? '' : ''}
                            onClick={() => setActiveMenu('logo')}
                        >
                            Exclusive
                        </Link>
                    </h2>
                </div>
                <div className="logo__mobile">
                    <h2>
                        <Link
                            to="/home"
                            style={{ textDecoration: 'none', color: '#fff' }}
                            className={activeMenu === 'logo' ? '' : ''}
                            onClick={() => setActiveMenu('logo')}
                        >
                            E
                        </Link>
                    </h2>
                </div>
                <div className="menu">
                    <ul className="nav_menu">
                        <li className="nav_li">
                            <Link
                                to={'/home'}
                                className={'nav_link ' + (activeMenu === 'home' ? 'nav-active' : 'nav_link')}
                                onClick={() => setActiveMenu('home')}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav_li">
                            <Link
                                to={'/contact'}
                                className={'nav_link ' + (activeMenu === 'contact' ? 'nav-active' : 'nav_link')}
                                onClick={() => setActiveMenu('contact')}
                            >
                                Contact
                            </Link>
                        </li>
                        <li className="nav_li">
                            <Link
                                to="/about"
                                className={'nav_link ' + (activeMenu === 'about' ? 'nav-active' : 'nav_link')}
                                onClick={() => setActiveMenu('about')}
                            >
                                About
                            </Link>
                        </li>
                        {token.token ? null : (
                            <li className="nav_li">
                                <Link
                                    to="/signup"
                                    className={'nav_link ' + (activeMenu === 'signup' ? 'nav-active' : 'nav_link')}
                                    onClick={() => setActiveMenu('signup')}
                                >
                                    Sign Up / Sign In
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="searchbox">
                    <Suspense fallback={<CircularProgress />}>
                        <Search />
                    </Suspense>
                    <div className="searchbox-btn">
                        <MobileMidle />
                        <Badge badgeContent={getLengthFavorites()} color="primary">
                            <Link to="/favorites">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </Badge>

                        <Badge badgeContent={getCartQuantify()} color="primary">
                            <Link
                                to="/cart"
                                className={activeMenu === 'logo' ? '' : ''}
                                onClick={() => setActiveMenu('logo')}
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M3 5H7L10 22H26"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </Badge>

                        {token.token ? (
                            <div className="web__avatar-token">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={{ xs: 0.5, sm: 1.5 }}
                                    sx={{ color: 'black' }}
                                >
                                    <Button
                                        onClick={handleClick}
                                        endIcon={<KeyboardArrowDown />}
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        sx={{ color: 'black' }}
                                    >
                                        <Avatar alt={token.username} src={token.image} />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <Link
                                            to={`/myaccount/profile/${token.username}`}
                                            style={{ textDecoration: 'none', color: 'black' }}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        </Link>
                                        <Link to={`/myaccount`} style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                        </Link>

                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                                </Stack>
                            </div>
                        ) : null}
                    </div>
                    <div
                        className="bar_mobile-icon"
                        onClick={() => {
                            handle();
                        }}
                        //onClick={handleClickOpen}
                    >
                        <svg
                            className="bar_mobile-btn"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.5em"
                            viewBox="0 0 448 512"
                        >
                            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                        </svg>
                    </div>
                    {/* <Dialog
                        open={open1}
                        onClose={handleClickClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <div className="nav_menu_mobile">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                                onClick={handleClickClose}
                            >
                                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                            </svg>

                            <ul className="nav_menu_mobile-ul" id="test">
                                <Button className="nav_menu_mobile-li" onClick={handleClickClose}>
                                    <Link to="/home" className="nav_menu_mobile-link" onClick={handleClickClose}>
                                        Home
                                    </Link>
                                </Button>
                                <Button className="nav_menu_mobile-li" onClick={handleClickClose}>
                                    <Link to="/contact" className="nav_menu_mobile-link" onClick={handleClickClose}>
                                        Contact
                                    </Link>
                                </Button>
                                <Button className="nav_menu_mobile-li" onClick={handleClickClose}>
                                    <Link to="/about" className="nav_menu_mobile-link" onClick={handleClickClose}>
                                        About
                                    </Link>
                                </Button>
                                <Button className="nav_menu_mobile-li" onClick={handleClickClose}>
                                    {token.token ? (
                                        <div onClick={handleLogout} className="nav_menu_mobile-link">
                                            Logout
                                        </div>
                                    ) : (
                                        <Link to="/signup" className="nav_menu_mobile-link" onClick={handleClickClose}>
                                            SIGNUP
                                        </Link>
                                    )}
                                </Button>
                            </ul>
                        </div>
                    </Dialog> */}
                    {show ? (
                        <div className="nav_menu_mobile">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" onClick={handle}>
                                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                            </svg>

                            <ul className="nav_menu_mobile-ul" id="test">
                                <Button className="nav_menu_mobile-li">
                                    <Link to="/home" className="nav_menu_mobile-link" onClick={() => handle()}>
                                        Home
                                    </Link>
                                </Button>
                                <Button className="nav_menu_mobile-li">
                                    <Link to="/contact" className="nav_menu_mobile-link" onClick={() => handle()}>
                                        Contact
                                    </Link>
                                </Button>
                                <Button className="nav_menu_mobile-li">
                                    <Link to="/about" className="nav_menu_mobile-link" onClick={() => handle()}>
                                        About
                                    </Link>
                                </Button>
                                <Button className="nav_menu_mobile-li">
                                    {token.token ? (
                                        <div onClick={handleLogout} className="nav_menu_mobile-link">
                                            Logout
                                        </div>
                                    ) : (
                                        <Link to="/signup" className="nav_menu_mobile-link" onClick={() => handle()}>
                                            SIGNUP
                                        </Link>
                                    )}
                                </Button>
                            </ul>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default MidHead;
