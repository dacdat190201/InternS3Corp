import React, { useContext, useEffect } from 'react';
import './InfoOrder.css';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import AuthContext from '../../../../services/auth/context/AuthContext';

const InfoOrder = ({ props, convertDate }) => {
    const total = (payload) => {
        return payload.quantity * payload.item.price;
    };
    const { token, inforUser } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
    }, [navigate, token.token, inforUser]);
    return (
        <div>
            <div className="order__detail-center">
                <div className="order__buyThank">
                    <div className="order__buyThank-title">Thank you for shopping at Exclude!</div>
                    <Link className="order__buyThank-btn" to={'/products'}>
                        <button>Buy Again</button>
                    </Link>
                </div>
                <Link
                    to="/contact"
                    className="order__buyThank-Contact"
                    style={{ color: '#fff', textDecoration: 'none' }}
                >
                    <button>Seller Help Center</button>
                </Link>
                <div className="order__buyBill">
                    <div className="order__buyThank-title">Electronic Bill!</div>
                    <div className="order__buyThank-btnBill">
                        <button>Print Invoices</button>
                    </div>
                </div>
            </div>
            <div className="inOrder__bottom">
                <div className="inOrder__title">
                    <h3>Address:</h3>
                    <p>Exclude ID:{props?.id}</p>
                </div>
                <div className="inOrder__title">
                    <div className="inOrder__left">
                        <p style={{ fontSize: 16, color: 'black', marginBottom: 10 }}>
                            {props?.item?.first_name} {props?.item?.company_name}
                        </p>
                        <p>{props?.item?.phone_number}</p>
                        <p>{props?.item?.address}</p>
                        <p>City: {props?.item?.town_city}</p>
                    </div>

                    <div className="inOrder__right">
                        <div
                            className="inOrder__right-center"
                            style={{ color: '#26AA99', fontWeight: 'bold', marginBottom: 10 }}
                        >
                            Latest updates
                        </div>
                        <div className="inOrder__right-center">
                            <div>{convertDate(props?.status?.message[0]?.date)}</div>
                            <div style={{ color: '#26AA99' }}>{props?.status?.message[0]?.title}</div>
                        </div>
                        <div
                            className="inOrder__right-center"
                            style={{ color: '#26AA99', marginBottom: 10, marginTop: 10 }}
                        >
                            History
                        </div>
                        {props?.status?.message.map((item, key) => {
                            return (
                                <div className="inOrder__right-center" key={key}>
                                    <div>{convertDate(item?.date)}</div>
                                    <div>{item?.title}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: -35, marginRight: -35 }}>
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
                                {props?.status?.message && (
                                    <Tooltip
                                        title={
                                            <React.Fragment>
                                                <h3>{`Latest updates: ${props?.status?.message[0]?.date}`}</h3>
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
                            </div>
                        </div>

                        <div className="allOrder__center">
                            {props?.item?.cart.map((props, key) => {
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
                            <div className="odConfirm__Item-Right">-${props?.item?.item_total}</div>
                        </div>
                        <div className="odConfirm__total-Item">
                            <div className="odConfirm__Item-left">Shipping</div>
                            <div className="odConfirm__Item-Right">Free</div>
                        </div>
                        <div className="odConfirm__total-Item">
                            <div className="odConfirm__Item-left">Discount</div>
                            <div className="odConfirm__Item-Right">
                                -${props?.item?.my_discount ? props?.item?.my_discount : 0}
                            </div>
                        </div>
                        <div className="odConfirm__total-Item">
                            <div className="odConfirm__Item-left">Total</div>
                            <div className="odConfirm__Item-Right" style={{ color: 'rgb(238, 77, 45)', fontSize: 24 }}>
                                -${props?.item?.total}
                            </div>
                        </div>
                        <div className="odConfirm__total-Please">
                            <div className="odConfirm__Item-left">
                                <i className="fa-solid fa-comment-dollar" style={{ color: '#ada800' }}></i>
                                Payable&nbsp;
                                <span style={{ color: 'rgb(238, 77, 45)' }}>${props?.item?.total}</span>
                                &nbsp; immediately after the receipt of the goods.
                            </div>
                        </div>
                        <div className="odConfirm__total-Item">
                            <div className="odConfirm__Item-left">
                                <i className="fa-regular fa-credit-card" style={{ color: 'rgb(238, 77, 45)' }}></i>
                                Payments
                            </div>
                            <div className="odConfirm__Item-Right">{props?.item?.payment}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoOrder;
