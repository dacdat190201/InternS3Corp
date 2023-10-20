import React from 'react';
import '../CSS/ListOrder.css';
import { Link } from 'react-router-dom';
const AllMobile = ({ props, convertDate }) => {
    return (
        <>
            {props.map((item, key) => {
                return (
                    <div className="ListOrder__Container" key={key}>
                        <div className="ListOrder__top">
                            <h4>Order ID: {item.id}</h4>
                            <p> {convertDate(item?.status?.message[0]?.date)}</p>
                        </div>
                        <p>Tracking Number:123456789</p>
                        <div className="ListOrder__center">
                            <h4>Quantity: {item?.item?.cart?.length}</h4>

                            <span>
                                Total:
                                <span style={{ color: '#000', fontWeight: 'bold' }}>{item?.item?.item_total}$</span>
                            </span>
                        </div>
                        <div className="ListOrder__bottom">
                            <Link to={`/myorder/detail/${item.id}`} className="ListOrder__bottom-btn">
                                Details
                            </Link>
                            <div className="ListOrder__bottom-btnTitle">{item?.status?.name}</div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default AllMobile;
