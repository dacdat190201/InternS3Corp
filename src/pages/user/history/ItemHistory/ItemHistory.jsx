import React from 'react';
import './ItemHistory.css';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import EmptyComponent from '../../../../component/UI/empty/EmptyComponent';
const ItemHistory = ({ props, confirmInfor, convertDate }) => {
    const total = (payload) => {
        return payload?.quantity * payload?.item?.price;
    };
    return (
        <>
            <div className="allorder__search">
                {props.length === 0 ? <></> : <input type="text" placeholder="Search By Name..." name="inputOrder" />}{' '}
            </div>
            {props.length === 0 ? (
                <EmptyComponent />
            ) : (
                <div className="ItemHistory__container">
                    {props.map((item, key) => {
                        return (
                            <div className="ItemHistory__List" key={key}>
                                <Link
                                    to={`/myaccount/user/order/${item.id}`}
                                    style={{
                                        color: '#26aa99',
                                        fontWeight: 'bold',
                                        textDecoration: 'none',
                                    }}
                                    className="ItemHistory-top"
                                >
                                    <div className="ItemHistory-Left">
                                        <i className="fa-solid fa-store"></i>
                                        <div>Exclude</div>
                                        <Link
                                            to={`/contact`}
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <button>
                                                <span>Chat</span>
                                                <i className="fa-regular fa-comment"></i>
                                            </button>
                                        </Link>
                                    </div>

                                    <Link
                                        className="ItemHistory-Right"
                                        to={`/myaccount/user/order/${item.id}`}
                                        style={{
                                            color: '#26A999',
                                            fontWeight: 'bold',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <h3>{item?.status.message[0].title}</h3>
                                        {item?.status.message && (
                                            <Tooltip
                                                title={
                                                    <React.Fragment>
                                                        <h3>{`Latest updates: ${convertDate(
                                                            item?.status.message[0].date,
                                                        )}`}</h3>
                                                    </React.Fragment>
                                                }
                                            >
                                                <i
                                                    className="fa-solid fa-pen ItemHistory-i"
                                                    style={{
                                                        marginLeft: 5,
                                                    }}
                                                ></i>
                                            </Tooltip>
                                        )}
                                        <div>|</div>
                                        <h3 style={{ color: '#DB4444' }}>{item?.status.name}</h3>
                                    </Link>
                                </Link>
                                <div className="ItemHistory__center">
                                    {item.item.cart.map((item, key) => {
                                        return (
                                            <div className="ItemHistory__center-List" key={key}>
                                                <div className="ItemHistory__List-Left">
                                                    <div className="all__Left-img">
                                                        <img src={item.item.thumbnail} alt={item.item.title} />
                                                    </div>

                                                    <div className="ItemHistory__content-center">
                                                        <div className="titleItem500">{item.item.title}</div>
                                                        <div className="titleDescriporder"> {item.item.category}</div>
                                                        <div className="titleDescriporder">x{item.quantity}</div>
                                                    </div>
                                                </div>
                                                <div className="PriceName">${total(item)}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="ItemHistory__bottom">
                                    <div className="ItemHistory__Alltotal">
                                        <div className="ItemHistory-totalTitle">
                                            <i className="fa-solid fa-money-bill" style={{ marginRight: 8 }}></i>
                                            Total:
                                        </div>
                                        <div className="PriceTotal">${item.item.total}</div>
                                    </div>
                                    <div className="ItemHistory__button">
                                        <div style={{ fontSize: 12, color: 'grey' }}>
                                            Thank you for shopping at Exclude!
                                        </div>
                                        <div className="ItemHistory__button-right">
                                            {item.status.name === 'confirm' ? (
                                                <button
                                                    className="ItemHistory__button-buy"
                                                    onClick={() => confirmInfor(item)}
                                                >
                                                    Confirm
                                                </button>
                                            ) : (
                                                <></>
                                            )}

                                            <button>Contact the seller</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default ItemHistory;
