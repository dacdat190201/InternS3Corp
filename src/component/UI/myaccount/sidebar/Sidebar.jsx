import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../services/auth/context/AuthContext';
function Sidebar() {
    const { token } = useContext(AuthContext);
    const currentURL = window.location.href;
    const pathSegments = currentURL.split('/');
    const currentNav = pathSegments[pathSegments.length - 1];
    const [activeMenu, setActiveMenu] = useState(currentNav);
    return (
        <div className="user__sidebar">
            <div className="user__center">
                <p className="title">Main</p>
                <div className="user__list-item">
                    <Link
                        to={`/myaccount`}
                        className={'user__hover-none ' + (activeMenu === 'main' ? 'user__hover' : 'user__hover-none')}
                        onClick={() => setActiveMenu('main')}
                    >
                        <i className="fa-brands fa-windows icon1"></i>
                        <span className="span1">Main</span>
                    </Link>
                </div>
                <p className="title">List</p>
                <div className="user__list-item">
                    <Link
                        className={
                            'user__hover-none ' + (activeMenu === token.username ? 'user__hover' : 'user__hover-none')
                        }
                        onClick={() => setActiveMenu(token.username)}
                        to={`/myaccount/profile/${token.username}`}
                    >
                        <i className="fa-regular fa-user icon1"></i>
                        <span className="span1">Profile</span>
                    </Link>
                </div>
                <div className="user__list-item">
                    <Link
                        to={`/myaccount/${token.username}/checkout`}
                        className={
                            'user__hover-none ' + (activeMenu === 'checkout' ? 'user__hover' : 'user__hover-none')
                        }
                        onClick={() => setActiveMenu('checkout')}
                    >
                        <i className="fa-regular fa-credit-card icon1"></i>
                        <span className="span1">View Cart</span>
                    </Link>
                </div>
                {/* <li>
        <i class="fa-brands fa-pied-piper icon1"></i>
        <span className="span1">Logs</span>
      </li> */}
                <div className="user__list-item">
                    <Link
                        to={`/myaccount/${token.username}/history`}
                        className={
                            'user__hover-none ' + (activeMenu === 'history' ? 'user__hover' : 'user__hover-none')
                        }
                        onClick={() => setActiveMenu('history')}
                    >
                        <i className="fa-solid fa-calendar icon1"></i>
                        <span className="span1">Your Order History</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
