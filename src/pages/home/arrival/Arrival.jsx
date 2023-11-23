import React from 'react';
import './Arrival.css';
import { Link } from 'react-router-dom';
import TitleCata from '../../../component/common/TitleCata';
import DeveliryIcon from '../../../component/common/DeveliryIcon';
import BannerTitle from '../../../component/common/BannerTitle';
const Arrival = () => {
    return (
        <div className="arrival__main">
            <TitleCata props="Featured" />
            <div className="arrital__midle">
                <BannerTitle props="New Arrival" />
            </div>
            <div className="wrapper">
                <div className="one">
                    <div className="arrital-content">
                        <h1>PlayStation 5</h1>
                        <p>Black and White version of the PS5 coming out on sale.</p>
                        <Link to={'/laptops'} className="arrital-show">
                            Show Now
                        </Link>
                    </div>
                    <img src={require('../../../assets/images/Arrival/station.webp')} alt="PlayStation" />
                </div>
                <div className="two">
                    <div className="arrital-content1">
                        <h1>Woman's Collections</h1>
                        <p>Featured woman collections that give you another vibe</p>
                        <Link to={'/womens-dresses'} className="arrital-show">
                            Show Now
                        </Link>
                    </div>
                    <img src={require('../../../assets/images/Arrival/wearinghat.webp')} alt="Collections" />
                </div>

                <div className="three">
                    <div className="arrital-content2">
                        <h1>Speakers</h1>
                        <p>Amazon wireless seapkers</p>
                        <Link to={'/automotive'} className="arrital-show">
                            Show Now
                        </Link>
                    </div>
                    <img src={require('../../../assets/images/Arrival/speakers.webp')} alt="Speakers" />
                </div>
                <div className="four">
                    <div className="arrital-content2">
                        <h1>Perfumer</h1>
                        <p>GUCCI INTENSE OUD EDP</p>
                        <Link to={'/fragrances'} className="arrital-show">
                            Show Now
                        </Link>
                    </div>
                    <img src={require('../../../assets/images/Arrival/perfuma.webp')} alt="perfumer" />
                </div>
            </div>
            <DeveliryIcon />
        </div>
    );
};

export default Arrival;
