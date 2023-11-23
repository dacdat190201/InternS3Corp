import React, { useContext, useState } from 'react';
import AuthContext from '../../../services/auth/context/AuthContext';
import { Badge } from '@mui/material';
import './OrdersMain.css';
import '../../../pages/user/history/OrderHistory.css';
import ItemAdmin from '../ItemAdmin/ItemAdmin';
import OrdersMainMobile from './OrdersMainMobile';
const OrdersMain = () => {
    const { inforUser, confirmShipping, completed, convertDate } = useContext(AuthContext);
    const total = (payload) => {
        return payload?.quantity * payload?.item?.price;
    };

    const [active, setActive] = useState('All');
    const awaiting = inforUser.filter((item) => item.status.name === 'awaiting');
    const awaitBadge = awaiting.length;
    const ship = inforUser.filter((item) => item.status.name === 'shipping');
    const shipBadge = ship.length;
    const comple = inforUser.filter((item) => item.status.name === 'completed');
    const cancel = inforUser.filter((item) => item.status.name === 'canceled');
    return (
        <div>
            <div className="Order__main">
                <ul className="history__listItem">
                    <li
                        className={active === 'All' ? 'history__Click-admin' : 'history__Item-admin'}
                        onClick={() => setActive('All')}
                    >
                        <h3>ALL</h3>
                    </li>

                    <li
                        className={active === 'awaiting' ? 'history__Click-admin' : 'history__Item-admin'}
                        onClick={() => setActive('awaiting')}
                    >
                        <div className="history__a-admin"></div>
                        <Badge badgeContent={awaitBadge} color="primary">
                            <h3>Confirmation</h3>
                        </Badge>
                    </li>
                    <li
                        className={active === 'shipping' ? 'history__Click-admin' : 'history__Item-admin'}
                        onClick={() => setActive('shipping')}
                    >
                        <Badge badgeContent={shipBadge} color="primary">
                            <h3>Shipping</h3>
                        </Badge>
                    </li>
                    <li
                        className={active === 'completed' ? 'history__Click-admin' : 'history__Item-admin'}
                        onClick={() => setActive('completed')}
                    >
                        <h3> Completed</h3>
                    </li>
                    <li
                        className={active === 'canceled' ? 'history__Click-admin' : 'history__Item-admin'}
                        onClick={() => setActive('canceled')}
                    >
                        <h3>Canceled</h3>
                    </li>
                </ul>
                <div className="history__selected">
                    {active === 'All' && (
                        <>
                            <ItemAdmin props={inforUser} total={total} convertDate={convertDate} />
                            {/* <AllOrAdmin props={inforUser} total={total} convertDate={convertDate} /> */}
                        </>
                    )}
                    {active === 'awaiting' && (
                        <>
                            <ItemAdmin
                                props={awaiting}
                                total={total}
                                confirmShipping={confirmShipping}
                                convertDate={convertDate}
                            />
                        </>
                    )}
                    {active === 'shipping' && (
                        <>
                            <ItemAdmin props={ship} total={total} completed={completed} convertDate={convertDate} />
                        </>
                    )}
                    {active === 'completed' && (
                        <>
                            <ItemAdmin props={comple} total={total} convertDate={convertDate} />
                        </>
                    )}
                    {active === 'canceled' && (
                        <>
                            <ItemAdmin props={cancel} total={total} convertDate={convertDate} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdersMain;
