import React from 'react';
import './Common.css';
const ButtonView = ({ props, size }) => {
    if (size === 'admin') {
        return <button className="admin-button">{props}</button>;
    } else if (size === 'white') {
        return <button className="white-button">{props}</button>;
    } else if (size === 'mobile') {
        return <button className="mobile-button">{props}</button>;
    } else if (size === 'sm') {
        return <button className="sm-button">{props}</button>;
    } else if (size === 'sm-white') {
        return <button className="sm-button-white">{props}</button>;
    } else if (size === 'sm-') {
        return <button className="sm-button">{props}</button>;
    } else {
        return <button className="md-button">{props}</button>;
    }
};

export default ButtonView;
