import React, { useContext, useState } from 'react';
import './TopBar.css';
import AuthContext from '../../../services/auth/context/AuthContext';
import { Link } from 'react-router-dom';
const TopBar = () => {
    const { token } = useContext(AuthContext);
    const currentURL = window.location.href;
    const pathSegments = currentURL.split('/');
    const currentNav = pathSegments[pathSegments.length - 1];
    const [activeMenu, setActiveMenu] = useState(currentNav);
    return (
        <div className="topbar__admin">
            <div className="topbarWrapper__admin">
                <div className="topLeft__r__admin">
                    <span className="logo-admin__admin">Exclude</span>
                </div>
                <div className="menu-admin__main">
                    <ul>
                        <Link
                            to={'/Admin'}
                            style={{ textDecoration: 'none', color: '#000' }}
                            className={'navLink ' + (activeMenu === 'home' ? 'menu-admin__li' : 'navLink')}
                            onClick={() => setActiveMenu('home')}
                        >
                            Home
                        </Link>
                        <Link
                            to="/Admin/orders"
                            style={{ textDecoration: 'none', color: '#000' }}
                            className={'navLink ' + (activeMenu === 'order' ? 'menu-admin__li' : 'navLink')}
                            onClick={() => setActiveMenu('order')}
                        >
                            Order
                        </Link>
                        <Link
                            style={{ textDecoration: 'none', color: '#000' }}
                            className={'navLink ' + (activeMenu === 'chart' ? 'menu-admin__li' : 'navLink')}
                            onClick={() => setActiveMenu('chart')}
                        >
                            Chart
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
