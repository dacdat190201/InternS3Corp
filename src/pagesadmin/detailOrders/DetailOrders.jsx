import React, { Suspense, useContext, useEffect, useState } from 'react';
import './DetailOrders.css';
import ButtonView from '../../component/common/ButtonView';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../services/auth/context/AuthContext';
import { Dialog, Tooltip } from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LoadingComponent from '../../component/common/LoadingComponent';
const DetailOrders = () => {
    const param = useParams();
    const { inforUser, updateInfo, addressShipping, completed, updateStatusInfo, confirmShipping, convertDate } =
        useContext(AuthContext);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        setFilter(inforUser.find((item) => item.id.toString() === param.id));
    }, [param.id, inforUser]);
    const [click, setClick] = useState(false);
    const [clickStatus, setClickStatus] = useState(false);
    const [value, setValue] = useState({
        first_name: '',
        company_name: '',
        phone_number: '',
        address: '',
        town_city: '',
        title: '',
        shipping: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
            errors.company_name = 'Last Name is required!';
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
        if (!values.title) {
            errors.title = 'Note is required!';
        }
        return errors;
    };

    const total = (payload) => {
        return payload?.quantity * payload?.item?.price;
    };
    const [selected, setSelected] = useState(`Option`);
    const handleValue = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setValue((prev) => {
            const newValues = { ...prev, [name]: value };
            setErrors(validate(newValues)); //set other state while in a callback
            return newValues;
        });
    };
    const handleUpdateInfor = () => {
        setErrors(validate(value));
        setLoading(true);
        if (Object.keys(validate(value)).length === 0) {
            setTimeout(() => {
                updateInfo(value, param.id);
                setLoading(false);
                setErrors({});
                handleClose1();
            }, 1000);
        }
    };
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [open1, setOpen1] = React.useState(false);
    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    return (
        <>
            <Dialog
                open={open1}
                onClose={handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="edit__infoOrder">
                    <div className="edit__infoOrder-input">
                        <div className="edit__infoOrder-height">
                            <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                onChange={(e) => handleValue(e)}
                            />
                            {loading && <p style={{ color: 'red', fontSize: '12px' }}>{errors.first_name}</p>}
                        </div>
                        <div className="edit__infoOrder-height">
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="company_name"
                                onChange={(e) => handleValue(e)}
                            />
                            {loading && <p style={{ color: 'red', fontSize: '12px' }}>{errors.company_name}</p>}
                        </div>
                    </div>
                    <div className="edit__infoOrder-input">
                        <div className="edit__infoOrder-height">
                            <input
                                type="number"
                                placeholder="Phone Number"
                                name="phone_number"
                                onChange={(e) => handleValue(e)}
                            />
                            {loading && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone_number}</p>}
                        </div>
                        <div className="edit__infoOrder-height">
                            <input type="text" placeholder="City" name="town_city" onChange={(e) => handleValue(e)} />
                            {loading && <p style={{ color: 'red', fontSize: '12px' }}>{errors.town_city}</p>}
                        </div>
                    </div>
                    <div className="edit__infoOrder-height">
                        <input
                            type="text"
                            placeholder="Address"
                            className="edit__infoOrder-inputAddress"
                            name="address"
                            onChange={(e) => handleValue(e)}
                        />
                        {loading && <p style={{ color: 'red', fontSize: '12px' }}>{errors.address}</p>}
                    </div>
                    <input
                        type="text"
                        placeholder="note"
                        name="title"
                        className="edit__infoOrder-inputAddress"
                        style={{
                            padding: '20px 0px',
                            height: 80,
                            border: 'none',
                            borderBottom: '2px solid rgb(224, 224, 224)',
                            marginTop: 20,
                        }}
                        onChange={(e) => handleValue(e)}
                    />
                    {loading && <p style={{ color: 'red', fontSize: '12px' }}>{errors.title}</p>}
                    <div className="edit__infoOrder-btn">
                        <button
                            onClick={(e) => {
                                handleUpdateInfor(e);
                            }}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </Dialog>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="orders__editStatus">
                    <div style={{ marginBottom: 10 }} className="titleItem500">
                        Status:
                    </div>
                    <Suspense fallback={<LoadingComponent loading={true} />}>
                        <div className="orders__editStatusTop" style={{ marginBottom: 10 }}>
                            <div className="dropdown dropright">
                                <button
                                    type="button"
                                    className="btn btn-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <h3 className="titleItem500">{selected}</h3>
                                </button>
                                <div className="orders__editStatusTop dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <button
                                        onClick={(e) => setSelected('confirm')}
                                        className="dropdown-item"
                                        type="button"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={(e) => setSelected('awaiting')}
                                        className="dropdown-item"
                                        type="button"
                                    >
                                        Awaiting
                                    </button>
                                    <button
                                        onClick={(e) => setSelected('shipping')}
                                        className="dropdown-item"
                                        type="button"
                                    >
                                        Shipping
                                    </button>
                                    <button
                                        onClick={(e) => setSelected('completed')}
                                        className="dropdown-item"
                                        type="button"
                                    >
                                        Completed
                                    </button>
                                    <button
                                        onClick={(e) => setSelected('canceled')}
                                        className="dropdown-item"
                                        type="button"
                                    >
                                        Canceled
                                    </button>
                                </div>
                            </div>

                            {/* <select onClick={(e) => setSelected(e.target.value)}>
                                                    <option>Selected</option>
                                                    <option value="shipping">shipping</option>
                                                    <option value="awaiting">awaiting</option>
                                                    <option value="canceled">canceled</option>
                                                    <option value="completed">completed</option>
                                                    <option value="confirm">confirm</option>
                                                </select> */}
                        </div>
                    </Suspense>

                    <div
                        onClick={() => {
                            updateStatusInfo(selected, param.id);
                            handleClose();
                        }}
                    >
                        <ButtonView props="Update" size="admin" />
                    </div>
                </div>

                {/* <CanceledMobile props={filter} close={handleClose} /> */}
            </Dialog>
            <div style={{ marginBottom: 120 }}>
                <div className="orders__edit-topTitle">
                    <div className="bannerTitle">Detail</div>
                    {filter?.status?.name === 'awaiting' && (
                        <div onClick={() => confirmShipping(filter)}>
                            <ButtonView props="Approve orders" size="admin" />
                        </div>
                    )}
                    {filter?.status?.name === 'shipping' && (
                        <div onClick={() => completed(filter)}>
                            <ButtonView props="Completed" size="admin" />
                        </div>
                    )}
                </div>
                {(() => {
                    if (
                        filter?.status?.name === 'Selected' ||
                        filter?.status?.name === 'comfirm' ||
                        filter?.status?.name === 'shipping' ||
                        filter?.status?.name === 'completed' ||
                        filter?.status?.name === 'canceled'
                    ) {
                        return (
                            <div className="orders__edit">
                                <div className="orders__edit-top">
                                    <div style={{ marginBottom: 10 }} className="titleItem500">
                                        Exclude ID: {filter?.id}
                                    </div>
                                    <div style={{ marginBottom: 10 }} className="titleItem500">
                                        Status: {filter?.status?.name}
                                        <EditCalendarIcon
                                            style={{ marginLeft: 8, cursor: 'pointer' }}
                                            onClick={handleClickOpen}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 10 }} className="titleItem500">
                                        Message:
                                    </div>
                                    <textarea
                                        style={{ marginBottom: 10 }}
                                        onChange={handleValue}
                                        name="shipping"
                                        value={value.shipping}
                                    ></textarea>

                                    <div className="orders__edit-topBtn">
                                        <div
                                            onClick={() => {
                                                addressShipping(value.shipping, param.id);
                                                setValue({
                                                    first_name: '',
                                                    company_name: '',
                                                    phone_number: '',
                                                    address: '',
                                                    town_city: '',
                                                    title: '',
                                                    shipping: '',
                                                });
                                            }}
                                        >
                                            <ButtonView props="Add" size="admin" />
                                        </div>
                                        <input type="file" className="orders__edit-inputFile" />
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })()}

                <div className="inOrder__bottom">
                    <div className="inOrder__title">
                        <div className="BreadName">Address:</div>
                        <i
                            className="fa-solid fa-pen order__Top-i"
                            style={{
                                marginLeft: 5,
                            }}
                            onClick={handleClickOpen1}
                        ></i>
                    </div>
                    <div className="inOrder__title">
                        <div className="inOrder__left">
                            <h3 style={{ fontSize: 16, color: 'black', marginBottom: 10 }}>
                                {filter?.item?.first_name} {filter?.item?.company_name}
                            </h3>
                            <h3>{filter?.item?.phone_number}</h3>
                            <h3>{filter?.item?.address}</h3>
                            <h3>City: {filter?.item?.town_city}</h3>
                        </div>

                        <div className="inOrder__right">
                            <h3 style={{ color: '#DB4444' }} className="inOrder__right-center">
                                Status: {filter?.status?.name}
                            </h3>
                            <h3
                                style={{
                                    color: '#26AA99',
                                    fontWeight: 'bold',
                                }}
                            >
                                Latest updates
                            </h3>
                            <div className="inOrder__right-center">
                                <h3>{convertDate(filter?.status?.message[0]?.date)}</h3>
                                <h3 style={{ color: '#26AA99' }}>{filter?.status?.message[0]?.title}</h3>
                            </div>
                            <div
                                className="inOrder__right-center"
                                style={{ color: '#26AA99', marginBottom: 10, marginTop: 10 }}
                            >
                                History
                            </div>
                            {filter?.status?.message.map((item, key) => {
                                return (
                                    <div className="inOrder__right-center" key={key}>
                                        <h3>{convertDate(item?.date)}</h3>
                                        <h3>{item?.title}</h3>
                                    </div>
                                );
                            })}
                        </div>
                        {/* {click && (
                            <div className="edit__infoOrder">
                                <div className="edit__infoOrder-input">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        name="first_name"
                                        onChange={(e) => handleValue(e)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="company_name"
                                        onChange={(e) => handleValue(e)}
                                    />
                                </div>
                                <div className="edit__infoOrder-input">
                                    <input
                                        type="number"
                                        placeholder="Phone Number"
                                        name="phone_number"
                                        onChange={(e) => handleValue(e)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        name="town_city"
                                        onChange={(e) => handleValue(e)}
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="edit__infoOrder-inputAddress"
                                    name="address"
                                    onChange={(e) => handleValue(e)}
                                />
                                <input
                                    type="text"
                                    placeholder="note"
                                    name="title"
                                    className="edit__infoOrder-inputAddress"
                                    style={{
                                        height: 80,
                                        border: '1px solid grey',
                                        marginTop: 20,
                                    }}
                                    onChange={(e) => handleValue(e)}
                                />
                                <div className="edit__infoOrder-btn">
                                    <button onClick={() => updateInfo(value, param.id)}>Update</button>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
                <div className="ItemOrder__Top">
                    <div className="ItemOrder__Top-left">
                        <i className="fa-solid fa-store"></i>
                        <h3>Exclusive</h3>
                    </div>
                    <div className="ItemOrder__Top-right">
                        <Link
                            className="ItemOrder__Top-right"
                            style={{
                                color: '#26aa99',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                            }}
                        >
                            <h3>{filter?.status?.message[0].title}</h3>
                            {filter?.status?.message && (
                                <Tooltip
                                    title={
                                        <React.Fragment>
                                            <h3>{`Latest updates: ${convertDate(
                                                filter?.status?.message[0]?.date,
                                            )}`}</h3>
                                        </React.Fragment>
                                    }
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </Tooltip>
                            )}
                        </Link>
                        <div>|</div>
                        <div style={{ color: '#DB4444', fontWeight: 'bold' }}>
                            <h3>{filter?.status?.name}</h3>
                        </div>
                    </div>
                </div>
                <div>
                    {filter?.item?.cart.map((props, key) => {
                        return (
                            <div className="ItemOrder__center" key={key}>
                                <div className="ItemOrder__center-left">
                                    <div className="center__left-img">
                                        <img src={props?.item?.thumbnail} alt={props?.title} />
                                    </div>
                                    <div className="center__left-content">
                                        <div className="titleItem500">{props?.item?.title}</div>
                                        <div className="titleDescriporder"> {props?.item?.category}</div>

                                        <div className="titleDescriporder">x{props?.quantity}</div>
                                    </div>
                                </div>
                                <div className="ItemOrder__center-right">
                                    <div className="PriceName">{total(props)}$</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="ItemOrder__bottom">
                    <div className="bottom__Subtotal">
                        <span>SubTotal</span>
                        <p>-${filter?.item?.item_total}</p>
                    </div>
                    <div className="bottom__Subtotal">
                        <span>Shipping</span>
                        <p>Free</p>
                    </div>
                    <div className="bottom__Subtotal">
                        <span>Discount</span>
                        <p>-${filter?.item?.my_discount ? filter?.item?.my_discount : 0}</p>
                    </div>
                    <div className="bottom__Subtotal">
                        <span>Total</span>
                        <p>
                            <div className="PriceTotal">-${filter?.item?.total}</div>
                        </p>
                    </div>
                    <div className="bottom__total-Please">
                        <span>
                            <i className="fa-solid fa-comment-dollar" style={{ color: '#ada800' }}></i>
                            &nbsp;Payable&nbsp;
                            <span style={{ color: '#DB4444' }}>${filter?.item?.total}</span>
                            &nbsp; immediately after the receipt of the goods.
                        </span>
                    </div>
                    <div className="bottom__Subtotal">
                        <span style={{ border: '1px solid rgb(255, 196, 0)' }}>
                            <i className="fa-regular fa-credit-card" style={{ color: '#DB4444' }}></i>
                            Payments
                        </span>
                        <p>{filter?.item?.payment}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailOrders;
