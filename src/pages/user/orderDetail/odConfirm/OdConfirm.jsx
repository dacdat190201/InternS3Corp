import React, { useState } from 'react';
import CancelConfirm from '../../checkout/cancel/CancelConfirm';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import './OdConfirm.css';

const OdConfirm = ({ props, confirmInfor, convertDate }) => {
    const [click, setClick] = useState();
    const total = (payload) => {
        return payload.quantity * payload.item.price;
    };

    return (
        <div>
            <div className="confirm__bottom">
                {!click ? (
                    <>
                        <div className="confirm__bottom-left">
                            <h3>Delivery address</h3>
                            <div className="confirm__left-inputContai">
                                <div className="left_inputcontai-input">
                                    <label>First Name</label>
                                    <input type="text" defaultValue={props?.item?.first_name} />
                                </div>
                                <div className="left_inputcontai-input">
                                    <label>Last Name</label>
                                    <input type="text" defaultValue={props?.item?.company_name} />
                                </div>
                            </div>
                            <div className="confirm__left-inputContai">
                                <div className="left_inputcontai-input">
                                    <label>Email</label>
                                    <input type="text" defaultValue={props?.item?.my_email} />
                                </div>
                                <div className="left_inputcontai-input">
                                    <label>Phone Number</label>
                                    <input type="text" defaultValue={props?.item?.phone_number} />
                                </div>
                            </div>
                            <div className="confirm__left-input">
                                <label>Address</label>
                                <input type="text" defaultValue={props?.item?.address} />
                            </div>
                            <div className="confirm__left-input">
                                <label>Order Date</label>
                                <input type="text" defaultValue={props?.item?.date} />
                            </div>
                        </div>
                    </>
                ) : (
                    <CancelConfirm conDetail={props} setClick={setClick} />
                )}
                <div className="confirm__bottom-right">
                    <button className="c__b__r-bt0" onClick={() => confirmInfor(props)}>
                        Confirm order
                    </button>
                    <div>
                        <button className="c__b__r-bt2">Contact the seller</button>
                        <button className="c__b__r-bt1" onClick={() => setClick(!click)}>
                            Cancel Order
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '-120px' }}>
                <div className="allorder__container">
                    <div className="allOrder__List">
                        <div className="allOrder__List-top">
                            <div className="allOrder__Top-Left">
                                <i className="fa-solid fa-store"></i>
                                <div>Exclude</div>
                                <button>
                                    <i className="fa-regular fa-comment"></i>Chat
                                </button>
                            </div>
                            <div className="allOrder__Top-Right">
                                <Link
                                    to={`/myaccount/user/order/${props.id}`}
                                    style={{
                                        color: '#26aa99',
                                        fontWeight: 'bold',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {props?.status?.message[0].title}
                                    {props?.status?.message && (
                                        <Tooltip
                                            title={
                                                <React.Fragment>
                                                    <h3>{`Latest updates: ${convertDate(
                                                        props?.status?.message[0]?.date,
                                                    )}`}</h3>
                                                </React.Fragment>
                                            }
                                        >
                                            <i
                                                className="fa-solid fa-pen order__Top-i"
                                                style={{
                                                    border: '1px solid grey',
                                                    borderRadius: '50%',
                                                    marginLeft: 5,
                                                }}
                                            ></i>
                                        </Tooltip>
                                    )}
                                    &nbsp; |
                                </Link>
                                <div style={{ color: '#ee4d2d', fontWeight: 'bold' }}>{props?.status?.name}</div>
                                <div className="order__Top-newUpdate">dâdada</div>
                            </div>
                        </div>

                        <div className="allOrder__center">
                            {props.item?.cart.map((props, key) => {
                                return (
                                    <div className="allOrder__center-List" key={key}>
                                        <div className="allOrder__List-Left">
                                            <div className="all__Left-img">
                                                <img src={props?.item.thumbnail} alt={props.title} />
                                            </div>
                                            <div>
                                                <div>
                                                    <span>{props.item.title}</span>
                                                    <div style={{ color: 'grey', fontSize: '13px' }}>
                                                        {props?.item.description}
                                                    </div>
                                                    <Link
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: 'black',
                                                        }}
                                                    >
                                                        {props.item.category}
                                                    </Link>
                                                    <div>x{props.quantity}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="allOrder__List-Right" style={{ color: '#ee4d2d' }}>
                                            {total(props)}
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
                            <div className="odConfirm__Item-Right">-${props.item.item_total}</div>
                        </div>
                        <div className="odConfirm__total-Item">
                            <div className="odConfirm__Item-left">Shipping</div>
                            <div className="odConfirm__Item-Right">Free</div>
                        </div>
                        <div className="odConfirm__total-Item">
                            <div className="odConfirm__Item-left">Discount</div>
                            <div className="odConfirm__Item-Right">
                                -${props.item.my_discount ? props.item.my_discount : 0}
                            </div>
                        </div>
                        <div className="odConfirm__total-Item">
                            <div className="odConfirm__Item-left">Total</div>
                            <div className="odConfirm__Item-Right" style={{ color: 'rgb(238, 77, 45)', fontSize: 24 }}>
                                -${props.item.total}
                            </div>
                        </div>
                        <div className="odConfirm__total-Please">
                            <div className="odConfirm__Item-left">
                                <i className="fa-solid fa-comment-dollar" style={{ color: '#ada800' }}></i>
                                Payable&nbsp;
                                <span style={{ color: 'rgb(238, 77, 45)' }}>${props.item.total}</span>
                                &nbsp; immediately after the receipt of the goods.
                            </div>
                        </div>
                        <div className="odConfirm__total-Item">
                            <div className="odConfirm__Item-left">
                                <i className="fa-regular fa-credit-card" style={{ color: 'rgb(238, 77, 45)' }}></i>
                                Payments
                            </div>
                            <div className="odConfirm__Item-Right">{props.item.payment}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OdConfirm;
