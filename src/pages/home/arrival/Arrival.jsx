import React from 'react';
import './Arrival.css';
import AboutBottom from '../../about/aboutBottom/AboutBottom';
import { Link } from 'react-router-dom';
const Arrival = () => {
    return (
        <div className="arrival__main">
            <div className="sale__top">
                <div className="sale__top-item"></div>
                <div className="sale__top-title">Featured</div>
            </div>
            <div className="arrital__midle">
                <h1>New Arrival</h1>
            </div>
            <div className="wrapper">
                <div className="one">
                    <div>
                        <div className="arrital-content">
                            <Link to={'/laptops'} style={{ color: '#fff', textDecoration: 'none' }}>
                                <h1>PlayStation 5</h1>
                                <p>Black and White version of the PS5 comming out on</p>
                                <h3 style={{ textDecoration: 'underline' }}>Show Now</h3>
                            </Link>
                        </div>
                        <img src={require('../../../assets/images/Arrival/station.webp')} alt="PlayStation" />
                    </div>
                </div>
                <div className="two">
                    <div className="arrital-content1">
                        <Link to={'/womens-dresses'} style={{ color: '#fff', textDecoration: 'none' }}>
                            <h1>Woman's Collections</h1>
                            <p>Featured woman collections that give you another vibe</p>
                            <h3 style={{ textDecoration: 'underline' }}>Show Now</h3>
                        </Link>
                    </div>
                    <img src={require('../../../assets/images/Arrival/wearinghat.webp')} alt="Collections" />
                </div>

                <div className="three">
                    <div className="arrital-content2">
                        <Link to={'/automotive'} style={{ color: '#fff', textDecoration: 'none' }}>
                            <h1>Speakers</h1>
                            <p>Amazon wireless seapkers</p>
                            <h3 style={{ textDecoration: 'underline' }}>Show Now</h3>
                        </Link>
                    </div>
                    <img src={require('../../../assets/images/Arrival/speakers.webp')} alt="Speakers" height={222} />
                </div>
                <div className="four">
                    <div className="arrital-content2">
                        <Link to={'/fragrances'} style={{ color: '#fff', textDecoration: 'none' }}>
                            <h1>Perfumer</h1>
                            <p>GUCCI INTENSE OUD EDP</p>
                            <h3 style={{ textDecoration: 'underline' }}>Show Now</h3>
                        </Link>
                    </div>
                    <img src={require('../../../assets/images/Arrival/perfuma.webp')} alt="perfumer" />
                </div>
            </div>
            <AboutBottom />
        </div>
    );
};

export default Arrival;
