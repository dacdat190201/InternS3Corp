import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './WidgetSm.css';
const WidgetSm = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchDetail = async () => {
            instance.get('/users').then((res) => {
                setData(res.data);
            });
        };
        fetchDetail();
    }, []);
    console.log(data);
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Menber</span>
            <ul className="widgetSmList">
                {data &&
                    data?.users?.slice(0, 5).map((item, key) => {
                        return (
                            <li className="widgetSmListItem" key={key}>
                                <img src={`${item.image}`} alt="" className="widgetSmImg" />
                                <div className="widgetSmUser">
                                    <span className="widgetSmUsername">
                                        {item.firstName} &nbsp;
                                        {item.lastName}
                                    </span>
                                    <span className="widgetSmUserTitle">New Menber</span>
                                </div>
                                <button className="widgetSmButton">
                                    <VisibilityIcon className="widgetSmIcon" />
                                    <Link
                                        to={`/Admin/ListUser/User/${item.maSinhVien}`}
                                        style={{ color: 'black', textDecoration: 'none' }}
                                    >
                                        Detail
                                    </Link>
                                </button>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default WidgetSm;
