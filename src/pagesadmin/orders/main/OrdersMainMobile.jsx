import React, { useContext, useState } from 'react';
import BarBack from '../../../component/common/BarBack';
import { Tab, Tabs } from '@mui/material';
import ItemAdmin from '../ItemAdmin/ItemAdmin';
import AuthContext from '../../../services/auth/context/AuthContext';
import ItemMobileAdmin from '../ItemAdmin/ItemMobileAdmin';
const OrdersMainMobile = () => {
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
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="OrderMainMobile__main">
            <BarBack title={'My Order'} link="profile" />
            <div link="profile">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons={false}
                    aria-label="scrollable prevent tabs example"
                >
                    <Tab label="All" />
                    <Tab label="Confirm" />
                    <Tab label="Awaiting" />
                    <Tab label="Shipping" />
                    <Tab label="Completed" />
                    <Tab label="Canceled" />
                </Tabs>
                {value === 0 && <ItemMobileAdmin props={inforUser} total={total} convertDate={convertDate} />}
                {value === 1 && <ItemMobileAdmin props={inforUser} total={total} convertDate={convertDate} />}
                {value === 2 && <ItemMobileAdmin props={inforUser} total={total} convertDate={convertDate} />}
                {/* {value === 3 && <AllMobile props={shippingMobile} convertDate={convertDate} />}
        {value === 4 && <AllMobile props={completedMobile} convertDate={convertDate} />}
        {value === 5 && <AllMobile props={canceledMobile} convertDate={convertDate} />} */}
            </div>
        </div>
    );
};

export default OrdersMainMobile;
