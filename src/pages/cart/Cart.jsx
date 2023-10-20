import React, { useContext, useState } from 'react';
import './Cart.css';
import '../../pages/about/aboutMain/About.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import AuthContext from '../../services/auth/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CartEmpty from '../../pages/cart/cartEmpty/CartEmpty';
import json from '../../datafake/chudeData.json';
import ViewCartMobile from '../../component/Mobile/account/viewcart/ViewCartMobile';
const Cart = () => {
    const { token, getCartTotal, cartItems, clearCart, removeCart } = useContext(AuthContext);
    const [discount, setDiscount] = useState('');
    const [text, setText] = useState('');
    const [dis, setDis] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (!token.token) {
            navigate('/signin');
        }
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
                <CartEmpty />
            </div>
        );

    return (
        <>
            <div className="cart__AllMain">
                <hr></hr>
                <div className="about__top">
                    Home/<p> Cart</p>
                </div>

                <div className="cart__main">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bolder' }}>Product</TableCell>
                                    <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                        Price
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                        Quantity
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                        Subtotal
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                        Handle
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
                                                        <img src={item.item.images[0]} alt="" width={54} height={54} />
                                                        {item.item.title}
                                                    </div>
                                                </Link>
                                            </TableCell>

                                            <TableCell style={{ textAlign: 'center' }} align="right">
                                                {item.item.price}
                                            </TableCell>
                                            <TableCell style={{ textAlign: 'center' }} align="right">
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell style={{ textAlign: 'center' }} align="right">
                                                ${subTotal(item)}
                                            </TableCell>
                                            <TableCell style={{ textAlign: 'center' }} align="right">
                                                <i
                                                    className="fa-solid fa-trash"
                                                    onClick={() => removeCart(item.item.id)}
                                                ></i>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="cart__btn">
                        <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                            <button>
                                <h3>Return to shop</h3>
                            </button>
                        </Link>

                        <button
                            onClick={() => {
                                clearCart();
                                alert('Cart Empty, Return to Card');
                            }}
                        >
                            <h3>Clear Cart</h3>
                        </button>
                    </div>
                    <div className="cart__bottom">
                        {/* <div className="cart-coupon">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                onChange={(e) => setText(e.target.value)}
                                name="coupon_cart"
                                id="coupon_cart"
                            />
                            <button onClick={() => getDiscount()}>Apply Coupon</button>
                        </div> */}

                        <div className="cart-total">
                            <div className="cart-container">
                                <h3>Cart total</h3>
                                <div className="cart-center">
                                    <div>Subtotal:</div>
                                    <div>${getCartTotal()}</div>
                                </div>
                                <hr></hr>
                                {dis ? (
                                    <>
                                        <div className="cart-center">
                                            <div>Discount:</div>
                                            <div>${dis.discount}</div>
                                        </div>
                                        <hr></hr>
                                    </>
                                ) : null}

                                <div className="cart-center">
                                    <div>Total:</div>
                                    <div style={{ fontWeight: 'bold', color: 'red' }}>${allTotal()}</div>
                                </div>
                                <div className="cart-btn">
                                    <Link to={`/myaccount/${token.username}/checkout`}>
                                        <button>Process to checkout</button>
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
