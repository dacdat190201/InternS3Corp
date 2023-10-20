import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AuthContext from '../../../../services/auth/context/AuthContext';
import { Tab, Tabs } from '@mui/material';
import './MyOrder.css';
import '../viewcart/ViewCartMobile.css';
import AllMobile from './ListOrder/All/AllMobile';

const MyOrder = () => {
    const { token, inforUser, convertDate } = useContext(AuthContext);
    const ref = useRef();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [token.token, navigate]);
    const confirmMobile = inforUser.filter((item) => item.status.name === 'confirm');
    const awaitingMobile = inforUser.filter((item) => item.status.name === 'awaiting');
    const canceledMobile = inforUser.filter((item) => item.status.name === 'canceled');
    const shippingMobile = inforUser.filter((item) => item.status.name === 'shipping');
    const completedMobile = inforUser.filter((item) => item.status.name === 'completed');

    return (
        <div className="ProfileM__container" ref={ref}>
            <div className="ViewCart__Top">
                <Link style={{ color: 'black' }} to={'/profile'}>
                    <ArrowBackIosIcon />
                </Link>
                <SearchIcon />
            </div>
            <h2>My Orders</h2>
            <div className="MyOrder">
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
                {value === 0 && <AllMobile props={inforUser} convertDate={convertDate} />}
                {value === 1 && <AllMobile props={confirmMobile} convertDate={convertDate} />}
                {value === 2 && <AllMobile props={awaitingMobile} convertDate={convertDate} />}
                {value === 3 && <AllMobile props={shippingMobile} convertDate={convertDate} />}
                {value === 4 && <AllMobile props={completedMobile} convertDate={convertDate} />}
                {value === 5 && <AllMobile props={canceledMobile} convertDate={convertDate} />}
            </div>
        </div>
    );
};

export default MyOrder;
