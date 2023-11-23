import React from 'react';
import './FuturedInfo.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const FuturedInfo = () => {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="NamePanel">Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="BreadName">₫ 321</span>
                    <span className="BreadName">
                        -11.4 <ArrowDownwardIcon className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Days</span>
            </div>
            <div className="featuredItem">
                <span className="NamePanel">Month</span>
                <div className="featuredMoneyContainer">
                    <span className="BreadName">₫ 4444</span>
                    <span className="BreadName">
                        -1.4 <ArrowDownwardIcon className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Month</span>
            </div>
            <div className="featuredItem">
                <span className="NamePanel">Year</span>
                <div className="featuredMoneyContainer">
                    <span className="BreadName">₫ 32322</span>
                    <span className="BreadName">
                        +2.4 <ArrowUpwardIcon className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Revenue of the year</span>
            </div>
        </div>
    );
};

export default FuturedInfo;
