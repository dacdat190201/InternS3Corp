import React, { useContext, useEffect, useRef, useState } from 'react';
import './AddingAddress.css';
import '../../../../../pages/user/checkout/placerOrder/Checkout.css';
import AuthContext from '../../../../../services/auth/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const AddingAddress = () => {
    const { token, addHistory } = useContext(AuthContext);
    const ref = useRef();
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
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [token.token, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(value));
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

                alert('Sussess');
                navigate('/shippingsave');
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        }
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
            errors.company_name = 'company_name is required!';
        }
        if (!values.town_city) {
            errors.town_city = 'town_city is required!';
        }
        if (values.phone_number.length !== 10) {
            errors.phone_number = 'Phone is Ten number';
        }
        return errors;
    };
    return (
        <div className="checkoutMobile" ref={ref}>
            <div className="ViewCart__Top">
                <Link style={{ color: 'black' }} to={'/shippingsave'}>
                    <ArrowBackIosIcon />
                </Link>
                <h4>Adding Address</h4>
                <div></div>
            </div>
            <div>
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
                    <input type="text" placeholder="Town/City" name="town_city" onChange={(e) => changeValue(e)} />
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.town_city}</p>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        name="phone_number"
                        onChange={(e) => changeValue(e)}
                    />{' '}
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.phone_number}</p>
                    <input type="text" placeholder="Email Address" name="my_email" onChange={(e) => changeValue(e)} />
                    <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errors.my_email}</p>
                </form>
                <div disabled={loading} className="checkoutM__Btn" onClick={handleSubmit}>
                    SAVE ADDRESS
                </div>
            </div>
        </div>
    );
};

export default AddingAddress;
