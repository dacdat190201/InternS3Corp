import React from 'react';
import './ThisMonth.css';
import Discount from '../discount/Discount';
import { Link } from 'react-router-dom';
function calculateTimeLeft() {
    const year = new Date().getFullYear();
    const difference = +new Date(`${year}-12-1`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    return timeLeft;
}
function ThisMonth() {
    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

    React.useEffect(() => {
        const id = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearTimeout(id);
        };
    });

    return (
        <div>
            <div className="sale__top">
                <div className="sale__top-item"></div>
                <div className="sale__top-title">This Month</div>
            </div>

            <Discount />
            <div className="bg__thismount">
                <div className="bg__thismount-content">
                    <h4>Category</h4>
                    <h1>Enhance Your</h1>
                    <h1>Music Experience</h1>
                    <div className="bg__time">
                        <div className="bg__time-countdow">
                            <div style={{ fontWeight: 'bold' }}>{timeLeft.hours} </div>
                            <div style={{ fontSize: 12 }}>Hours</div>
                        </div>
                        <div className="bg__time-countdow">
                            <div style={{ fontWeight: 'bold' }}>{timeLeft.days}</div>
                            <div style={{ fontSize: 12 }}>Days</div>
                        </div>

                        <div className="bg__time-countdow">
                            <div style={{ fontWeight: 'bold' }}>{timeLeft.minutes} </div>
                            <div style={{ fontSize: 12 }}>Minutes</div>
                        </div>
                        <div className="bg__time-countdow">
                            <div style={{ fontWeight: 'bold' }}>{timeLeft.seconds} </div>
                            <div style={{ fontSize: 12 }}>Seconds</div>
                        </div>
                    </div>
                    <Link style={{ textDecoration: 'none' }} to={'/products/86'}>
                        <button style={{ fontSize: 17 }}>Buy Now!</button>
                    </Link>
                </div>
                <img
                    src={require('../../../assets/images/ThumbailJBL.webp')}
                    alt="QC_speakJBL"
                    className="bg__thismount-img"
                />
            </div>
        </div>
    );
}

export default ThisMonth;
