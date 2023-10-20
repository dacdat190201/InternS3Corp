import React from 'react';
import './WidgetLg.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
const WidgetLg = () => {
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Sold Today</h3>
            <ul className="widgetSmList">
                <li className="widgetSmListItem">
                    <img alt="" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">dadada</span>
                        <span className="widgetSmUserTitle">ID: 321</span>
                    </div>
                    <button className="widgetSmButton">
                        <VisibilityIcon className="widgetSmIcon" />
                        <Link style={{ color: 'black', textDecoration: 'none' }}>Detail</Link>
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img alt="" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">dadada</span>
                        <span className="widgetSmUserTitle">ID: 321</span>
                    </div>
                    <button className="widgetSmButton">
                        <VisibilityIcon className="widgetSmIcon" />
                        <Link style={{ color: 'black', textDecoration: 'none' }}>Detail</Link>
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img alt="" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">dadada</span>
                        <span className="widgetSmUserTitle">ID: 321</span>
                    </div>
                    <button className="widgetSmButton">
                        <VisibilityIcon className="widgetSmIcon" />
                        <Link style={{ color: 'black', textDecoration: 'none' }}>Detail</Link>
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img alt="" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">dadada</span>
                        <span className="widgetSmUserTitle">ID: 321</span>
                    </div>
                    <button className="widgetSmButton">
                        <VisibilityIcon className="widgetSmIcon" />
                        <Link style={{ color: 'black', textDecoration: 'none' }}>Detail</Link>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default WidgetLg;
