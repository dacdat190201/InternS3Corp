import React from 'react';
import { Link } from 'react-router-dom';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TimelineIcon from '@mui/icons-material/Timeline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ReportIcon from '@mui/icons-material/Report';
import './SideBar.css';

const SideBar = () => {
    return (
        <div className="sidebar-admin">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/Admin" className="Admin__Link-item">
                            <li className="sidebarListItem active">
                                <LineStyleIcon className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                        <Link to="/Admin/orders" className="Admin__Link-item">
                            <li className="sidebarListItem">
                                <DynamicFeedIcon className="sidebarIcon" />
                                Orders
                            </li>
                        </Link>
                        <Link className="Admin__Link-item">
                            <li className="sidebarListItem">
                                <TimelineIcon className="sidebarIcon" />
                                Chart
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link className="Admin__Link-item">
                            <li className="sidebarListItem">
                                <PermIdentityIcon className="sidebarIcon" />
                                Users
                            </li>
                        </Link>
                        <Link className="Admin__Link-item">
                            <li className="sidebarListItem">
                                <StorefrontIcon className="sidebarIcon" />
                                Products
                            </li>
                        </Link>

                        <Link className="Admin__Link-item">
                            <li className="sidebarListItem">
                                <AttachMoneyIcon className="sidebarIcon" />
                                Coupon
                            </li>
                        </Link>
                        <Link className="Admin__Link-item">
                            <li className="sidebarListItem">
                                <BarChartIcon className="sidebarIcon" />
                                BILL
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <Link className="Admin__Link-item">
                            <li className="sidebarListItem">
                                <ChatBubbleOutlineIcon className="sidebarIcon" />
                                Post
                            </li>
                        </Link>
                        <Link className="Admin__Link-item">
                            <li className="sidebarListItem">
                                <MailOutlineIcon className="sidebarIcon" />
                                Form
                            </li>
                        </Link>
                        <Link className="Admin__Link-item">
                            <li className="sidebarListItem">
                                <DynamicFeedIcon className="sidebarIcon" />
                                Notes
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <Link className="Admin__Link-item">
                            <li className="sidebarListItem">
                                <WorkOutlineIcon className="sidebarIcon" />
                                Manager
                            </li>
                        </Link>

                        <li className="sidebarListItem">
                            <ReportIcon className="sidebarIcon" />
                            Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
