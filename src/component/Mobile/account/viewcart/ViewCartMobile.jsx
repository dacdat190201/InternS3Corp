import React, { useContext, useEffect, useRef, useState } from 'react';
import './ViewCartMobile.css';
import '../../../../pages/404error/Error.css';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../services/auth/context/AuthContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const ViewCartMobile = () => {
    const { getCartTotal, cartItems, inforUser, token, removeCart } = useContext(AuthContext);
    const ref = useRef();
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [token.token, navigate]);
    const subtotal = (item) => {
        return item.item.price * item.quantity;
    };
    if (inforUser.length === 0 && cartItems.length === 0) {
        return (
            <div style={{ marginBottom: 80 }}>
                <div className="error__404">
                    <div className="error__container">
                        <img src={require('../../../../assets/slide/bags.png')} alt="shopping none" />
                    </div>
                    <div className="error-btn">
                        <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                            <button>Go to Shopping</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    if (cartItems.length === 0) {
        return (
            <div className="ProfileM__container" ref={ref}>
                <div className="ViewCart__Top">
                    <Link style={{ color: 'black' }} to={'/profile'}>
                        <ArrowBackIosIcon />
                    </Link>
                    <SearchIcon />
                </div>
                <h2>Billing Details</h2>
                <div className="viewCart__ListItem">
                    <div style={{ marginBottom: 80 }}>
                        <div className="error__404">
                            <div className="error__container">
                                <img src={require('../../../../assets/slide/bags.png')} alt="shopping none" />
                            </div>
                            <div className="error-btn">
                                <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                                    <button>Go to Shopping</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="ProfileM__container" ref={ref}>
            <div className="ViewCart__Top">
                <Link style={{ color: 'black' }} to={'/profile'}>
                    <ArrowBackIosIcon />
                </Link>
                <SearchIcon />
            </div>
            <h2>Billing Details</h2>
            <div className="viewCart__ListItem">
                {cartItems.map((item, key) => {
                    return (
                        <div className="viewCart-Items" key={key}>
                            <div className="viewCart__Items-img">
                                <img src={item.item.thumbnail} alt={item.item.title} />
                            </div>
                            <div className="viewCart__Items-content">
                                <div className="viewCart__Items-title">
                                    <h4>{item.item.title}</h4>
                                    <DeleteForeverIcon onClick={() => removeCart(item.item.id)} />
                                </div>
                                <div className="viewCart__Items-color">
                                    <p>Discount :10%</p>
                                </div>
                                <div className="viewCart__Items-color">
                                    <p>quantity: {item.quantity}</p>
                                </div>
                                <div className="viewCart__Items-total">{subtotal(item)}$</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="viewCart__discount">
                <input type="text" onClick={() => setClick(!click)} />

                <div className="VC__discount-btn">
                    <ArrowForwardIcon />
                </div>
            </div>
            {click && <div className="VC__discount-panelDiscount">abs</div>}
            <div className="VC__discount-total">
                <p>Total amount</p>
                <h4>{getCartTotal()}$</h4>
            </div>
            <Link to="/viewcart/checkout" className="VC__discount-btnCheckout">
                CHECK OUT
            </Link>
        </div>
    );
};

export default ViewCartMobile;
