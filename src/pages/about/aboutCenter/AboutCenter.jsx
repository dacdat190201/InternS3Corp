import React from 'react';
import './AboutCenter.css';
function AboutCenter() {
    return (
        <div className="about__container">
            <div className="abount-content">
                <h1>Our Story</h1>
                <br></br>
                <h4>
                    Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active
                    presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions,
                    Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
                </h4>
                <br></br>
                <h4>
                    Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a
                    diverse assotment in categories ranging from consumer.
                </h4>
            </div>
            <div className="about-img">
                <img src={require('../../../assets/images/about.png')} alt="" />
            </div>
        </div>
    );
}

export default AboutCenter;
