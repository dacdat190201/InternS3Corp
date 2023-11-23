import React from 'react';
import { Link } from 'react-router-dom';
import './ItemAdmin.css';
const ItemMobileAdmin = ({ props, convertDate }) => {
    return (
        <>
            {props.map((item, key) => {
                return (
                    <div className="ListOrder__Container" key={key}>
                        <div className="ListOrder__top">
                            <div className="titleItem500">Order ID: {item.id}</div>
                            <div className="titleItem500"> {convertDate(item?.status?.message[0]?.date)}</div>
                        </div>
                        <div className="titleDescrip">Tracking Number:123456789</div>
                        <div className="ListOrder__center">
                            <div className="titleDescrip">Quantity: {item?.item?.cart?.length}</div>

                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <div className="titleItem500"> Total:</div>
                                <div className="PriceName">{item?.item?.item_total}$</div>
                            </div>
                        </div>
                        <div className="ListOrder__bottom">
                            <Link to={`/myorder/detail/${item.id}`} className="ListOrder__bottom-btn">
                                Details
                            </Link>
                            <div className="titleItem500 ListOrder__bottom-btnTitle">{item?.status?.name}</div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ItemMobileAdmin;
