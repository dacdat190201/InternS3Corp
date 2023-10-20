import React, { useContext, useEffect, useState } from 'react';
import './DetailOrders.css';

import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../services/auth/context/AuthContext';
import { Tooltip } from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
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
    const [selected, setSelected] = useState();
    const handleValue = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setValue((prev) => {
            return { ...prev, [name]: value };
        });
    };
    return (
        <>
            <div style={{ marginBottom: 120 }}>
                <div className="orders__edit-topTitle">
                    <h2>Detail</h2>
                    {filter?.status?.name === 'awaiting' && (
                        <button onClick={() => confirmShipping(filter)}>Approve orders</button>
                    )}
                </div>
                {(() => {
                    if (
                        filter?.status?.name === 'shipping' ||
                        filter?.status?.name === 'completed' ||
                        filter?.status?.name === 'canceled'
                    ) {
                        return (
                            <div className="orders__edit">
                                <div className="orders__edit-top">
                                    <div>
                                        <p>Exclude ID: {filter?.id}</p>
                                    </div>
                                    <div style={{ color: 'red' }}>
                                        Status: {filter?.status?.name}
                                        <EditCalendarIcon
                                            onClick={() => setClickStatus(!clickStatus)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                    <div>Message:</div>
                                    <div>
                                        <textarea
                                            style={{ height: 70, width: 400 }}
                                            onChange={handleValue}
                                            name="shipping"
                                        ></textarea>
                                    </div>
                                    <div className="orders__edit-topBtn">
                                        <button onClick={() => addressShipping(value.shipping, param.id)}>ADD</button>
                                        <input type="file" className="orders__edit-inputFile" />
                                    </div>
                                </div>
                                <div>
                                    {filter?.status?.name === 'shipping' && (
                                        <button
                                            style={{
                                                width: 100,
                                                height: 36,
                                                backgroundColor: 'darkblue',
                                                color: 'white',
                                                borderRadius: 5,
                                            }}
                                            onClick={() => completed(filter)}
                                        >
                                            Completed
                                        </button>
                                    )}

                                    {clickStatus && (
                                        <div
                                            style={{
                                                marginTop: 10,
                                                width: 98,
                                                border: '1px solid grey',
                                                height: 155,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-around',
                                                borderRadius: 5,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div style={{ color: 'red' }}>Status: </div>
                                            <div>
                                                <select
                                                    className="orders__editStatus"
                                                    onClick={(e) => setSelected(e.target.value)}
                                                >
                                                    <option>Selected</option>
                                                    <option value="shipping">shipping</option>
                                                    <option value="awaiting">awaiting</option>
                                                    <option value="canceled">canceled</option>
                                                    <option value="completed">completed</option>
                                                    <option value="confirm">confirm</option>
                                                </select>
                                            </div>
                                            <div className="orders__editStatusBtn">
                                                <button onClick={() => updateStatusInfo(selected, param.id)}>
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }
                })()}

                <div className="inOrder__bottom">
                    <div className="inOrder__title">
                        <h3>Address:</h3>
                        <i
                            className="fa-solid fa-pen order__Top-i"
                            style={{
                                border: '1px solid grey',
                                borderRadius: '50%',
                                marginLeft: 5,
                            }}
                            onClick={() => setClick(!click)}
                        ></i>
                    </div>
                    <div className="inOrder__title">
                        <div className="inOrder__left">
                            <p style={{ fontSize: 16, color: 'black', marginBottom: 10 }}>
                                {filter?.item?.first_name} {filter?.item?.company_name}
                            </p>
                            <p>{filter?.item?.phone_number}</p>
                            <p>{filter?.item?.address}</p>
                            <p>City: {filter?.item?.town_city}</p>
                        </div>

                        <div className="inOrder__right">
                            <div
                                className="inOrder__right-center"
                                style={{
                                    color: 'red',
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                }}
                            >
                                Status: {filter?.status?.name}
                            </div>
                            <div
                                className="inOrder__right-center"
                                style={{
                                    color: '#26AA99',
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                }}
                            >
                                Latest updates
                            </div>
                            <div className="inOrder__right-center">
                                <div>{convertDate(filter?.status?.message[0]?.date)}</div>
                                <div style={{ color: '#26AA99' }}>{filter?.status?.message[0]?.title}</div>
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
                                        <div>{convertDate(item?.date)}</div>
                                        <div>{item?.title}</div>
                                    </div>
                                );
                            })}
                        </div>
                        {click && (
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
                        )}
                    </div>
                </div>

                <div style={{ marginLeft: -20, marginRight: -20 }}>
                    <div className="allorder__container">
                        <div className="allOrder__List">
                            <div className="allOrder__List-top">
                                <div className="allOrder__Top-Left">
                                    <div>
                                        Name: {filter?.item?.first_name} {filter?.item?.company_name}
                                    </div>
                                    <button style={{ backgroundColor: 'darkblue' }}>
                                        <i className="fa-regular fa-comment"></i>Chat
                                    </button>
                                </div>
                                <div className="allOrder__Top-Right">
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
                                            <i
                                                className="fa-solid fa-circle-info"
                                                style={{
                                                    border: '1px solid grey',
                                                    borderRadius: '50%',
                                                    marginLeft: 5,
                                                }}
                                            ></i>
                                        </Tooltip>
                                    )}
                                </div>
                            </div>

                            <div className="allOrder__center">
                                {filter?.item?.cart.map((props, key) => {
                                    return (
                                        <div className="allOrder__center-List" key={key}>
                                            <div className="allOrder__List-Left">
                                                <div className="all__Left-img">
                                                    <img src={props?.item?.thumbnail} alt={props?.title} />
                                                </div>
                                                <div>
                                                    <div>
                                                        <span>{props?.item?.title}</span>
                                                        <div style={{ color: 'grey', fontSize: '13px' }}>
                                                            {props?.item?.description}
                                                        </div>
                                                        <Link
                                                            style={{
                                                                textDecoration: 'none',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {props?.item?.category}
                                                        </Link>
                                                        <div>x{props?.quantity}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="allOrder__List-Right" style={{ color: '#ee4d2d' }}>
                                                {/* {total(props)} */}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="odConfirm__total-container">
                        <div className="odConfirm__total-List">
                            <div className="odConfirm__total-Item">
                                <div className="odConfirm__Item-left">
                                    <span>SubTotal</span>
                                </div>
                                <div className="odConfirm__Item-Right">-${filter?.item?.item_total}</div>
                            </div>
                            <div className="odConfirm__total-Item">
                                <div className="odConfirm__Item-left">Shipping</div>
                                <div className="odConfirm__Item-Right">Free</div>
                            </div>
                            <div className="odConfirm__total-Item">
                                <div className="odConfirm__Item-left">Discount</div>
                                <div className="odConfirm__Item-Right">
                                    -${filter?.item?.my_discount ? filter?.item?.my_discount : 0}
                                </div>
                            </div>
                            <div className="odConfirm__total-Item">
                                <div className="odConfirm__Item-left">Total</div>
                                <div
                                    className="odConfirm__Item-Right"
                                    style={{ color: 'rgb(238, 77, 45)', fontSize: 24 }}
                                >
                                    -${filter?.item?.total}
                                </div>
                            </div>
                            <div className="odConfirm__total-Please">
                                <div className="odConfirm__Item-left">
                                    <i className="fa-solid fa-comment-dollar" style={{ color: '#ada800' }}></i>
                                    Payable&nbsp;
                                    <span style={{ color: 'rgb(238, 77, 45)' }}>${filter?.item?.total}</span>
                                    &nbsp; immediately after the receipt of the goods.
                                </div>
                            </div>
                            <div className="odConfirm__total-Item">
                                <div className="odConfirm__Item-left">
                                    <i className="fa-regular fa-credit-card" style={{ color: 'rgb(238, 77, 45)' }}></i>
                                    Payments
                                </div>
                                <div className="odConfirm__Item-Right">{filter?.item?.payment}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailOrders;
