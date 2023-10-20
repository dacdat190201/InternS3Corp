import React from 'react';
import Navbar from '../../../../component/UI/myaccount/nav/Navbar';

const WaitingOrders = () => {
    return (
        <>
            <div className="my__top">
                <div className="my__top-title">
                    <p>My Account</p>&nbsp;/ &nbsp;
                    <p>View Cart /&nbsp;Checkout /&nbsp;</p>
                    <p style={{ fontWeight: 'bold' }}>Confirm</p>
                </div>
                <Navbar />
            </div>
            <div className="checkout__ship" style={{ marginTop: '40px' }}>
                <div className="checkout__ship-item">
                    <i class="fa-regular fa-clipboard"></i>
                </div>
                <div className="checkout__ship-hr" style={{ backgroundColor: '#DB4444' }}></div>
                <div className="checkout__ship-item" style={{ backgroundColor: '#2de000' }}>
                    <i className="fa-solid fa-check"></i>
                </div>
                <div className="checkout__ship-hr"></div>
                <div className="checkout__ship-item">3</div>
            </div>
        </>
    );
};

export default WaitingOrders;
