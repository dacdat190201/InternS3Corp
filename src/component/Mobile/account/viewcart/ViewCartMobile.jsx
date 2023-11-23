import React, { useContext, useEffect } from 'react';
import './ViewCartMobile.css';
import '../../../../pages/404error/Error.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../services/auth/context/AuthContext';
import BarBack from '../../../common/BarBack';
import ButtonView from '../../../common/ButtonView';
const ViewCartMobile = () => {
    const { getCartTotal, cartItems, inforUser, token, removeCart } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
    }, [token.token, navigate]);
    const subtotal = (item) => {
        return item.item.price * item.quantity;
    };
    if (inforUser.length === 0 && cartItems.length === 0) {
        return (
            <div className="ProfileM__container">
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
            <div className="ProfileM__container">
                <div>
                    <BarBack link="home" />
                </div>

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
        <div className="ProfileM__container">
            <div>
                <BarBack link="home" title="View Cart" />
            </div>

            <div className="viewCart__ListItem">
                {cartItems.map((item, key) => {
                    return (
                        <div className="viewCart-Items" key={key}>
                            <Link to={`/products/${item.item.id}`} className="viewCart__Items-img">
                                <img src={item.item.thumbnail} alt={item.item.title} />
                            </Link>
                            <div className="viewCart__Items-content">
                                <div className="viewCart__Items-title">
                                    <div className="titleItem500 titlenameCheckM">{item.item.title}</div>
                                    <DeleteForeverIcon
                                        onClick={() => removeCart(item.item.id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <div className="titleDescrip">Discount : {item.item.discountPercentage} %</div>
                                <div className="titleDescrip">quantity: {item.quantity}</div>
                                <div className="viewCart__Items-total PriceName">{subtotal(item)}$</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="VC__discount-total">
                <p>Total amount</p>
                <div className="PriceTotal">{getCartTotal()}$</div>
            </div>
            <Link to="/viewcart/checkout" className="VC__discount-btnCheckout">
                <ButtonView props="Check Out" size="mobile" />
            </Link>
        </div>
    );
};

export default ViewCartMobile;
