import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import './Navbar.css';
function Navbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <input type="text" placeholder="Search..." name="navBar_User" />
                    </div>
                    <div className="topbarIconContainer">
                        <NotificationsNoneIcon />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <LanguageIcon />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <SettingsIcon />
                    </div>
                    {/* <img
        src={`${process.env.REACT_APP_URL_HINH}/Images/${userProfile.imagesUser}`}
        alt=""
        className="topAvatar"
      /> */}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
