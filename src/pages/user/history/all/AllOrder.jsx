import React from 'react';
import './AllOrder.css';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import EmptyComponent from '../../../../component/UI/empty/EmptyComponent';
const AllOrder = ({ total, props, confirmInfor, convertDate }) => {
    return (
        <>
            <div className="allorder__search">
                <input type="text" placeholder="Search By Name..." name="inputOrder" />
            </div>
            {props.length === 0 ? (
                <EmptyComponent />
            ) : (
                <div className="allorder__container">
                    {props.map((item, key) => {
                        return (
                            <div className="allOrder__List" key={key}>
                                <Link
                                    to={`/myaccount/user/order/${item.id}`}
                                    style={{
                                        color: '#26aa99',
                                        fontWeight: 'bold',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div className="allOrder__List-top">
                                        <div className="allOrder__Top-Left">
                                            <i className="fa-solid fa-store"></i>
                                            <div>Exclude</div>
                                            <Link to={`/contact`} style={{ textDecoration: 'none' }}>
                                                <button>
                                                    <p>Chat </p>
                                                    <i className="fa-regular fa-comment"></i>
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="allOrder__Top-Right">
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
                                                        className="fa-solid fa-pen order__Top-i"
                                                        style={{
                                                            width: 18,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    ></i>
                                                </Tooltip>
                                            )}
                                            <div>|</div>
                                            <div style={{ color: '#ee4d2d', fontWeight: 'bold' }}>
                                                <h3>{item?.status.name}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="allOrder__center">
                                        {item.item.cart.map((item, key) => {
                                            return (
                                                // <Link
                                                //     to={`/products/${item.item.id}`}
                                                //     style={{
                                                //         color: 'black',
                                                //         fontWeight: 'bold',
                                                //         textDecoration: 'none',
                                                //     }}
                                                //     key={key}
                                                // >
                                                <div
                                                    key={key}
                                                    className="allOrder__center-List"
                                                    style={{
                                                        color: 'black',
                                                        fontWeight: 'bold',
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    <div className="allOrder__List-Left">
                                                        <div className="all__Left-img">
                                                            <img src={item.item.thumbnail} alt={item.item.title} />
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            <span>{item.item.title}</span>
                                                            <div
                                                                style={{
                                                                    color: '#b6b6b6',
                                                                    fontSize: '12px',
                                                                    fontWeight: 400,
                                                                }}
                                                            >
                                                                {item.item.description}
                                                            </div>

                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    gap: 10,
                                                                    fontSize: '12px',
                                                                    fontWeight: 500,
                                                                }}
                                                            >
                                                                {item.item.category}
                                                                <div>x{item.quantity}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h3 style={{ color: '#ee4d2d' }}>{total(item)}$</h3>
                                                </div>
                                                // </Link>
                                            );
                                        })}

                                        {/* {console.log(item.item.cart.item, "abs")} */}
                                    </div>
                                    <div className="allOrder__bottom">
                                        <div className="allOrder__Alltotal">
                                            <div className="allOrder-totalTitle">
                                                <i className="fa-solid fa-money-bill" style={{ marginRight: 8 }}></i>
                                                Total:
                                            </div>
                                            <div className="allOrder-totalNumber">${item.item.total}</div>
                                        </div>
                                        <div className="allOrder__button">
                                            <div style={{ fontSize: 12, color: 'grey' }}>
                                                Thank you for shopping at Exclude!
                                            </div>
                                            <div className="allOrde__button-right">
                                                {item.status.name === 'CONFIRM' ? (
                                                    <button
                                                        className="all__button-buy"
                                                        onClick={() => confirmInfor(item)}
                                                    >
                                                        Confirm
                                                    </button>
                                                ) : (
                                                    // <button className="all__button-buy">
                                                    //   Repurchase Agreements
                                                    // </button>
                                                    <></>
                                                )}

                                                <button>Contact the seller</button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default AllOrder;
