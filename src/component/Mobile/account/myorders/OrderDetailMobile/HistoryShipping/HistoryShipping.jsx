import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../../../../../services/auth/context/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import '../../../viewcart/ViewCartMobile.css';
import '../DetailMobile.css';
import BarBack from '../../../../../common/BarBack';
const HistoryShipping = () => {
    const { token, inforUser, convertDate } = useContext(AuthContext);
    const [filter, setFilter] = useState('');

    const ref = useRef();
    const navigate = useNavigate();
    const param = useParams();
    useEffect(() => {
        setFilter(inforUser.find((item) => item.id.toString() === param.id));

        if (!token.token) {
            navigate('/');
        }
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [token.token, navigate, inforUser, param.id]);

    return (
        <div className="ProfileM__container" ref={ref} style={{ marginBottom: 40 }}>
            <BarBack title="History" link={`myorder/detail/${param.id}`} />

            <div className="BreadName orDetail__title">
                <span style={{ fontWeight: 500, display: 'flex', gap: 8, alignItems: 'center' }}>
                    <LocalShippingOutlinedIcon />
                    Shipping information
                </span>
                <div
                    style={{
                        color: '#2AA952',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                    }}
                >
                    <GppGoodOutlinedIcon />
                </div>
            </div>
            {filter &&
                filter?.status.message.map((item, key) => {
                    return (
                        <div
                            className="titleItem500"
                            style={{
                                borderLeft: '1px solid grey',
                                padding: 8,
                                marginBottom: 24,
                            }}
                            key={key}
                        >
                            <div style={{ color: 'rgb(42, 169, 82)', marginBottom: 12 }}>{item?.title}</div>

                            <div style={{ fontSize: 12 }}>{convertDate(item?.date)}</div>
                        </div>
                    );
                })}
        </div>
    );
};

export default HistoryShipping;
