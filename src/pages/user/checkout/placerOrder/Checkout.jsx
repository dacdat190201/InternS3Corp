import React, { useContext, useEffect, useState } from 'react';
import './Checkout.css';
import '../../../cart/Cart.css';
import AuthContext from '../../../../services/auth/context/AuthContext';
import json from '../../../../datafake/chudeData.json';
import emailjs from '@emailjs/browser';
import Navbar from '../../../../component/UI/myaccount/nav/Navbar';
import Confirm from '../confirm/Confirm';
import { Link, useNavigate } from 'react-router-dom';
import '../../../404error/Error.css';
import SaveCheck from '../saveCheckout/SaveCheck';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CLIENT_ID } from '../../../../services/config/Config';
const Checkout = () => {
    const { getCartTotal, cartItems, inforUser, addInfor, token, clearCart, addHistory, history } =
        useContext(AuthContext);
    const navigate = useNavigate();
    const [discount, setDiscount] = useState('');
    const [text, setText] = useState('');
    const [dis, setDis] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const [orderID, setOrderID] = useState(false);
    const [value, setValue] = useState({
        my_email: '',
        first_name: '',
        company_name: '',
        address: '',
        town_city: '',
        phone_number: '',
    });
    const [checkSave, setCheckSave] = useState(false);
    const [checkRdo, setCheckRdo] = useState('Cash on delivery');
    const [errors, setErrors] = useState({});
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
    const changeValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValue((prev) => {
            return { ...prev, [name]: value };
        });
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
    console.log(allTotal(), 'discount');
    // check Approval
    const onApprove = (data, actions) => {
        const serviceId = 'service_at226mk';
        const templateId = 'template_dqu6x0y';
        try {
            setLoading(true);
            emailjs.send(serviceId, templateId, {
                from_name: value.my_email,
                first_name: value.first_name,
                company_name: value.company_name,
                address: value.town_city,
                town_city: value.town_city,
                phone_number: value.phone_number,
                my_email: value.my_email,
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
                    from_name: value.my_email,
                    first_name: value.first_name,
                    company_name: value.company_name,
                    address: value.address,
                    town_city: value.town_city,
                    phone_number: value.phone_number,
                    my_email: value.my_email,
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
            if (checkSave === true) {
                addHistory({
                    from_name: value.my_email,
                    first_name: value.first_name,
                    company_name: value.company_name,
                    address: value.address,
                    town_city: value.town_city,
                    phone_number: value.phone_number,
                    my_email: value.my_email,
                });
            }
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
        setErrors(validate(value));

        if (Object.keys(validate(value)).length === 0) {
            const serviceId = 'service_at226mk';
            const templateId = 'template_dqu6x0y';
            try {
                setLoading(true);
                await emailjs.send(serviceId, templateId, {
                    from_name: value.my_email,
                    first_name: value.first_name,
                    company_name: value.company_name,
                    address: value.town_city,
                    town_city: value.town_city,
                    phone_number: value.phone_number,
                    my_email: value.my_email,
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
                        from_name: value.my_email,
                        first_name: value.first_name,
                        company_name: value.company_name,
                        address: value.address,
                        town_city: value.town_city,
                        phone_number: value.phone_number,
                        my_email: value.my_email,
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

                if (checkSave === true) {
                    addHistory({
                        from_name: value.my_email,
                        first_name: value.first_name,
                        company_name: value.company_name,
                        address: value.address,
                        town_city: value.town_city,
                        phone_number: value.phone_number,
                        my_email: value.my_email,
                    });
                }
                clearCart();
                alert('email successfully sent check inbox');
            } catch (error) {
                alert('404 @gmail.com ***');
            } finally {
                setLoading(false);
            }
        }
    };
    const totalQty = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };
    const validate = (values) => {
        const errors = {};
        //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.my_email) {
            errors.my_email = 'Email is required!';
        }
        // else if (!regex.test(values.email)) {
        //   errors.my_email = "This is not a valid email format!";
        // }
        if (!values.first_name) {
            errors.first_name = 'First Name is required!';
        }
        if (!values.company_name) {
            errors.company_name = 'Last Name is required!';
        }
        if (!values.town_city) {
            errors.town_city = 'town_city is required!';
        }
        if (values.phone_number.length !== 10) {
            errors.phone_number = 'Phone is Ten number';
        }
        return errors;
    };
    const handleCheckRdo = (e) => {
        setErrors(validate(value));
        if (Object.keys(validate(value)).length === 0) {
            setCheckRdo(e.target.value);
        } else alert('is not empty');
    };
    if (inforUser.length === 0 && cartItems.length === 0) {
        return (
            <div style={{ marginBottom: 80 }}>
                <div className="error__404">
                    <div className="error__container">
                        <h1>Your is cart empty</h1>
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
    if (cartItems.length === 0 && inforUser[0].status.name !== 'confirm') {
        return (
            <div style={{ marginBottom: 80 }}>
                <div className="error__404">
                    <div className="error__container">
                        <h1>Your is cart empty</h1>
                    </div>
                    <div className="error-btn">
                        <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                            <button>Go to Shopping</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else if (cartItems.length === 0 && inforUser[0]?.status.name === 'confirm') {
        return (
            <>
                <Confirm />
            </>
        );
    }
    // else if (cartItems.length === 0 && inforUser.status === "waiting") {
    //   return <>Đang đợi duyệt đơn hàng</>;
    // }

    return (
        <div>
            <div className="my__top" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="my__top-title">
                    <p>My Account</p>&nbsp;/ &nbsp;<p>View Cart /&nbsp;</p>
                    <p style={{ fontWeight: 'bold' }}>Checkout</p>
                </div>
            </div>
            <div className="checkout__container">
                <div className="checkout__ship">
                    <div className="checkout__ship-item">1</div>
                    <div className="checkout__ship-hr"></div>
                    <div className="checkout__ship-item">2</div>
                    <div className="checkout__ship-hr"></div>
                    <div className="checkout__ship-item">3</div>
                </div>
                <h2>Billing Details</h2>

                <div className="checkout__container-form">
                    {history[0]?.primary === false ? (
                        <SaveCheck />
                    ) : (
                        <>
                            <div className="checkout-form">
                                <form className="form__input">
                                    <input
                                        type="text"
                                        placeholder="First Name *"
                                        name="first_name"
                                        onChange={(e) => changeValue(e)}
                                        autoComplete="given-name"
                                    />
                                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                        {errors.first_name}
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="company_name"
                                        onChange={(e) => changeValue(e)}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                        {errors.company_name}
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="Street Address"
                                        name="address"
                                        onChange={(e) => changeValue(e)}
                                        autoComplete="address"
                                    />
                                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                        {errors.address}
                                    </p>
                                    <input type="text" placeholder="Âprtment floor, etc" name="etx-input" />
                                    <input
                                        type="text"
                                        placeholder="Town/City"
                                        name="town_city"
                                        onChange={(e) => changeValue(e)}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                        {errors.town_city}
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        name="phone_number"
                                        onChange={(e) => changeValue(e)}
                                    />{' '}
                                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                        {errors.phone_number}
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="Email Address"
                                        name="my_email"
                                        onChange={(e) => changeValue(e)}
                                    />
                                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                        {errors.my_email}
                                    </p>
                                </form>
                                <div className="checkout-label">
                                    <label htmlFor="chk_saveform">
                                        <input
                                            onChange={(e) => setCheckSave(!checkSave)}
                                            type="checkbox"
                                            style={{ marginRight: 5 }}
                                            id="chk_saveform"
                                        />
                                        Save this information for faster check-out next time
                                    </label>
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
                                                    onClick={(e) => handleCheckRdo(e)}
                                                />
                                                &nbsp;Paypal
                                            </div>
                                            <img src={require('../../../../assets/logo/Visa.png')} alt="vissa" />
                                        </div>
                                        <input
                                            type="radio"
                                            value="Cash on delivery"
                                            name="gender"
                                            onClick={(e) => handleCheckRdo(e)}
                                            defaultChecked
                                        />
                                        &nbsp;Cash on delivery
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
                                    {checkRdo === 'Paypal' && Object.keys(validate(value)).length === 0 ? (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
