import React, { useCallback, useContext, useEffect, useState } from 'react';
import CheckOutMobile from '../../../../component/Mobile/account/checkout/CheckOutMobile';
import '../placerOrder/Checkout.css';
import '../../../cart/Cart.css';
import '../../../404error/Error.css';
import './WaitingOrders.css';
import AuthContext from '../../../../services/auth/context/AuthContext';
import ButtonView from '../../../../component/common/ButtonView';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import json from '../../../../datafake/chudeData.json';
import { ShowAlert, ShowError } from '../../../../utils/ToastAlert';
import BannerTitle from '../../../../component/common/BannerTitle';
import SaveCheck from '../saveCheckout/SaveCheck';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CLIENT_ID } from '../../../../services/config/Config';
import { ToastContainer } from 'react-toastify';
import { Checkroom } from '@mui/icons-material';

const WaitingOrders = () => {
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
    const [checkLoad, setCheckLoad] = useState(true);
    useEffect(() => {
        setDiscount(json.data);
        setFilter(inforUser.find((item) => item.id === inforUser[0]?.id));
        if (!token.token) {
            navigate('/');
        }
    }, [loading, token.token, navigate]);
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
    const changeValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValue((prev) => {
            const newValues = { ...prev, [name]: value };
            setErrors(validate(newValues)); //set other state while in a callback
            return newValues;
        });
    };
    // const changeValue = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;

    //     setValue((prev) => {
    //         return { ...prev, [name]: value };
    //     });
    // };
    useEffect(() => {
        if (success) {
            ShowAlert('Payment successful!!');
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

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage('An Error occured with your payment ');
    };
    // Add these
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(validate(value));
        if (Object.keys(validate(value)).length === 0) {
            const serviceId = 'service_k19plts';
            const templateId = 'template_7pzoq0l';
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
                ShowError('404 @gmail.com ***');
            } finally {
                setLoading(false);
            }
        }
    };
    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const serviceId = 'service_k19plts';
            const templateId = 'template_7pzoq0l';
            try {
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
                ShowAlert('email successfully sent check inbox');
                clearCart();
            } catch (error) {
                console.log(error);
                ShowError('404 @gmail.com ***');
            } finally {
                setLoading(false);
            }
            const { payer } = details;
            setSuccess(true);
        });
    };

    const totalQty = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };
    const validate = (values) => {
        const errors = {};
        //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!regex.test(values.my_email)) {
            errors.my_email = 'Please include in @ in the email address!';
        }
        // else if (!regex.test(values.email)) {
        //   errors.my_email = "This is not a valid email format!";
        // }
        if (!values?.first_name) {
            errors.first_name = 'First Name is required!';
        }

        if (!values.company_name) {
            errors.company_name = 'Last Name is required!';
        }
        if (!values?.address) {
            errors.address = 'Address is required!';
        }
        if (!values.town_city) {
            errors.town_city = 'Town City is required!';
        }
        if (values?.phone_number?.length < 9) {
            errors.phone_number = 'Phone is Ten number';
        }
        return errors;
    };
    const handleCheckRdo = (e) => {
        // setLoading(true);
        // setErrors(validate(value));
        setCheckRdo(e.target.value);
        // if (Object.keys(validate(value)).length === 0) {
        //     return setCheckRdo(e.target.value);
        // } else {
        //     return ShowError('Form is not empty');
        // }
    };
    const handleCheckLoading = (e) => {
        setLoading(true);
        setErrors(validate(value));
        if (Object.keys(validate(value)).length === 0) {
            return setCheckLoad(!e.target.checked);
        } else {
            return ShowError('Form is not empty');
        }
    };
    if (inforUser?.length === 0 && cartItems?.length === 0) {
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />
                <div className="checkout__404err" style={{ marginTop: 140, marginBottom: 80 }}>
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
                <div className="main__error-mobile">
                    <div className="error__404-mobile">
                        <div className="error__container">
                            <img src={require('../../../../assets/slide/bags.png')} alt="shopping none" />
                        </div>
                        <Link to="/products" className="error-btn">
                            <ButtonView props="Go to Shopping" />
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    if (cartItems?.length === 0) {
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />
                <div className="checkout__404err" style={{ marginTop: 130, marginBottom: 80 }}>
                    <div className="error__404">
                        <div className="error__container">
                            <h1>My Cart is empty</h1>
                        </div>
                        <div className="error-btn">
                            <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                                <button>Go to Shopping</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="main__error-mobile">
                    <div className="error__404-mobile">
                        <div className="error__container">
                            <img src={require('../../../../assets/slide/bags.png')} alt="shopping none" />
                        </div>
                        <Link to="/products" className="error-btn">
                            <ButtonView props="Go to Shopping" />
                        </Link>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <div style={{ marginTop: 80, marginBottom: 80 }} className="checkout__main">
                <div className="my__top" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="my__top-title">
                        <p>My Account /</p>&nbsp;<p>View Cart /&nbsp;</p>
                        <p style={{ opacity: 1 }}>Checkout</p>
                    </div>
                </div>
                <div className="checkout__container">
                    {/* <div className="checkout__ship">
                <div className="checkout__ship-item">1</div>
                <div className="checkout__ship-hr"></div>
                <div className="checkout__ship-item">2</div>
                <div className="checkout__ship-hr"></div>
                <div className="checkout__ship-item">3</div>
            </div> */}
                    <BannerTitle props="Billing Details" />

                    <div className="checkout__container-form">
                        {history[0]?.primary === false ? (
                            <SaveCheck />
                        ) : (
                            <>
                                <form className="checkout-form">
                                    <div className="form-floating shadow-none ">
                                        <input
                                            type="text"
                                            placeholder="First Name *"
                                            name="first_name"
                                            onChange={(e) => {
                                                changeValue(e);
                                                setErrors(validate(value));
                                            }}
                                            autoComplete="given-name"
                                            className="form-control shadow-none"
                                        />
                                        <label className="text-secondary" htmlFor="Name">
                                            First Name <span className="text-danger">*</span>
                                        </label>
                                        {loading && (
                                            <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                                {errors?.first_name}
                                            </p>
                                        )}
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
                                        {loading && (
                                            <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                                {errors?.company_name}
                                            </p>
                                        )}
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
                                        {loading && (
                                            <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                                {errors?.address}
                                            </p>
                                        )}
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
                                        {loading && (
                                            <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                                {errors?.town_city}
                                            </p>
                                        )}
                                    </div>

                                    <div className="form-floating shadow-none ">
                                        <input
                                            type="number"
                                            placeholder="Phone Number"
                                            name="phone_number"
                                            onChange={(e) => changeValue(e)}
                                            className="form-control shadow-none"
                                        />
                                        <label className="text-secondary" htmlFor="Name">
                                            Phone Number <span className="text-danger">*</span>
                                        </label>
                                        {loading && (
                                            <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                                {errors?.phone_number}
                                            </p>
                                        )}
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
                                        {loading && (
                                            <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                                {errors?.my_email}
                                            </p>
                                        )}
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
                                </form>
                                <div className="checkout-list-main">
                                    <div className="checkout-list">
                                        <div className="checkout-listItems Popin-16400">
                                            {cartItems?.map((item, key) => {
                                                return (
                                                    <div className="checkout-Items" key={key}>
                                                        <div className="Items__Right">
                                                            <div className="Item__right-img">
                                                                {' '}
                                                                <img src={item.item.thumbnail} alt={item.item.title} />
                                                            </div>
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
                                            <ButtonView props="Apply Coupon" />
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        <Link to="/discounts" target="_blank" style={{ fontSize: 13, color: 'black' }}>
                                            Get Coupon
                                        </Link>
                                    </div>
                                    <div className="button__placeOrder">
                                        {checkRdo === 'Paypal' ? (
                                            <div style={{ marginTop: 32 }}>
                                                <div className="checkout-label" style={{ marginBottom: 32 }}>
                                                    <input
                                                        onChange={(e) => handleCheckLoading(e)}
                                                        type="checkbox"
                                                        style={{ marginRight: 16 }}
                                                        id="chk_load"
                                                    />
                                                    <label htmlFor="chk_load">Confirm information</label>
                                                </div>
                                                <PayPalScriptProvider options={{ 'client-id': CLIENT_ID }}>
                                                    <div>
                                                        <PayPalButtons
                                                            disabled={checkLoad}
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
            <CheckOutMobile />
        </>
    );
};

export default WaitingOrders;
