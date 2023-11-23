import { Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './ItemOrder.css';
const ItemOder = ({ props, convertDate, total }) => {
    return (
        <>
            <div className="ItemOrder__Top">
                <div className="ItemOrder__Top-left">
                    <i className="fa-solid fa-store"></i>
                    <h3>Exclusive</h3>
                </div>
                <div className="ItemOrder__Top-right">
                    <Link
                        className="ItemOrder__Top-right"
                        to={`/myaccount/user/order/${props?.id}`}
                        style={{
                            color: '#26aa99',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                        }}
                    >
                        <h3>{props?.status?.message[0].title}</h3>
                        {props?.status?.message && (
                            <Tooltip
                                title={
                                    <React.Fragment>
                                        <h3>{`Latest updates: ${convertDate(props?.status?.message[0]?.date)}`}</h3>
                                    </React.Fragment>
                                }
                            >
                                <i className="fa-solid fa-pen"></i>
                            </Tooltip>
                        )}
                    </Link>
                    <div>|</div>
                    <div style={{ color: '#DB4444', fontWeight: 'bold' }}>
                        <h3>{props?.status?.name}</h3>
                    </div>
                </div>
            </div>
            <div>
                {props?.item?.cart.map((props, key) => {
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
                    <p>-${props?.item?.item_total}</p>
                </div>
                <div className="bottom__Subtotal">
                    <span>Shipping</span>
                    <p>Free</p>
                </div>
                <div className="bottom__Subtotal">
                    <span>Discount</span>
                    <p>-${props?.item?.my_discount ? props?.item?.my_discount : 0}</p>
                </div>
                <div className="bottom__Subtotal" style={{ border: 'none' }}>
                    <span>Total</span>
                    <p>
                        <div className="PriceTotal">-${props?.item?.total}</div>
                    </p>
                </div>
                <div className="bottom__total-Please">
                    <span>
                        <i className="fa-solid fa-comment-dollar" style={{ color: '#ada800' }}></i>
                        &nbsp;Payable&nbsp;
                        <span style={{ color: '#DB4444' }}>${props?.item?.total}</span>
                        &nbsp; immediately after the receipt of the goods.
                    </span>
                </div>
                <div className="bottom__Subtotal">
                    <span style={{ border: '1px solid rgb(255, 196, 0);' }}>
                        <i className="fa-regular fa-credit-card" style={{ color: '#DB4444' }}></i>
                        Payments
                    </span>
                    <p>{props?.item?.payment}</p>
                </div>
                <div className="odConfirm__total-Item">
                    <div className="odConfirm__Item-left"></div>
                </div>
            </div>
        </>
    );
};

export default ItemOder;
