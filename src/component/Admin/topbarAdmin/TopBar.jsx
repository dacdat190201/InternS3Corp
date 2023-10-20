import React, { useContext } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import './TopBar.css';
import AuthContext from '../../../services/auth/context/AuthContext';
const TopBar = () => {
    const { token } = useContext(AuthContext);
    return (
        <div className="topbar__admin">
            <div className="topbarWrapper__admin">
                <div className="topLeft__r__admin">
                    <span className="logo-admin__admin">Exclude</span>
                </div>
                <div className="topRight__admin">
                    <div className="topbarIconContainer__admin">
                        <NotificationsNoneIcon />
                        <span className="topIconBadge__admin">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <LanguageIcon />
                        <span className="topIconBadge__admin">2</span>
                    </div>
                    <div className="topbarIconContainer__admin">
                        <SettingsIcon />
                    </div>
                    <img src={token.image} alt="" className="topAvatar__admin" />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
