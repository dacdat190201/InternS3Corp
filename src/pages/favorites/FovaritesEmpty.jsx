import React from 'react';
import './Favorites.css';
import '../404error/Error.css';
import { Link } from 'react-router-dom';
const FovaritesEmpty = () => {
    return (
        <div style={{ marginBottom: 140 }}>
            <hr></hr>
            <div className="main__contact">
                <div className="about__top">
                    Home/<p> cart </p>
                </div>
                <div className="error__404">
                    <div className="error__container">
                        <h1>My Favorites Empty</h1>
                    </div>
                    <Link to="/products" style={{ textDecoration: 'none' }} className="error-btn">
                        <button>Go to Shopping</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FovaritesEmpty;
