import React from 'react';
import './Common.css';
const TitleCata = ({ props }) => {
    return (
        <div className="titleCata__container">
            <div className="titleCata-block"></div>
            <div className="titleCata-title">{props}</div>
        </div>
    );
};

export default TitleCata;
