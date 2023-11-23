import React from 'react';
import './Common.css';
import { Link } from 'react-router-dom';
const BreadcurmbNavigation = ({ props }) => {
    return (
        <div className="breadcrum__main">
            <Link to={'/home'} style={{ color: '#AAAAAA', textDecoration: 'none' }}>
                Home
            </Link>{' '}
            / {props.charAt(0).toUpperCase() + props.slice(1)}
        </div>
    );
};

export default BreadcurmbNavigation;
