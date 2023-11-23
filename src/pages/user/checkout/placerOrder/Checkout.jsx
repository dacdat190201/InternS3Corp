import React, { useContext, useEffect, useState } from 'react';
import './Checkout.css';
import '../../../cart/Cart.css';
import '../../../404error/Error.css';
import AuthContext from '../../../../services/auth/context/AuthContext';
import json from '../../../../datafake/chudeData.json';
import emailjs from '@emailjs/browser';
import ButtonView from '../../../../component/common/ButtonView';
import { Link, useNavigate } from 'react-router-dom';
import '../../../../component/common/BannerTitle';
import SaveCheck from '../saveCheckout/SaveCheck';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CLIENT_ID } from '../../../../services/config/Config';
import BannerTitle from '../../../../component/common/BannerTitle';
import { ShowAlert, ShowError } from '../../../../utils/ToastAlert';
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
    const [filter, setFilter] = useState();
    useEffect(() => {
        setDiscount(json.data);
        setFilter(inforUser.find((item) => item.id === inforUser[0]?.id));
        if (!token.token) {
            navigate('/');
        }
    }, [token.token, navigate, inforUser]);
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
            ShowAlert('Payment successful!!');
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
        const serviceId = 'service_up0za3d';
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
            ShowAlert('email successfully sent check inbox');
        } catch (error) {
            console.log(error);
            ShowAlert('404 @gmail.com ***');
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
            const serviceId = 'service_up0za3d';
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
                    setTimeout(() => {
                        addHistory({
                            from_name: value.my_email,
                            first_name: value.first_name,
                            company_name: value.company_name,
                            address: value.address,
                            town_city: value.town_city,
                            phone_number: value.phone_number,
                            my_email: value.my_email,
                        });
                    }, 500);
                }
                ShowAlert('email successfully sent check inbox');
                clearCart();
            } catch (error) {
                ShowAlert('404 @gmail.com ***');
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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!regex.test(values.my_email)) {
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
            errors.town_city = 'Address is required!';
        }
        if (values.phone_number.length <= 10) {
            errors.phone_number = 'Phone is Ten number';
        }
        return errors;
    };
    const handleCheckRdo = (e) => {
        setErrors(validate(value));
        if (Object.keys(validate(value)).length === 0) {
            setCheckRdo(e.target.value);
        } else ShowAlert('is not empty');
    };
    if (inforUser?.length === 0 && cartItems?.length === 0) {
        return (
            <div style={{ marginBottom: 80 }}>
                <div className="error__404">
                    <div className="error__container">
                        <h1>Your cart is empty</h1>
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

    if (cartItems?.length === 0 && inforUser[0]?.status?.name !== 'confirm') {
        return (
            <div style={{ marginBottom: 80 }}>
                <div className="error__404">
                    <div className="error__container">
                        <h1>Your cart is empty</h1>
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

    return (
        <>
            <div className="checkout__main">
                <div className="my__top" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="my__top-title">
                        <p>My Account /</p>&nbsp;<p>View Cart /&nbsp;</p>
                        <p style={{ opacity: 1 }}>Checkout</p>
                    </div>
                </div>
                <div className="checkout__container">
                    <BannerTitle props="Billing Details" />

                    <div className="checkout__container-form">
                        {history[0]?.primary === false ? (
                            <SaveCheck />
                        ) : (
                            <>
                                <div className="checkout-form">
                                    <div className="form-floating shadow-none ">
                                        <input
                                            type="text"
                                            placeholder="First Name *"
                                            name="first_name"
                                            onChange={(e) => changeValue(e)}
                                            autoComplete="given-name"
                                            className="form-control shadow-none"
                                        />
                                        <label className="text-secondary" htmlFor="Name">
                                            First Name <span className="text-danger">*</span>
                                        </label>
                                        <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                            {errors.first_name}
                                        </p>
                                    </div>
                                    <div className="form-floating shadow-none ">
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            name="company_name"
                                            onChange={(e) => changeValue(e)}
                                            className="form-control shadow-none"
                                        />
                                        <label className="text-secondary" htmlFor="Name">
                                            Last Name <span className="text-danger">*</span>
                                        </label>
                                        <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                            {errors.company_name}
                                        </p>
                                    </div>
                                    <div className="form-floating shadow-none ">
                                        <input
                                            type="text"
                                            placeholder="Street Address"
                                            name="address"
                                            onChange={(e) => changeValue(e)}
                                            autoComplete="address"
                                            className="form-control shadow-none"
                                        />
                                        <label className="text-secondary" htmlFor="Name">
                                            Address <span className="text-danger">*</span>
                                        </label>
                                        <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                            {errors.town_city}
                                        </p>
                                    </div>
                                    <div className="form-floating shadow-none ">
                                        <input
                                            type="text"
                                            placeholder="Town/City"
                                            name="town_city"
                                            onChange={(e) => changeValue(e)}
                                            className="form-control shadow-none"
                                        />
                                        <label className="text-secondary" htmlFor="Name">
                                            Town City <span className="text-danger">*</span>
                                        </label>
                                        <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                            {errors.town_city}
                                        </p>
                                    </div>

                                    <div className="form-floating shadow-none ">
                                        <input
                                            type="text"
                                            placeholder="Apartment floor, etc"
                                            name="etx-input"
                                            className="form-control shadow-none"
                                        />
                                        <label className="text-secondary" htmlFor="Name">
                                            Apartment floor, etc <span className="text-danger">*</span>
                                        </label>
                                        <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                            {errors.town_city}
                                        </p>
                                    </div>
                                    <div className="form-floating shadow-none ">
                                        <input
                                            type="text"
                                            placeholder="Phone Number"
                                            name="phone_number"
                                            onChange={(e) => changeValue(e)}
                                            className="form-control shadow-none"
                                        />
                                        <label className="text-secondary" htmlFor="Name">
                                            Phone Number <span className="text-danger">*</span>
                                        </label>
                                        <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                            {errors.phone_number}
                                        </p>
                                    </div>
                                    <div className="form-floating shadow-none ">
                                        <input
                                            type="text"
                                            placeholder="Email Address"
                                            name="my_email"
                                            onChange={(e) => changeValue(e)}
                                            className="form-control shadow-none"
                                        />
                                        <label className="text-secondary" htmlFor="Name">
                                            Email Address <span className="text-danger">*</span>
                                        </label>
                                        <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                            {errors.my_email}
                                        </p>
                                    </div>

                                    <div className="checkout-label">
                                        <input
                                            onChange={(e) => setCheckSave(!checkSave)}
                                            type="checkbox"
                                            style={{ marginRight: 16 }}
                                            id="chk_saveform"
                                        />
                                        <label htmlFor="chk_saveform">
                                            Save this information for faster check-out next time
                                        </label>
                                    </div>
                                </div>
                                <div className="checkout-list-main">
                                    <div className="checkout-list">
                                        <div className="checkout-listItems Popin-16400">
                                            {cartItems.map((item, key) => {
                                                return (
                                                    <div className="checkout-Items" key={key}>
                                                        <div className="Items__Right">
                                                            <img src={item.item.thumbnail} alt={item.item.title} />
                                                            <div>{item.item.title}</div>
                                                        </div>
                                                        <div>${subtotal(item)}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="checkout-container Popin-16400">
                                            <div className="cart-center">
                                                <div>Subtotal:</div>
                                                <div>${getCartTotal()}</div>
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
                                                        <div>${dis.discount}</div>
                                                    </div>
                                                    <hr></hr>
                                                </>
                                            ) : null}
                                            <div className="cart-center">
                                                <div>Total:</div>
                                                <div>${allTotal()}</div>
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
                                                        value="Paypal"
                                                        name="gender"
                                                        onClick={(e) => handleCheckRdo(e)}
                                                    />
                                                    <div> &nbsp;Paypal</div>
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
                                                        value="Cash on delivery"
                                                        name="gender"
                                                        onClick={(e) => handleCheckRdo(e)}
                                                        defaultChecked
                                                    />
                                                    <div>&nbsp;Cash on delivery</div>
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
                                            <ButtonView props="Apply" />
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        <Link to="/discounts" target="_blank" style={{ fontSize: 13, color: 'black' }}>
                                            Get Coupon
                                        </Link>
                                    </div>
                                    <div className="button__placeOrder">
                                        {checkRdo === 'Paypal' && Object.keys(validate(value)).length === 0 ? (
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
                                                <ButtonView props=" Place Order" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* <CheckOutMobile /> */}
        </>
    );
};

export default Checkout;
