import React, { useContext, useEffect } from 'react';
import BarBack from '../../../../common/BarBack';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../../services/auth/context/AuthContext';
import './PaymentMethod.css';
const PaymentMethod = () => {
    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
    }, [token.token, navigate]);
    return (
        <div className="checkoutMobile">
            <div>
                <BarBack title="Payment methods" link="viewcart/checkout" />
            </div>
            <div>
                <h4>Your payments cards</h4>
                <div></div>
            </div>
        </div>
    );
};

export default PaymentMethod;
