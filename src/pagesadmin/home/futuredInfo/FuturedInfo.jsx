import React from 'react';
import './FuturedInfo.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const FuturedInfo = () => {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">₫ 321</span>
                    <span className="featuredMoneyRate">
                        -11.4 <ArrowDownwardIcon className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Days</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Month</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">₫ 4444</span>
                    <span className="featuredMoneyRate">
                        -1.4 <ArrowDownwardIcon className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Year</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">₫ 32322</span>
                    <span className="featuredMoneyRate">
                        +2.4 <ArrowUpwardIcon className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Revenue of the year</span>
            </div>
        </div>
    );
};

export default FuturedInfo;
