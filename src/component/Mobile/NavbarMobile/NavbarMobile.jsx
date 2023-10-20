import React, { useState } from 'react';
import './NavbarMobile.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
const NavbarMobile = () => {
    const currentURL = window.location.href;
    const pathSegments = currentURL.split('/');
    const currentNav = pathSegments[pathSegments.length - 1];
    const [activeMenu, setActiveMenu] = useState(currentNav);
    return (
        <div className="NavbarMobile">
            <div className="NavbarMobile__container">
                <Link
                    to="/home"
                    className={activeMenu === 'logo' ? 'NavbarMobile__Click' : 'NavbarMC__ListItem'}
                    onClick={() => setActiveMenu('logo')}
                >
                    <HomeOutlinedIcon />
                    Home
                </Link>
                <Link
                    to="/discounts"
                    className={activeMenu === 'cate' ? 'NavbarMobile__Click' : 'NavbarMC__ListItem'}
                    onClick={() => setActiveMenu('cate')}
                >
                    <SellOutlinedIcon />
                    Coupon
                </Link>
                <Link
                    to="/products"
                    className={activeMenu === 'store' ? 'NavbarMobile__Click' : 'NavbarMC__ListItem'}
                    onClick={() => setActiveMenu('store')}
                >
                    <StorefrontOutlinedIcon />
                    Store
                </Link>
                <Link
                    to="/profile"
                    className={activeMenu === 'account' ? 'NavbarMobile__Click' : 'NavbarMC__ListItem'}
                    onClick={() => setActiveMenu('account')}
                >
                    <AccountCircleOutlinedIcon />
                    Account
                </Link>
                <Link
                    to="/home"
                    className={activeMenu === 'more' ? 'NavbarMobile__Click' : 'NavbarMC__ListItem'}
                    onClick={() => setActiveMenu('store')}
                >
                    <MoreHorizOutlinedIcon />
                    More
                </Link>
            </div>
        </div>
    );
};

export default NavbarMobile;
