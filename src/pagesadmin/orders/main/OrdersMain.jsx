import React, { useContext, useState } from 'react';
import AuthContext from '../../../services/auth/context/AuthContext';
import AllOrAdmin from '../all/AllOrAdmin';
import { Badge } from '@mui/material';
import WaitingAdmin from '../waiting/WaitingAdmin';
import './OrdersMain.css';
import '../../../pages/user/history/OrderHistory.css';
import ShippingAdmin from '../shipping/ShippingAdmin';
import CompletedAdmin from '../completed/CompletedAdmin';
import CancelAdmin from '../cancel/CancelAdmin';
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
            <ul className="history__listItem">
                <li
                    className={active === 'All' ? 'history__Click-admin' : 'history__Item-admin'}
                    onClick={() => setActive('All')}
                >
                    <div className="history__a-admin">All</div>
                </li>

                <li
                    className={active === 'awaiting' ? 'history__Click-admin' : 'history__Item-admin'}
                    onClick={() => setActive('awaiting')}
                >
                    <div className="history__a-admin"></div>
                    <Badge badgeContent={awaitBadge} color="primary" className="history__a-admin">
                        Waiting for confirmation
                    </Badge>
                </li>
                <li
                    className={active === 'shipping' ? 'history__Click-admin' : 'history__Item-admin'}
                    onClick={() => setActive('shipping')}
                >
                    <Badge badgeContent={shipBadge} color="primary" className="history__a-admin">
                        Shipping
                    </Badge>
                </li>
                <li
                    className={active === 'completed' ? 'history__Click-admin' : 'history__Item-admin'}
                    onClick={() => setActive('completed')}
                >
                    <div className="history__a-admin"> Completed</div>
                </li>
                <li
                    className={active === 'canceled' ? 'history__Click-admin' : 'history__Item-admin'}
                    onClick={() => setActive('canceled')}
                >
                    <div className="history__a-admin">Canceled</div>
                </li>
            </ul>
            <div className="history__selected">
                {active === 'All' && (
                    <>
                        <AllOrAdmin props={inforUser} total={total} convertDate={convertDate} />
                    </>
                )}
                {active === 'awaiting' && (
                    <>
                        <WaitingAdmin
                            props={awaiting}
                            total={total}
                            confirmShipping={confirmShipping}
                            convertDate={convertDate}
                        />
                    </>
                )}
                {active === 'shipping' && (
                    <>
                        <ShippingAdmin props={ship} total={total} completed={completed} convertDate={convertDate} />
                    </>
                )}
                {active === 'completed' && (
                    <>
                        <CompletedAdmin props={comple} total={total} convertDate={convertDate} />
                    </>
                )}
                {active === 'canceled' && (
                    <>
                        <CancelAdmin props={cancel} total={total} convertDate={convertDate} />
                    </>
                )}
            </div>
        </div>
    );
};

export default OrdersMain;
