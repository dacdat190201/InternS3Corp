import React from 'react';
import './HomeAdmin.css';
import FuturedInfo from '../futuredInfo/FuturedInfo';
import WidgetSm from '../widgetSm/WidgetSm';
import WidgetLg from '../widgetLg/WidgetLg';
import Chart from '../chart/Chart';

const HomeAdmin = () => {
    return (
        <div className="home-admin">
            <FuturedInfo />
            <Chart />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
};

export default HomeAdmin;
