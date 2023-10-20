import React from 'react';
import { Link } from 'react-router-dom';
import '../../contact/ContactMain/Contact.css';
import '../../404error/Error.css';
const CartEmpty = () => {
    return (
        <div>
            <hr></hr>
            <div className="main__contact">
                <div className="contact__top">
                    Home/<p> cart </p>
                </div>
                <div className="error__404">
                    <div className="error__container">
                        <h1>Your is cart empty</h1>
                    </div>
                    <div className="error-btn">
                        <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                            <button>Go to Shopping</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartEmpty;
