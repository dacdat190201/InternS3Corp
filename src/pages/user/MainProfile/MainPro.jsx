import React, { useContext, useEffect, useState } from 'react';
import './MainPro.css';
import { Avatar, AvatarGroup } from '@mui/material';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import AuthContext from '../../../services/auth/context/AuthContext';
import { Link } from 'react-router-dom';
import MainLeft from './MainLeft';
import AddContact from './addContact/AddContact';
const MainPro = () => {
    const [user, setUser] = useState();
    const [data, setData] = useState();
    const [click, setClick] = useState(false);
    const { token } = useContext(AuthContext);
    useEffect(() => {
        const fetch = async () => {
            await instance
                .get('/users')
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => console.log(err));
        };
        const fetchToken = async () => {
            await instance
                .get(`/users/${token.id}`)
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => console.log(err));
        };
        fetch();
        fetchToken();
    }, [token.id]);

    return (
        <div className="grid__profile">
            <div>
                <MainLeft />
            </div>
            <div>
                <div className="mainProfile__right">
                    <div className="mainProfile__right-container">
                        <div className="mProfile__title">
                            <h3>Wallet</h3>
                        </div>
                        <div className="mProfile__card">
                            <div className="mProfile__top-part">
                                <div className="mProfile__chip-image">
                                    <img src="https://i.imgur.com/PEKNCj9.png" alt="card__chip" />
                                </div>
                            </div>
                            <div className="mProfile__card-details">
                                <div className="mProfile__card-number">
                                    <span>{data?.bank.cardNumber}</span>
                                </div>
                                <div className="mProfile__date">
                                    <span>{data?.bank.cardExpire}</span>
                                </div>
                                <div className="mProfile__date">
                                    <h3>{data?.bank.currency}</h3>
                                </div>
                            </div>
                            <div className="mProfile__picture">
                                <img src="http://imgur.com/KpIC2Cs.png" alt="card__picture" />
                            </div>
                        </div>
                    </div>
                    <div className="mainProfile__right-container">
                        <div className="mProfile__title">
                            <h3>Quick transfer</h3>
                        </div>
                        <div className="quick__container">
                            <div className="quick__input-buton">
                                <input type="text" name="cart_debit" id="cart_debit" />
                                <button>
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1.3678 1.30932C1.54604 1.15473 1.79985 1.12273 2.01087 1.22825L12.5109 6.47825C12.7085 6.57706 12.8333 6.77905 12.8333 7C12.8333 7.22095 12.7085 7.42294 12.5109 7.52175L2.01087 12.7717C1.79985 12.8773 1.54604 12.8453 1.3678 12.6907C1.18956 12.5361 1.12199 12.2894 1.1966 12.0655L2.88511 7L1.1966 1.93446C1.12199 1.71064 1.18956 1.4639 1.3678 1.30932ZM3.92044 7.58333L2.74874 11.0984L10.9456 7L2.74874 2.90155L3.92044 6.41667H7C7.32217 6.41667 7.58333 6.67783 7.58333 7C7.58333 7.32217 7.32217 7.58333 7 7.58333H3.92044Z"
                                            fill="url(#paint0_linear_10_143)"
                                            fillOpacity="0.2"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1.3678 1.30932C1.54604 1.15473 1.79985 1.12273 2.01087 1.22825L12.5109 6.47825C12.7085 6.57706 12.8333 6.77905 12.8333 7C12.8333 7.22095 12.7085 7.42294 12.5109 7.52175L2.01087 12.7717C1.79985 12.8773 1.54604 12.8453 1.3678 12.6907C1.18956 12.5361 1.12199 12.2894 1.1966 12.0655L2.88511 7L1.1966 1.93446C1.12199 1.71064 1.18956 1.4639 1.3678 1.30932ZM3.92044 7.58333L2.74874 11.0984L10.9456 7L2.74874 2.90155L3.92044 6.41667H7C7.32217 6.41667 7.58333 6.67783 7.58333 7C7.58333 7.32217 7.32217 7.58333 7 7.58333H3.92044Z"
                                            fill="#FAFBFC"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_10_143"
                                                x1="1.16664"
                                                y1="7"
                                                x2="12.8333"
                                                y2="7"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stopColor="#F0F0F0" />
                                                <stop offset="1" stopColor="#F0F0F0" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                            <div className="quick__debit">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <svg
                                        width="31"
                                        height="21"
                                        viewBox="0 0 31 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <ellipse cx="21" cy="10.4884" rx="9.76744" ry="9.76744" fill="#F79E1B" />
                                        <ellipse cx="9.76744" cy="10.4884" rx="9.76744" ry="9.76744" fill="#EB001B" />
                                        <path
                                            d="M15.3837 18.4807C17.8945 16.7131 19.5349 13.7923 19.5349 10.4884C19.5349 7.18449 17.8945 4.26372 15.3837 2.49612C12.873 4.26372 11.2326 7.18449 11.2326 10.4884C11.2326 13.7923 12.873 16.7131 15.3837 18.4807Z"
                                            fill="#FF5F00"
                                        />
                                    </svg>
                                    <span>Debit</span>
                                </div>
                                <div>$ 10.66</div>
                            </div>
                            <div className="quick__entermount">
                                <span>Enter mount</span>
                                <span style={{ color: 'black' }}>$ 1.6</span>
                            </div>
                            <div className="quick__btn">
                                <button className="btn-sendmoney">Send money</button>
                                <button className="btn-saveAsDraft">Save as draft</button>
                            </div>
                        </div>
                    </div>
                    <div className="mainProfile__right-container">
                        <div className="buttons__container">
                            <div className="buttons__List">
                                <div className="buttons__Items">
                                    <img
                                        src={require('../../../assets/icon/main_buton1.svg').default}
                                        alt="main__btn1"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <span>Send</span>
                            </div>
                            <div className="buttons__List">
                                <div className="buttons__Items">
                                    <img
                                        src={require('../../../assets/icon/main_button2.svg').default}
                                        alt="main__btn1"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <span>Receive</span>
                            </div>
                            <div className="buttons__List">
                                <div className="buttons__Items">
                                    <img
                                        src={require('../../../assets/icon/main_button3.svg').default}
                                        alt="main__btn1"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <span>Invoicing</span>
                            </div>
                            <div className="buttons__List">
                                <div className="buttons__Items">
                                    <img
                                        src={require('../../../assets/icon/main_button4.svg').default}
                                        alt="main__btn1"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    </div>
                    <div className="mainProfile__right-container">
                        <div className="mProfile__title">
                            <h3>Contacts</h3>
                        </div>
                        <div className="contacts__container">
                            <AvatarGroup>
                                <Avatar onClick={() => setClick(!click)}>+</Avatar>
                                {user &&
                                    user.users.map((item, key) => {
                                        return (
                                            <Link to={`/user/${item.id}`} key={key}>
                                                <Avatar alt="Remy Sharp" src={item.image} />
                                            </Link>
                                        );
                                    })}

                                <Avatar>+{user?.total}</Avatar>
                            </AvatarGroup>
                        </div>
                    </div>
                    {click && (
                        <>
                            <AddContact />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPro;
