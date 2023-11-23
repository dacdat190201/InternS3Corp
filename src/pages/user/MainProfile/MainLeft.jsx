import React from 'react';
import './MainLeft.css';
import { BarChart } from '@mui/x-charts';
const MainLeft = () => {
    return (
        <div className="ItemLeft">
            <h2>Overview</h2>
            <div className="ItemLeft__main">
                <div>
                    <div className="left__top-left">
                        <div className="top__left-one">
                            <h3>Balance</h3>
                            <h3>$ 25.364</h3>
                        </div>
                        <div className="top__left-one">
                            <h3>Credit limit</h3>
                            <h3>$ 7.751</h3>
                        </div>
                        <button>Payments</button>
                    </div>
                </div>
                <div>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        width={442}
                        height={245}
                    />
                </div>
            </div>
            <div>
                <h2>Transactions</h2>
                <div className="left__bottom"></div>
            </div>
        </div>
    );
};

export default MainLeft;
