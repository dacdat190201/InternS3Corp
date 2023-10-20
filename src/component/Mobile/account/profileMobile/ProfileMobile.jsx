import React, { useContext, useEffect, useRef } from 'react';
import './ProfileMobile.css';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../services/auth/context/AuthContext';
const ProfileMobile = () => {
    const { token, cartItems, inforUser, history } = useContext(AuthContext);
    const ref = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token.token) {
            navigate('/signin');
        }
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [token.token, navigate]);

    return (
        <div className="ProfileM__container" ref={ref}>
            <div className="ProfileM__searchIcon">
                <SearchIcon />
            </div>
            <h2>My Profile</h2>
            <div className="ProfileM__avatar">
                <Avatar alt="Remy Sharp" src={token.image} sx={{ width: 64, height: 64 }} />
                <div>
                    <h4>
                        {token.firstName} &nbsp; {token.lastName}
                    </h4>
                    <p> {token.email} </p>
                </div>
            </div>
            <Link to="/viewcart" className="ProfileM__center">
                <div className="ProfileM__center-title">
                    <h4>View Cart</h4>
                    <p>Already have {cartItems.length} item cart</p>
                </div>
                <div>
                    <NavigateNextIcon fontSize="small" />
                </div>
            </Link>
            <Link to="/myorder" className="ProfileM__center">
                <div className="ProfileM__center-title">
                    <h4>My Orders</h4>
                    <p>Already have {inforUser.length} orders</p>
                </div>
                <div>
                    <NavigateNextIcon fontSize="small" />
                </div>
            </Link>
            <Link to="/shippingsave" className="ProfileM__center">
                <div className="ProfileM__center-title">
                    <h4>Shipping Address</h4>
                    <p>{history.length} address</p>
                </div>
                <div>
                    <NavigateNextIcon fontSize="small" />
                </div>
            </Link>
            <div className="ProfileM__center">
                <div className="ProfileM__center-title">
                    <h4>Payment Methods</h4>
                    <p>Visa *34</p>
                </div>
                <div>
                    <NavigateNextIcon fontSize="small" />
                </div>
            </div>
            <div className="ProfileM__center">
                <div className="ProfileM__center-title">
                    <h4>Promocodes</h4>
                    <p>You have special promocodes</p>
                </div>
                <div>
                    <NavigateNextIcon fontSize="small" />
                </div>
            </div>
            <div className="ProfileM__center">
                <div className="ProfileM__center-title">
                    <h4>My Reviews</h4>
                    <p>Reviews for 4 items</p>
                </div>
                <div>
                    <NavigateNextIcon fontSize="small" />
                </div>
            </div>
            <div className="ProfileM__center">
                <div className="ProfileM__center-title">
                    <h4>Setting</h4>
                    <p>Notifications, Passwords</p>
                </div>
                <div>
                    <NavigateNextIcon fontSize="small" />
                </div>
            </div>
        </div>
    );
};

export default ProfileMobile;
