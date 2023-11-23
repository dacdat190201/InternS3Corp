import React, { useContext, useEffect, useState } from 'react';
import './AddingAddress.css';
import '../../../../../pages/user/checkout/placerOrder/Checkout.css';
import AuthContext from '../../../../../services/auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ButtonView from '../../../../common/ButtonView';
import BarBack from '../../../../common/BarBack';
import { ShowAlert } from '../../../../../utils/ToastAlert';
import { ShowError } from '../../../../../utils/ToastAlert';
const AddingAddress = () => {
    const { token, addHistory } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState({
        my_email: '',
        first_name: '',
        company_name: '',
        address: '',
        town_city: '',
        phone_number: '',
    });
    const [errors, setErrors] = useState({});
    const changeValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValue((prev) => {
            return { ...prev, [name]: value };
        });
    };
    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
    }, [token.token, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(value));
        setLoading(true);
        if (Object.keys(validate(value)).length === 0) {
            try {
                addHistory({
                    from_name: value.my_email,
                    first_name: value.first_name,
                    company_name: value.company_name,
                    address: value.address,
                    town_city: value.town_city,
                    phone_number: value.phone_number,
                    my_email: value.my_email,
                });
                ShowAlert('Sussess');

                navigate('/shippingsave');
            } catch (error) {
                ShowError(error);
            } finally {
                setLoading(false);
            }
        }
    };
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!regex.test(values.my_email)) {
            errors.my_email = 'Please include in @ in the email address!';
        }
        // if (!values.my_email) {
        //     errors.my_email = 'Email is required!';
        // }
        // else if (!regex.test(values.email)) {
        //   errors.my_email = "This is not a valid email format!";
        // }
        if (!values.first_name) {
            errors.first_name = 'First Name is required!';
        }
        if (!values.company_name) {
            errors.company_name = 'Company name is required!';
        }
        if (!values.address) {
            errors.address = 'Address is required!';
        }
        if (!values.town_city) {
            errors.town_city = 'Town city is required!';
        }
        if (values.phone_number.length < 9) {
            errors.phone_number = 'Phone is Ten number';
        }
        return errors;
    };
    return (
        <div className="checkoutMobile">
            <div>
                <BarBack title="Adding Address" link="ShippingSave" />
            </div>
            <div className="checkout-form">
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
                        <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.first_name}</p>
                    )}
                </div>
                <div className="form-floating shadow-none ">
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="company_name"
                        onChange={(e) => {
                            changeValue(e);
                            setErrors(validate(value));
                        }}
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="Name">
                        Last Name <span className="text-danger">*</span>
                    </label>
                    {loading && (
                        <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.company_name}</p>
                    )}
                </div>
                <div className="form-floating shadow-none ">
                    <input
                        type="text"
                        placeholder="Street Address"
                        name="address"
                        onChange={(e) => {
                            changeValue(e);
                            setErrors(validate(value));
                        }}
                        autoComplete="address"
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="Name">
                        Address <span className="text-danger">*</span>
                    </label>
                    {loading && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.address}</p>}
                </div>
                <div className="form-floating shadow-none ">
                    <input
                        type="text"
                        placeholder="Town/City"
                        name="town_city"
                        onChange={(e) => {
                            changeValue(e);
                            setErrors(validate(value));
                        }}
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="Name">
                        Town City <span className="text-danger">*</span>
                    </label>
                    {loading && (
                        <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.town_city}</p>
                    )}
                </div>

                <div className="form-floating shadow-none ">
                    <input
                        type="number"
                        placeholder="Phone Number"
                        name="phone_number"
                        onChange={(e) => {
                            changeValue(e);
                            setErrors(validate(value));
                        }}
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="Name">
                        Phone Number <span className="text-danger">*</span>
                    </label>
                    {loading && (
                        <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.phone_number}</p>
                    )}
                </div>
                <div className="form-floating shadow-none ">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="my_email"
                        onChange={(e) => {
                            changeValue(e);
                            setErrors(validate(value));
                        }}
                        className="form-control shadow-none"
                    />
                    <label className="text-secondary" htmlFor="my_email">
                        Email Address <span className="text-danger">*</span>
                    </label>
                    {loading && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.my_email}</p>}
                </div>
                <div disabled={loading} style={{ display: 'flex', justifyContent: 'center' }} onClick={handleSubmit}>
                    <ButtonView props="Save Address" size="mobile" />
                </div>
            </div>
            {/* <div>
                <form className="form__input">
                    <input
                        type="text"
                        placeholder="First Name *"
                        name="first_name"
                        onChange={(e) => changeValue(e)}
                        autoComplete="given-name"
                    />
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.first_name}</p>
                    <input type="text" placeholder="Last Name" name="company_name" onChange={(e) => changeValue(e)} />
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.company_name}</p>
                    <input
                        type="text"
                        placeholder="Street Address"
                        name="address"
                        onChange={(e) => changeValue(e)}
                        autoComplete="address"
                    />
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.address}</p>
                    <input type="text" placeholder="Âprtment floor, etc" name="etx-input" />
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.phone_number}</p>
                    <input type="text" placeholder="Town/City" name="town_city" onChange={(e) => changeValue(e)} />
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.town_city}</p>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        name="phone_number"
                        onChange={(e) => changeValue(e)}
                    />
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.phone_number}</p>
                    <input type="text" placeholder="Email Address" name="my_email" onChange={(e) => changeValue(e)} />
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.my_email}</p>
                </form>
                <div disabled={loading} className="checkoutM__Btn" onClick={handleSubmit}>
                    <ButtonView props="Save Address" size="mobile" />
                </div>
            </div> */}
        </div>
    );
};

export default AddingAddress;
