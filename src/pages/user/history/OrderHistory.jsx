import React, { Suspense, useContext, useEffect, useState } from 'react';
import './OrderHistory.css';
import AuthContext from '../../../services/auth/context/AuthContext';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ItemHistory from './ItemHistory/ItemHistory';
import MyOrder from '../../../component/Mobile/account/myorders/MyOrder';
const OrderHistory = () => {
    const total = (payload) => {
        return payload?.quantity * payload?.item?.price;
    };
    const [active, setActive] = useState('All');
    const { token, inforUser, confirmInfor, convertDate } = useContext(AuthContext);
    const navigate = useNavigate();
    const confirm = inforUser.filter((item) => item.status.name === 'confirm');
    const awaiting = inforUser.filter((item) => item.status.name === 'awaiting');
    const ship = inforUser.filter((item) => item.status.name === 'shipping');
    const comple = inforUser.filter((item) => item.status.name === 'completed');
    const cancel = inforUser.filter((item) => item.status.name === 'canceled');
    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
    }, [token.token, navigate]);
    return (
        <>
            <div className="history__main">
                <div className="history__order-top">
                    <div className="my__top-title">
                        <p>My Account /</p> &nbsp;
                        <p style={{ fontWeight: 'bold' }}>Your Order History</p>
                    </div>
                </div>
                <div className="history__container">
                    <ul className="history__listItem">
                        <li
                            className={active === 'All' ? 'history__Click' : 'history__Item'}
                            onClick={() => setActive('All')}
                        >
                            <div className="history__a">
                                <h3>ALL</h3>
                            </div>
                        </li>
                        <li
                            className={active === 'Confirm' ? 'history__Click' : 'history__Item'}
                            onClick={() => setActive('Confirm')}
                        >
                            <div className="history__a">
                                <h3>Confirm</h3>
                            </div>
                        </li>
                        <li
                            className={active === 'awaiting' ? 'history__Click' : 'history__Item'}
                            onClick={() => setActive('awaiting')}
                        >
                            <div className="history__a">
                                <h3>Awaiting</h3>
                            </div>
                        </li>
                        <li
                            className={active === 'shipping' ? 'history__Click' : 'history__Item'}
                            onClick={() => setActive('shipping')}
                        >
                            <div className="history__a">
                                <h3>Shipping</h3>
                            </div>
                        </li>
                        <li
                            className={active === 'complete' ? 'history__Click' : 'history__Item'}
                            onClick={() => setActive('complete')}
                        >
                            <div className="history__a">
                                <h3>Completed</h3>
                            </div>
                        </li>
                        <li
                            className={active === 'cancel' ? 'history__Click' : 'history__Item'}
                            onClick={() => setActive('cancel')}
                        >
                            <div className="history__a">
                                <h3>Canceled</h3>
                            </div>
                        </li>
                    </ul>
                    <div className="history__selected">
                        {active === 'All' && (
                            <>
                                <ItemHistory
                                    props={inforUser}
                                    confirmInfor={confirmInfor}
                                    total={total}
                                    convertDate={convertDate}
                                />
                            </>
                        )}
                        {active === 'Confirm' && (
                            <>
                                <Suspense fallback={<CircularProgress />}>
                                    <ItemHistory
                                        props={confirm}
                                        confirmInfor={confirmInfor}
                                        convertDate={convertDate}
                                    />
                                </Suspense>
                            </>
                        )}
                        {active === 'awaiting' && (
                            <>
                                <Suspense fallback={<CircularProgress />}>
                                    <ItemHistory props={awaiting} total={total()} convertDate={convertDate} />
                                </Suspense>
                            </>
                        )}
                        {active === 'complete' && (
                            <>
                                <Suspense fallback={<CircularProgress />}>
                                    <ItemHistory props={comple} total={total()} convertDate={convertDate} />
                                </Suspense>
                            </>
                        )}
                        {active === 'shipping' && (
                            <>
                                <Suspense fallback={<CircularProgress />}>
                                    <ItemHistory props={ship} total={total()} convertDate={convertDate} />
                                </Suspense>
                            </>
                        )}
                        {active === 'cancel' && (
                            <>
                                <Suspense fallback={<CircularProgress />}>
                                    <ItemHistory props={cancel} total={total()} convertDate={convertDate} />
                                </Suspense>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <MyOrder />
        </>
    );
};

export default OrderHistory;
