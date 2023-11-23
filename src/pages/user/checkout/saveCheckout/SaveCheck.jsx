import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../services/auth/context/AuthContext';
import json from '../../../../datafake/chudeData.json';
import emailjs from '@emailjs/browser';
import ButtonView from '../../../../component/common/ButtonView';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CLIENT_ID } from '../../../../services/config/Config';
import { ShowAlert, ShowError } from '../../../../utils/ToastAlert';
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
            ShowError('Please enter discount code');
            setDis(0);
        } else if (!discount.find((item) => item.id === text)) {
            ShowError('No discount code found');
            setDis(0);
        } else {
            if (discount.find((item) => item.allowance < getCartTotal())) {
                setDis(discount.find((item) => item.id === text));
            } else ShowError('The condition is not satisfied');
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
    useEffect(() => emailjs.init('rs02wz8JPvIUnJrNB'), []);
    //value form
    //Change primary history
    const handleConfirm = (item) => {
        changeHistory(item);
    };

    useEffect(() => {
        if (success) {
            ShowAlert('Payment successful!!');
            console.log('Order successful . Your order id is--', orderID);
        }
    }, [orderID, success]);
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
        const serviceId = 'service_k19plts';
        const templateId = 'template_7pzoq0l';
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
            ShowAlert('email successfully sent check inbox');
        } catch (error) {
            ShowError('404 @gmail.com ***');
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

        const serviceId = 'service_k19plts';
        const templateId = 'template_7pzoq0l';

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
            setTimeout(() => {
                ShowAlert('email successfully sent check inbox');
                clearCart();
            }, 500);
        } catch (error) {
            ShowAlert('404 @gmail.com ***');
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
                <div className="form-floating shadow-none ">
                    <input
                        type="text"
                        defaultValue={history[0].first_name}
                        name="first_name"
                        autoComplete="given-name"
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="Name">
                        First Name <span className="text-danger">*</span>
                    </label>
                </div>
                <div className="form-floating shadow-none ">
                    <input
                        type="text"
                        defaultValue={history[0].company_name}
                        name="company_name"
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="Name">
                        Last Name <span className="text-danger">*</span>
                    </label>
                </div>
                <div className="form-floating shadow-none ">
                    <input
                        type="text"
                        defaultValue={history[0].address}
                        name="address"
                        autoComplete="address"
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="Name">
                        Address <span className="text-danger">*</span>
                    </label>
                </div>
                <div className="form-floating shadow-none ">
                    <input
                        type="text"
                        defaultValue={history[0].address}
                        name="town_city"
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="Name">
                        Town City <span className="text-danger">*</span>
                    </label>
                </div>

                <div className="form-floating shadow-none ">
                    <input
                        type="text"
                        defaultValue={history[0].town_city}
                        name="etx-input"
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="Name">
                        Apartment floor, etc <span className="text-danger">*</span>
                    </label>
                </div>
                <div className="form-floating shadow-none ">
                    <input
                        type="text"
                        defaultValue={history[0].phone_number}
                        name="phone_number"
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="Name">
                        Phone Number <span className="text-danger">*</span>
                    </label>
                </div>
                <div className="form-floating shadow-none ">
                    <input
                        type="text"
                        defaultValue={history[0].my_email}
                        name="my_email"
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="Name">
                        Email Address <span className="text-danger">*</span>
                    </label>
                </div>

                <div className="checkout-label">
                    <div onClick={() => handleConfirm(history[0])}>
                        <ButtonView props="Change" />
                    </div>
                </div>
            </div>
            <div className="checkout-list-main">
                <div className="checkout-list">
                    <div className="checkout-listItems">
                        {cartItems.map((item, key) => {
                            return (
                                <div className="checkout-Items" key={key}>
                                    <div className="Items__Right">
                                        <div className="Item__right-img">
                                            {' '}
                                            <img src={item.item.thumbnail} alt={item.item.title} />
                                        </div>
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
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                        <div className="rdo__bank" style={{ marginBottom: '32px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16,
                                }}
                            >
                                <input
                                    type="radio"
                                    defaultValue="Paypal"
                                    name="gender"
                                    onClick={(e) => setCheckRdo(e.target.value)}
                                />
                                <div> Paypal</div>
                            </div>
                            <img src={require('../../../../assets/logo/Visa.png')} alt="vissa" />
                        </div>
                        <div className="rdo__bank">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16,
                                }}
                            >
                                <input
                                    type="radio"
                                    defaultValue="Cash on delivery"
                                    name="gender"
                                    onClick={(e) => setCheckRdo(e.target.value)}
                                    defaultChecked
                                />
                                <div> Cash on delivery</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Checkout__coupon">
                    <input
                        type="text"
                        placeholder="Coupon Code"
                        onChange={(e) => setText(e.target.value)}
                        name="couponCode"
                    />
                    <div onClick={() => getDiscount()}>
                        <ButtonView props="Apply Coupon" />
                    </div>
                </div>
                <div style={{ marginTop: 10 }} className="button__placeOrder-link">
                    <Link to="/discounts" target="_blank" style={{ fontSize: 13, color: 'black' }}>
                        Get Coupon
                    </Link>
                </div>
                <div className="button__placeOrder">
                    {checkRdo === 'Paypal' ? (
                        <div style={{ marginTop: 32 }}>
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
                        </div>
                    ) : (
                        <div disabled={loading} onClick={handleSubmit}>
                            <ButtonView props="  Place Order" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SaveCheck;
