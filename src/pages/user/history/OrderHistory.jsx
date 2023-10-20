import React, { Suspense, useContext, useEffect, useState } from 'react';
import './OrderHistory.css';
import AllOrder from './all/AllOrder';
import AuthContext from '../../../services/auth/context/AuthContext';
import { CircularProgress } from '@mui/material';
import Awaiting from './awaiting/Awaiting';
import { useNavigate } from 'react-router-dom';
import Shipping from './shipping/Shipping';
import Canceled from './canceled/Canceled';
import CompletedHistory from './completed/CompletedHistory';
const ConfirmHistory = React.lazy(() => import('./confirm/ConfirmHistory'));
const OrderHistory = () => {
    const total = (payload) => {
        return payload?.quantity * payload?.item?.price;
    };
    const [active, setActive] = useState('All');
    const { token, inforUser, confirmInfor, convertDate } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
    }, [token.token, navigate]);
    return (
        <>
            <div className="history__order-top">
                <div className="my__top-title">
                    <p>My Account</p>&nbsp;/ &nbsp;
                    <p style={{ fontWeight: 'bold' }}>Your Order History</p>
                </div>
            </div>
            <div className="history__container">
                <ul className="history__listItem">
                    <li
                        className={active === 'All' ? 'history__Click' : 'history__Item'}
                        onClick={() => setActive('All')}
                    >
                        <div className="history__a">ALL</div>
                    </li>
                    <li
                        className={active === 'Confirm' ? 'history__Click' : 'history__Item'}
                        onClick={() => setActive('Confirm')}
                    >
                        <div className="history__a">Confirm</div>
                    </li>
                    <li
                        className={active === 'awaiting' ? 'history__Click' : 'history__Item'}
                        onClick={() => setActive('awaiting')}
                    >
                        <div className="history__a">Awaiting</div>
                    </li>
                    <li
                        className={active === 'shipping' ? 'history__Click' : 'history__Item'}
                        onClick={() => setActive('shipping')}
                    >
                        <div className="history__a">Shipping</div>
                    </li>
                    <li
                        className={active === 'complete' ? 'history__Click' : 'history__Item'}
                        onClick={() => setActive('complete')}
                    >
                        <div className="history__a">Completed</div>
                    </li>
                    <li
                        className={active === 'cancel' ? 'history__Click' : 'history__Item'}
                        onClick={() => setActive('cancel')}
                    >
                        <div className="history__a">Canceled</div>
                    </li>
                </ul>
                <div className="history__selected">
                    {active === 'All' && (
                        <>
                            <AllOrder
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
                                <ConfirmHistory
                                    props={inforUser}
                                    confirmInfor={confirmInfor}
                                    convertDate={convertDate}
                                />
                            </Suspense>
                        </>
                    )}
                    {active === 'awaiting' && (
                        <>
                            <Suspense fallback={<CircularProgress />}>
                                <Awaiting props={inforUser} total={total()} convertDate={convertDate} />
                            </Suspense>
                        </>
                    )}
                    {active === 'complete' && (
                        <>
                            <Suspense fallback={<CircularProgress />}>
                                <CompletedHistory props={inforUser} total={total()} convertDate={convertDate} />
                            </Suspense>
                        </>
                    )}
                    {active === 'shipping' && (
                        <>
                            <Suspense fallback={<CircularProgress />}>
                                <Shipping props={inforUser} total={total()} convertDate={convertDate} />
                            </Suspense>
                        </>
                    )}
                    {active === 'cancel' && (
                        <>
                            <Suspense fallback={<CircularProgress />}>
                                <Canceled props={inforUser} total={total()} convertDate={convertDate} />
                            </Suspense>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrderHistory;
