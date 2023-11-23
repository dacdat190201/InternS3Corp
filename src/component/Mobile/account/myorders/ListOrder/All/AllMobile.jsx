import React from 'react';
import '../CSS/ListOrder.css';
import { Link } from 'react-router-dom';
const AllMobile = ({ props, convertDate }) => {
    return (
        <>
            {props.length === 0 ? (
                <>
                    <div className="ProfileM__container">
                        <div className="viewCart__ListItem">
                            <div style={{ marginBottom: 80 }}>
                                <div className="error__404">
                                    <div className="error__container">
                                        <img
                                            src={require('../../../../../../assets/slide/bags.png')}
                                            alt="shopping none"
                                        />
                                    </div>
                                    <div className="error-btn">
                                        <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                                            <button>Go to Shopping</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
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
                                <div className="PriceName">{item?.item?.total}$</div>
                            </div>
                        </div>
                        <div className="ListOrder__bottom">
                            <Link to={`/myorder/detail/${item.id}`} className="ListOrder__bottom-btn">
                                Details
                            </Link>
                            <div className="titleItem500 ListOrder__bottom-btnTitle">
                                {item?.status?.name.charAt(0).toUpperCase() + item?.status?.name.slice(1)}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default AllMobile;
