import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { Link } from 'react-router-dom';
import './Common.css';
const BarBack = ({ link, title, search }) => {
    return (
        <div className="backBar">
            <Link style={{ color: 'black' }} to={`/${link}`}>
                <ArrowBackIosIcon />
            </Link>
            <h4 className="NamePanel">{title}</h4>
        </div>
    );
};

export default BarBack;
