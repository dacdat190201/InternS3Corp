import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../services/auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
const Checkout = React.lazy(() => import('./placerOrder/Checkout'));
const CheckoutMain = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
    }, [token.token, navigate]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <Checkout />
        </>
    );
};

export default CheckoutMain;
