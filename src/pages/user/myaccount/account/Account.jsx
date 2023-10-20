import React, { useContext, useEffect, useState } from 'react';
import './Account.css';
import { Avatar } from '@mui/material';
import AccountLeft from '../accountLeft/AccountLeft';
import AuthContext from '../../../../services/auth/context/AuthContext';
import instance from '../../../../services/axios/axiosDomain/axiosDomain';
import { useNavigate } from 'react-router-dom';
const Account = () => {
    const [show, setShow] = useState(false);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            await instance
                .get(`/users/${token.id}`)
                .then((res) => setData(res.data))
                .catch((err) => console.log(err));
        };
        if (!token.token) {
            alert('404 Not Found');
            navigate('/home');
        }
        fetch();
    }, [token.id, token.token, navigate]);

    return (
        <div className="account__container">
            <div className="account__left">
                <h2>
                    {data?.firstName} {data?.lastName}
                </h2>
                <h4>{data?.email}</h4>

                <Avatar alt="Remy Sharp" src={data?.image} sx={{ width: 150, height: 150 }} />
                <div className="account__btn-delete">
                    <i className="fa-solid fa-trash-can" style={{ color: '#000000' }}></i>
                </div>
                <input type="file" className="account__btn-file" />

                <div className="account__title">
                    <h4>University: </h4> {data?.university}
                </div>
                <button onClick={() => setShow(!show)}>
                    <i className="fa-solid fa-right-to-bracket"></i>
                </button>
            </div>
            <div className="account__right">{show && <AccountLeft props={data} />}</div>
        </div>
    );
};

export default Account;
