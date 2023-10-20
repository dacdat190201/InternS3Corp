import React, { useContext, useEffect, useRef } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../../services/auth/context/AuthContext';
import './PaymentMethod.css';
const PaymentMethod = () => {
    const { token } = useContext(AuthContext);
    const ref = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [token.token, navigate]);
    return (
        <div className="checkoutMobile" ref={ref}>
            <div className="ViewCart__Top">
                <Link style={{ color: 'black' }} to={'/viewcart/checkout'}>
                    <ArrowBackIosIcon />
                </Link>
                <h4>Payment Methods</h4>
                <div></div>
            </div>
            <div>
                <h4>Your payments cards</h4>
                <div></div>
            </div>
        </div>
    );
};

export default PaymentMethod;
