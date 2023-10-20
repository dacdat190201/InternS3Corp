import React from 'react';
import './TopHeader.css';
import { useNavigate } from 'react-router-dom';
function TopHeader() {
    const navigate = useNavigate();
    const handle = (value) => {
        navigate(`/${value}`);
    };
    return (
        <div className="headerTop">
            <div className="headerTopLeft">
                <div className="header-sologan">
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                </div>
                <h4 className="header-now">ShopNow</h4>
            </div>
            <div className="headerTop__Right">
                <select
                    className="headerTop_Right-Selectbox"
                    id="select__HeaderTop"
                    onClick={(e) => handle(e.target.value)}
                >
                    <option value="home">Client</option>

                    <option value="admin">Admin</option>
                </select>

                <svg id="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.364 12.95L17.314 8L18.728 9.414L12.364 15.778L6.00003 9.414L7.41403 8L12.364 12.95Z"
                        fill="white"
                    />
                </svg>
            </div>
        </div>
    );
}

export default TopHeader;
