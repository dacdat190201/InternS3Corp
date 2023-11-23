import React from 'react';
import './Error.css';
import BreadcurmbNavigation from '../../component/common/BreadcurmbNavigation';
import ButtonView from '../../component/common/ButtonView';
import { Link } from 'react-router-dom';
function Error({ props, descrip, button, title }) {
    return (
        <>
            <div className="main__error">
                <BreadcurmbNavigation props={title} />
                <div className="error__404">
                    <div className="error__container">
                        <h1>{props}</h1>
                        <p>{descrip}</p>
                        {/* <h1>404 Not Found</h1>
                        <p>Your visited page not found. You may go home page.</p> */}
                    </div>
                    <Link to="/products" className="error-btn">
                        <ButtonView props={button} />
                    </Link>
                </div>
            </div>
            <div className="main__error-mobile">
                <div className="error__404-mobile">
                    <div className="error__container">
                        <img src={require('../../assets/slide/bags.png')} alt="shopping none" />
                    </div>
                    <Link to="/products" className="error-btn">
                        <ButtonView props={button} />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Error;
