import { Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const CompletedAdmin = ({ props, total, convertDate }) => {
    return (
        <div className="allorder__container">
            {props.map((item, key) => {
                return (
                    <div className="allOrder__List" key={key}>
                        <Link
                            to={`/admin/orders/${item.id}`}
                            style={{
                                color: '#26aa99',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                            }}
                        >
                            <div className="allOrder__List-top">
                                <div className="allOrder__Top-Left" style={{ color: 'black' }}>
                                    <div>
                                        Name: {item.item.first_name}&nbsp;
                                        {item.item.company_name}
                                        <div>{item.item.phone_number}</div>
                                    </div>
                                    <button style={{ backgroundColor: 'darkblue' }}>
                                        <i className="fa-regular fa-comment"></i>Chat
                                    </button>
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
                                    <div style={{ color: '#ee4d2d', fontWeight: 'bold' }}>{item?.status.name}</div>
                                    <div className="order__Top-newUpdate">dâdada</div>
                                </div>
                            </div>
                        </Link>
                        <div className="allOrder__center">
                            {item.item.cart.map((item, key) => {
                                return (
                                    <Link
                                        to={`/products/${item.item.id}`}
                                        style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            textDecoration: 'none',
                                        }}
                                        key={key}
                                    >
                                        <div className="allOrder__center-List">
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
                                    </Link>
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
                                <div>da</div>
                                <div className="allOrde__button-right">
                                    <div className="allOrde__button-right">
                                        {/* <button
                      className="Waiting__button"
                      onClick={() => confirmShipping(item)}
                    >
                      Approve orders
                    </button> */}
                                        <Link
                                            to={`/admin/orders/${item.id}`}
                                            style={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <button>Detail</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CompletedAdmin;
