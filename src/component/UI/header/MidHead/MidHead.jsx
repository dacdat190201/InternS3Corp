import React, { Suspense, useContext, useState } from 'react';
import './Midhead.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
import { Avatar, Badge, CircularProgress } from '@mui/material';
import AuthContext from '../../../../services/auth/context/AuthContext';
import '../MidHead/navMenuPhone/NavMenuPhone.css';
import NavMenuPhone from './navMenuPhone/NavMenuPhone';
const Search = React.lazy(() => import('../../searching/Search'));

function MidHead() {
    const currentURL = window.location.href;
    const pathSegments = currentURL.split('/');
    const currentNav = pathSegments[pathSegments.length - 1];
    const [activeMenu, setActiveMenu] = useState(currentNav);
    const { token, logout, getCartQuantify, getLengthFavorites } = useContext(AuthContext);

    const handleLogout = () => {
        logout(token);
    };
    return (
        <div className="container-md" style={{ maxWidth: 1170 }}>
            <div className="navbar" id="nav-repsonse">
                <h4 className="mb-0 logo" to="/home">
                    <Link
                        to="/"
                        style={{ textDecoration: 'none', color: 'black' }}
                        className={activeMenu === 'logo' ? '' : ''}
                        onClick={() => setActiveMenu('logo')}
                    >
                        Exclusive
                    </Link>
                </h4>
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
                    <ul className="nav__menu">
                        <Link className="nav__li" to={'/home'}>
                            <h3
                                className={'nav__link ' + (activeMenu === 'home' ? 'nav-active' : 'nav__link')}
                                onClick={() => setActiveMenu('home')}
                            >
                                Home
                            </h3>
                        </Link>
                        <Link className="nav__li" to={'/contact'}>
                            <h3
                                className={'nav__link ' + (activeMenu === 'contact' ? 'nav-active' : 'nav__link')}
                                onClick={() => setActiveMenu('contact')}
                            >
                                Contact
                            </h3>
                        </Link>
                        <Link className="nav__li" to="/about">
                            <h3
                                className={'nav__link ' + (activeMenu === 'about' ? 'nav-active' : 'nav__link')}
                                onClick={() => setActiveMenu('about')}
                            >
                                About
                            </h3>
                        </Link>
                        {token.token ? null : (
                            <Link className="nav__li">
                                <Link
                                    to="/signup"
                                    className={'nav__link ' + (activeMenu === 'signup' ? 'nav-active' : 'nav__link')}
                                    onClick={() => setActiveMenu('signup')}
                                >
                                    Sign Up
                                </Link>
                            </Link>
                        )}
                    </ul>
                </div>
                <div className="searchbox">
                    <Suspense fallback={<CircularProgress />}>
                        <Search />
                    </Suspense>

                    <div className="searchbox-btn">
                        <Badge badgeContent={getLengthFavorites()} color="primary">
                            <Link to="/favorites" className="display__icon">
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
                                className={activeMenu === 'logo' ? 'display__icon' : 'display__icon'}
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
                                <div className="btn-group">
                                    <button
                                        className="btn btn-secondary btn-sm p-0 rounded-circle"
                                        id="dropdownMenuButton"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                    >
                                        <Avatar alt={token.username} src={token.image} />
                                    </button>
                                    <ul className="dropdown-menu p-2" aria-labelledby="dropdownMenuButton">
                                        {/* <li className="dropdown-item">
                                            <Link
                                                to={`/myaccount`}
                                                style={{ textDecoration: 'none', color: 'black' }}
                                                onClick={handleClose}
                                            >
                                                Main
                                            </Link>
                                        </li> */}
                                        {/* <li className="dropdown-item">
                                            <Link
                                                to={`/myaccount/profile/${token.username}`}
                                                style={{ textDecoration: 'none', color: 'black' }}
                                                onClick={handleClose}
                                            >
                                                Profile
                                            </Link>
                                        </li> */}
                                        <li className="dropdown-item" role="button">
                                            <Link
                                                to={`/myaccount/${token.username}/history`}
                                                style={{ textDecoration: 'none', color: 'black' }}
                                            >
                                                Order History
                                            </Link>
                                        </li>
                                        {/* <li className="dropdown-item" role="button">
                                            <Link
                                                to={`/myaccount/profile/${token.username}`}
                                                style={{ textDecoration: 'none', color: 'black' }}
                                            >
                                                Checkout2
                                            </Link>
                                        </li> */}
                                        <li className="dropdown-item" role="button">
                                            <Link
                                                to={`/myaccount/${token.username}/checkout`}
                                                style={{ textDecoration: 'none', color: 'black' }}
                                            >
                                                View Cart
                                            </Link>
                                        </li>

                                        <li
                                            className="dropdown-item"
                                            onClick={handleLogout}
                                            style={{ cursor: 'pointer' }}
                                            role="button"
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : // <div className="web__avatar-token">
                        //     <Stack
                        //         direction="row"
                        //         alignItems="center"
                        //         spacing={{ xs: 0.5, sm: 1.5 }}
                        //         sx={{ color: 'black' }}
                        //     >
                        //         <Button
                        //             onClick={handleClick}
                        //             endIcon={<KeyboardArrowDown />}
                        //             id="basic-button"
                        //             aria-controls={open ? 'basic-menu' : undefined}
                        //             aria-haspopup="true"
                        //             aria-expanded={open ? 'true' : undefined}
                        //             sx={{ color: 'black' }}
                        //         >
                        //             <Avatar alt={token.username} src={token.image} />
                        //         </Button>
                        //         <Menu
                        //             id="basic-menu"
                        //             anchorEl={anchorEl}
                        //             open={open}
                        //             onClose={handleClose}
                        //             MenuListProps={{
                        //                 'aria-labelledby': 'basic-button',
                        //             }}
                        //         >
                        //             <Link
                        //                 to={`/myaccount`}
                        //                 style={{ textDecoration: 'none', color: 'black' }}
                        //                 onClick={handleClose}
                        //             >
                        //                 <MenuItem>Main</MenuItem>
                        //             </Link>
                        //             <Link
                        //                 to={`/myaccount/profile/${token.username}`}
                        //                 style={{ textDecoration: 'none', color: 'black' }}
                        //                 onClick={handleClose}
                        //             >
                        //                 <MenuItem>Profile</MenuItem>
                        //             </Link>

                        //             <Link
                        //                 to={`/myaccount/${token.username}/checkout`}
                        //                 style={{ textDecoration: 'none', color: 'black' }}
                        //                 onClick={handleClose}
                        //             >
                        //                 <MenuItem>View Cart</MenuItem>
                        //             </Link>
                        //             <Link
                        //                 to={`/myaccount/${token.username}/history`}
                        //                 style={{ textDecoration: 'none', color: 'black' }}
                        //                 onClick={handleClose}
                        //             >
                        //                 <MenuItem>Order History</MenuItem>
                        //             </Link>

                        //             <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        //         </Menu>
                        //     </Stack>
                        // </div>
                        null}
                    </div>

                    <NavMenuPhone />
                </div>
            </div>
        </div>
    );
}

export default MidHead;
