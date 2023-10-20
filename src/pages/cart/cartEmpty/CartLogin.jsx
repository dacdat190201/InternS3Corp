import React from 'react';

const CartLogin = () => {
    return (
        <div>
            <hr></hr>
            <div className="main__contact">
                <div className="contact__top">
                    Home/<p> cart </p>
                </div>
                <div className="error__404">
                    <div className="error__container">
                        <h1>You need to login to use this function</h1>
                    </div>
                    <div className="error-btn">
                        <button>Go to Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartLogin;
