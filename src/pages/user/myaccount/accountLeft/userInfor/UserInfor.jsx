import React from 'react';
import './UserInfor.css';
const UserInfor = ({ props }) => {
    return (
        <div>
            <div className="userInfor__container">
                <div className="userinfor__left">
                    <div className="userInfor-input">
                        <label htmlFor="Name">Full name</label>
                        <input type="text" alt="abs" placeholder={props.lastName} id="Name" autoComplete="name" />
                    </div>
                    <div className="userInfor-input">
                        <label htmlFor="Password">Password</label>
                        <input
                            type="password"
                            alt="abs"
                            placeholder="password"
                            id="Password"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="userInfor-input">
                        <label htmlFor="Email">Email Address</label>
                        <input type="text" alt="abs" placeholder={props.email} id="Email" autoComplete="email" />
                    </div>
                </div>
                <div className="userinfor__right">
                    <div className="userInfor-input">
                        <label htmlFor="Username">Username</label>
                        <input
                            type="text"
                            alt="abs"
                            placeholder={props.username}
                            id="Username"
                            autoComplete="username"
                        />
                    </div>
                    <div className="userInfor-input">
                        <label htmlFor="ConfirmPass">Confirm Password</label>
                        <input
                            type="text"
                            alt="abs"
                            placeholder="Confirm"
                            id="ConfirmPass"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="userInfor-input">
                        <label htmlFor="Address">Address</label>
                        <input
                            type="text"
                            alt="abs"
                            placeholder={props.address.address}
                            id="Address"
                            autoComplete="street-address"
                        />
                    </div>
                </div>
            </div>
            <div className="userInfor__bottom">
                <h2>Social Profile</h2>
                <div className="userInfor__botton-input">
                    <div className="user__button-input">
                        <div className="icon123">
                            <i className="fa-brands fa-facebook" style={{ color: '#0c4569', width: '35px' }}></i>
                        </div>
                        <input type="text" placeholder="link facebook......." name="LinkFB" />
                    </div>
                    <div className="user__button-input">
                        <div className="icon123">
                            <i className="fa-brands fa-twitter" style={{ color: '#2477b7', width: '35px' }}></i>
                        </div>
                        <input type="text" placeholder="link twitter......." name="LinkTwitter" />
                    </div>
                </div>
            </div>
            <div className="userInfor__bottom">
                <button className="userInfor__button-update">Update Info</button>
            </div>
        </div>
    );
};

export default UserInfor;
