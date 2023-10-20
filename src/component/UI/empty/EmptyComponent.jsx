import React from 'react';
import './EmptyComponent.css';
import { Link } from 'react-router-dom';
const EmptyComponent = () => {
    return (
        <div className="main__contact">
            <div className="error__404">
                <div className="error__container">
                    <h1>Is Empty</h1>
                </div>
                <div className="error-btn">
                    <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                        <button>Go to Shopping</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmptyComponent;
