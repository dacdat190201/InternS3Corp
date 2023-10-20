import React from 'react';
import './MainLeft.css';
const MainLeft = () => {
    return (
        <div className="left__container">
            <div>
                <h2>Overview</h2>
                <div className="left__top">
                    <div className="left__top-left">
                        <div className="top__left-one">
                            <h4>Balance</h4>
                            <h2>$ 25.364</h2>
                        </div>
                        <div className="top__left-one">
                            <h4>Credit limit</h4>
                            <h2>$ 7.751</h2>
                        </div>
                        <button> Make a payments</button>
                    </div>

                    <div className="left__top-right">da</div>
                </div>
            </div>
            <div>
                <h2>Transactions</h2>
                <div className="left__bottom">a</div>
            </div>
        </div>
    );
};

export default MainLeft;
