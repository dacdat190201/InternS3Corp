import React, { useContext, useEffect } from 'react';
import './InfoOrder.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../services/auth/context/AuthContext';
import ItemOder from '../ItemOrder/ItemOder';
import ButtonView from '../../../../component/common/ButtonView';

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

                    <Link to={'/products'}>
                        <ButtonView size="sm" props="Buy Again" />
                    </Link>
                </div>
                <Link
                    to="/contact"
                    className="order__buyThank-Contact"
                    style={{ color: '000', textDecoration: 'none' }}
                >
                    <ButtonView size="sm-white" props="Seller Help Center" />
                </Link>
                <div className="order__buyBill">
                    <div className="order__buyThank-title">Electronic Bill!</div>
                    <div className="order__buyThank-btnBill">
                        <ButtonView size="sm-white" props="Print Invoices" />
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
                            <h3>{convertDate(props?.status?.message[0]?.date)}</h3>
                            <h3 style={{ color: '#26AA99' }}>{props?.status?.message[0]?.title}</h3>
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
                                    <h3>{convertDate(item?.date)}</h3>
                                    <h3>{item?.title}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div style={{ marginTop: 20 }}>
                <ItemOder props={props} convertDate={convertDate} total={total} />
            </div>
        </div>
    );
};

export default InfoOrder;
