import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../services/auth/context/AuthContext';
import json from '../../../../datafake/chudeData.json';
import emailjs from '@emailjs/browser';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CLIENT_ID } from '../../../../services/config/Config';
const SaveCheck = () => {
    const { getCartTotal, cartItems, addInfor, token, clearCart, changeHistory, history } = useContext(AuthContext);
    const navigate = useNavigate();
    const [discount, setDiscount] = useState('');
    const [text, setText] = useState('');
    const [dis, setDis] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const [orderID, setOrderID] = useState(false);
    const [checkRdo, setCheckRdo] = useState('Cash on delivery');

    useEffect(() => {
        setDiscount(json.data);
        if (!token.token) {
            navigate('/');
        }
    }, [token.token, navigate]);

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
    const allTotal = () => {
        if (dis) {
            return getCartTotal() - dis.discount;
        } else return getCartTotal();
    };

    const subtotal = (item) => {
        return item.item.price * item.quantity;
    };
    // ... state
    useEffect(() => emailjs.init('lKX4rEAkNvWvc6ljz'), []);
    //value form
    //Change primary history
    const handleConfirm = (item) => {
        changeHistory(item);
    };

    useEffect(() => {
        if (success) {
            alert('Payment successful!!');
            console.log('Order successful . Your order id is--', orderID);
        }
    }, [success]);
    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: token.username,
                        amount: {
                            currency_code: 'USD',
                            value: allTotal(),
                        },
                    },
                ],
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        const serviceId = 'service_at226mk';
        const templateId = 'template_dqu6x0y';
        try {
            setLoading(true);
            emailjs.send(serviceId, templateId, {
                from_name: history[0].my_email,
                first_name: history[0].first_name,
                company_name: history[0].company_name,
                address: history[0].town_city,
                town_city: history[0].town_city,
                phone_number: history[0].phone_number,
                my_email: history[0].my_email,
                item_name: cartItems.map((item) => item.item.title),
                item_qty: totalQty(),
                my_discount: dis.discount,
                item_total: getCartTotal(),
                date: new Date(),
                total: allTotal(),
                payment: checkRdo,
                userToken: token.username,
            });
            addInfor({
                item: {
                    from_name: history[0].my_email,
                    first_name: history[0].first_name,
                    company_name: history[0].company_name,
                    address: history[0].address,
                    town_city: history[0].town_city,
                    phone_number: history[0].phone_number,
                    my_email: history[0].my_email,
                    cart: cartItems,
                    my_discount: dis.discount,
                    item_total: getCartTotal(),
                    date: new Date(),
                    total: allTotal(),
                    payment: checkRdo,
                },
                status: {
                    name: 'awaiting',
                    message: [{ title: 'Please confirm your order', date: new Date() }],
                },
            });

            clearCart();
            alert('email successfully sent check inbox');
        } catch (error) {
            alert('404 @gmail.com ***');
        } finally {
            setLoading(false);
        }
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage('An Error occured with your payment ');
    };
    // Add these
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(123456);
        const serviceId = 'service_at226mk';
        const templateId = 'template_dqu6x0y';

        try {
            setLoading(true);
            await emailjs.send(serviceId, templateId, {
                from_name: history[0].my_email,
                first_name: history[0].first_name,
                company_name: history[0].company_name,
                address: history[0].town_city,
                town_city: history[0].town_city,
                phone_number: history[0].phone_number,
                my_email: history[0].my_email,
                item_name: cartItems.map((item) => item.item.title),
                item_qty: totalQty(),
                my_discount: dis.discount,
                item_total: getCartTotal(),
                date: new Date(),
                total: allTotal(),
                payment: checkRdo,
                userToken: token.username,
            });
            addInfor({
                item: {
                    from_name: history[0].my_email,
                    first_name: history[0].first_name,
                    company_name: history[0].company_name,
                    address: history[0].address,
                    town_city: history[0].town_city,
                    phone_number: history[0].phone_number,
                    my_email: history[0].my_email,
                    cart: cartItems,
                    my_discount: dis.discount,
                    item_total: getCartTotal(),
                    date: new Date(),
                    total: allTotal(),
                    payment: checkRdo,
                },
                status: {
                    name: 'confirm',
                    message: [{ title: 'Please confirm your order', date: new Date() }],
                },
            });

            clearCart();
            alert('email successfully sent check inbox');
        } catch (error) {
            alert('404 @gmail.com ***');
        } finally {
            setLoading(false);
        }
    };
    const totalQty = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <>
            <div className="checkout-form">
                <form className="form__input">
                    <input
                        type="text"
                        placeholder="First Name *"
                        name="first_name"
                        value={history[0].first_name}
                        autoComplete="given-name"
                    />

                    <input type="text" placeholder="Last Name" name="company_name" value={history[0].company_name} />

                    <input
                        type="text"
                        placeholder="Street Address"
                        name="address"
                        value={history[0].address}
                        autoComplete="address"
                    />

                    <input type="text" placeholder="Âprtment floor, etc" name="etx-input" value={history[0].address} />
                    <input type="text" placeholder="Town/City" name="town_city" value={history[0].town_city} />

                    <input type="text" placeholder="Phone Number" name="phone_number" value={history[0].phone_number} />

                    <input type="text" placeholder="Email Address" name="my_email" value={history[0].my_email} />
                </form>
                <div className="checkout-label">
                    <button
                        onClick={() => handleConfirm(history[0])}
                        style={{
                            backgroundColor: '#BD4444',
                            padding: '6px 12px 6px 12px ',
                            border: 'none',
                            borderRadius: 4,
                            color: '#fff',
                        }}
                    >
                        Change
                    </button>
                </div>
            </div>
            <div>
                <div className="checkout-list">
                    <div className="checkout-listItems">
                        {cartItems.map((item, key) => {
                            return (
                                <div className="checkout-Items" key={key}>
                                    <div className="Items__Right">
                                        <img src={item.item.thumbnail} alt={item.item.title} />
                                        <div>{item.item.title}</div>
                                    </div>
                                    <div>{subtotal(item)}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="checkout-container">
                        <div className="cart-center">
                            <div>Subtotal:</div>
                            <div>{getCartTotal()}</div>
                        </div>
                        <hr></hr>
                        <div className="cart-center">
                            <div>Shipping:</div>
                            <div>Free</div>
                        </div>
                        <hr></hr>
                        {dis ? (
                            <>
                                <div className="cart-center">
                                    <div>Discount:</div>
                                    <div>{dis.discount}</div>
                                </div>
                                <hr></hr>
                            </>
                        ) : null}
                        <div className="cart-center">
                            <div style={{ fontWeight: 'bold' }}>Total:</div>
                            <div style={{ fontWeight: 'bold' }}>{allTotal()}</div>
                        </div>
                        <hr></hr>
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                        <div className="rdo__bank">
                            <div>
                                <input
                                    type="radio"
                                    value="Paypal"
                                    name="gender"
                                    onClick={(e) => setCheckRdo(e.target.value)}
                                />
                                Bank
                            </div>
                            <img src={require('../../../../assets/logo/Visa.png')} alt="vissa" />
                        </div>
                        <input
                            type="radio"
                            value="Cash on delivery"
                            name="gender"
                            onClick={(e) => setCheckRdo(e.target.value)}
                            defaultChecked
                        />
                        Cash on delivery
                    </div>
                </div>
                <div className="cart-coupon">
                    <input
                        type="text"
                        placeholder="Coupon Code"
                        onChange={(e) => setText(e.target.value)}
                        name="couponCode"
                    />
                    <button onClick={() => getDiscount()}>Apply Coupon</button>
                </div>
                <div className="button__placeOrder">
                    <Link to="/discounts" target="_blank" style={{ fontSize: 13, color: 'black' }}>
                        Get Coupon
                    </Link>
                </div>
                <div className="button__placeOrder">
                    {checkRdo === 'Paypal' ? (
                        <>
                            <PayPalScriptProvider options={{ 'client-id': CLIENT_ID }}>
                                <div>
                                    <PayPalButtons
                                        disabled={loading}
                                        style={{ layout: 'vertical' }}
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                    />
                                </div>
                            </PayPalScriptProvider>
                        </>
                    ) : (
                        <button disabled={loading} onClick={handleSubmit}>
                            Place Order
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default SaveCheck;
