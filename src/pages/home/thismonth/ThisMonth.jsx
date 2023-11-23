import React from 'react';
import './ThisMonth.css';
import Discount from '../discount/Discount';
import { Link } from 'react-router-dom';
import TitleCata from '../../../component/common/TitleCata';
import ButtonView from '../../../component/common/ButtonView';
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
        <div className="thismonth__container">
            <TitleCata props="This Month" />
            {/* <Discount /> */}
            <div className="bg__thismount">
                <div className="bg__thismount-content">
                    <div className="bg__thismount-title">
                        <h4>Category</h4>
                        <h1 className="textBanner">
                            Enhance Your<br></br> Music Experience
                        </h1>

                        <div className="bg__time">
                            <div className="bg__time-countdow">
                                <div className="time__countdowsTitle">{timeLeft.hours}</div>
                                <div className="font__bg-time">Hours</div>
                            </div>
                            <div className="bg__time-countdow">
                                <div className="time__countdowsTitle">{timeLeft.days}</div>
                                <div className="font__bg-time">Days</div>
                            </div>

                            <div className="bg__time-countdow">
                                <div className="time__countdowsTitle">{timeLeft.minutes}</div>
                                <div className="font__bg-time">Minutes</div>
                            </div>
                            <div className="bg__time-countdow">
                                <div className="time__countdowsTitle">{timeLeft.seconds}</div>
                                <div className="font__bg-time">Seconds</div>
                            </div>
                        </div>
                    </div>
                    <Link style={{ textDecoration: 'none' }} to={'/products/86'}>
                        <ButtonView props="Buy Now!" />
                    </Link>
                </div>
                <div className="Thismonth__Shadow">
                    <img
                        src={require('../../../assets/images/ThumbailJBL.webp')}
                        alt="QC_speakJBL"
                        className="bg__thismount-img"
                    />
                </div>
            </div>
        </div>
    );
}

export default ThisMonth;
