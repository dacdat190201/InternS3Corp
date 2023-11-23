import React, { useContext, useRef, useState } from 'react';
import './Cart.css';
import '../../pages/about/aboutMain/About.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import AuthContext from '../../services/auth/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import json from '../../datafake/chudeData.json';
import ViewCartMobile from '../../component/Mobile/account/viewcart/ViewCartMobile';
import Error from '../404error/Error';
import BreadcurmbNavigation from '../../component/common/BreadcurmbNavigation';
import ButtonView from '../../component/common/ButtonView';
import { ShowAlert, ShowError } from '../../utils/ToastAlert';
const Cart = () => {
    const { token, getCartTotal, cartItems, clearCart, removeCart } = useContext(AuthContext);
    const [discount, setDiscount] = useState('');
    const [text, setText] = useState('');
    const [dis, setDis] = useState('');
    const navigate = useNavigate();
    const ref = useRef(false);
    useEffect(() => {
        if (ref.current) {
            if (!token.token) {
                navigate('/signin');
                ShowError('You need to log in to perform this function');
            }
        }
        return () => {
            ref.current = true;
        };
    }, [token.token, navigate]);

    useEffect(() => {
        setDiscount(json.data);
    }, []);
    const getDiscount = () => {
        if (!text) {
            alert('Please enter discount code');
            setDis(0);
        } else if (!discount.find((item) => item.id === text)) {
            alert('No discount code found');
            setDis(0);
        } else {
            if (discount.find((item) => item.allowance < getCartTotal())) {
                setDis(discount.find((item) => item.id === text));
            } else alert('The condition is not satisfied');
        }
    };
    const subTotal = (item) => {
        return item.item.price * item.quantity;
    };
    const allTotal = () => {
        if (dis) {
            return getCartTotal() - dis.discount;
        } else return getCartTotal();
    };

    if (cartItems.length === 0)
        return (
            <div>
                <Error props="My cart is empty" button="Go to Shopping" title="My Cart" />
            </div>
        );

    return (
        <>
            <div className="cart__AllMain">
                <BreadcurmbNavigation props="My Cart" />
                <div className="cart__main">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bolder' }}>
                                        <div className="titleTable">Product</div>
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                        <div className="titleTable">Price</div>
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                        <div className="titleTable">Quantity</div>
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                        <div className="titleTable">Subtotal</div>
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                        <div className="titleTable">Handle</div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems &&
                                    cartItems.map((item, key) => (
                                        <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                <Link
                                                    to={`/products/${item.item.id}`}
                                                    style={{ color: 'black', textDecoration: 'none' }}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '10px',
                                                        }}
                                                        className="cart_ImageTitle"
                                                    >
                                                        <div className="cart__img">
                                                            <img src={item.item.images[0]} alt="" />
                                                        </div>
                                                        <div className="titleItem500">{item.item.title}</div>
                                                    </div>
                                                </Link>
                                            </TableCell>

                                            <TableCell style={{ textAlign: 'center' }} align="right">
                                                <h3>${item.item.price}</h3>
                                            </TableCell>
                                            <TableCell style={{ textAlign: 'center' }} align="right">
                                                <h3>{item.quantity}</h3>
                                            </TableCell>
                                            <TableCell style={{ textAlign: 'center' }} align="right">
                                                <h3>${subTotal(item)}</h3>
                                            </TableCell>
                                            <TableCell style={{ textAlign: 'center' }} align="right">
                                                <i
                                                    className="fa-solid fa-trash"
                                                    onClick={() => removeCart(item.item.id)}
                                                    style={{ cursor: 'pointer' }}
                                                ></i>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="cart__btn">
                        <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                            <ButtonView props="Return to shop" size="white" />
                        </Link>

                        <div
                            onClick={() => {
                                clearCart();
                                ShowAlert('Cart Empty, Return to Card');
                            }}
                        >
                            <ButtonView props="Clear Cart" size="white" />
                        </div>
                    </div>
                    <div className="cart__bottom">
                        <div className="cart-total">
                            <div className="cart-container">
                                <div className="BreadName">Cart total</div>
                                <div className="cart-center">
                                    <h3>Subtotal:</h3>
                                    <div>${getCartTotal()}</div>
                                </div>
                                <hr></hr>
                                {dis ? (
                                    <>
                                        <div className="cart-center">
                                            <h3>Discount:</h3>
                                            <div>${dis.discount}</div>
                                        </div>
                                        <hr></hr>
                                    </>
                                ) : null}

                                <div className="cart-center">
                                    <h3>Total:</h3>
                                    <div style={{ fontWeight: 'bold', color: 'red' }}>${allTotal()}</div>
                                </div>
                                <div className="cart-btn">
                                    <Link to={`/myaccount/${token.username}/checkout`}>
                                        <ButtonView props="Process to checkout" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ViewCartMobile />
        </>
    );
};

export default Cart;
