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
                                            <Link to={`/contact`}>
                                                <button>
                                                    <i className="fa-regular fa-comment"></i>Chat
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="allOrder__Top-Right">
                                            {item?.status.message[0].title}
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
                                                            border: '1px solid grey',
                                                            borderRadius: '50%',
                                                            marginLeft: 5,
                                                        }}
                                                    ></i>
                                                </Tooltip>
                                            )}
                                            &nbsp; |
                                            <div style={{ color: '#ee4d2d', fontWeight: 'bold' }}>
                                                {item?.status.name}
                                            </div>
                                            <div className="order__Top-newUpdate">dâdada</div>
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
                                                        <div>
                                                            <div>
                                                                <span>{item.item.title}</span>
                                                                <div style={{ color: 'grey', fontSize: '13px' }}>
                                                                    {item.item.description}
                                                                </div>

                                                                {item.item.category}

                                                                <div>x{item.quantity}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="allOrder__List-Right" style={{ color: '#ee4d2d' }}>
                                                        {total(item)}
                                                    </div>
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
