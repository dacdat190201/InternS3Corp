import React from 'react';
import './ItemAdmin.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import ButtonView from '../../../component/common/ButtonView';
import EmptyComponent from '../../../component/UI/empty/EmptyComponent';
const ItemAdmin = ({ props, total, convertDate }) => {
    return (
        <>
            {props.length === 0 ? (
                <div className="empty__admin-center">
                    <EmptyComponent />
                </div>
            ) : (
                <>
                    {props.length !== 0 && (
                        <>
                            <div className="allorder__search">
                                <input type="text" placeholder="Search By Name..." name="inputOrder" />
                            </div>
                            <div className="allOrAdmin__filter">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Uncontrolled picker"
                                            defaultValue={dayjs(new Date())}
                                            slotProps={{ textField: { size: 'small' } }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </>
                    )}
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
                                                <button>
                                                    <p style={{ fontSize: 12, marginRight: 6 }}>Chat</p>
                                                    <i className="fa-regular fa-comment"></i>
                                                </button>
                                                <h3 style={{ color: '#26aa99' }}>ID: {item.id}</h3>
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
                                                                marginLeft: 5,
                                                            }}
                                                        ></i>
                                                    </Tooltip>
                                                )}
                                                &nbsp; <div>|</div>
                                                <h3 style={{ color: '#DB4444' }}>{item?.status.name}</h3>
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

                                                            <div
                                                                style={{
                                                                    margin: '10px 0px',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <div className="titleItem500">{item.item.title}</div>
                                                                <div className="titleDescrip">{item.item.category}</div>
                                                                <div className="titleDescrip">x{item.quantity}</div>
                                                            </div>
                                                        </div>
                                                        <div className="PriceName">${total(item)}</div>
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
                                            <div className="PriceTotal">${item.item.total}</div>
                                        </div>
                                        <div className="allOrder__button">
                                            <div></div>
                                            <div className="allOrde__button-right">
                                                <Link
                                                    to={`/admin/orders/${item.id}`}
                                                    style={{
                                                        color: 'black',
                                                        fontWeight: 'bold',
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    <ButtonView props="Detail" size="admin" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};

export default ItemAdmin;
