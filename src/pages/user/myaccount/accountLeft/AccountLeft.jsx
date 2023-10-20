import React, { useState } from 'react';
import './AccountLeft.css';
import UserInfor from './userInfor/UserInfor';
import BillingInfor from './billingInfor/BillingInfor';
const AccountLeft = ({ props }) => {
    const [active, setActive] = useState('userinfor');
    return (
        <div className="accountLeft__container">
            <div className="accountLeft__main">
                <h2>Edit Profile</h2>
                <div className="account__tabs">
                    <div
                        className={active === 'userinfor' ? 'userInfor-btn' : 'account-btn'}
                        onClick={() => setActive('userinfor')}
                    >
                        User Infor
                    </div>
                    <div
                        className={active === 'billinginfor' ? 'userInfor-btn' : 'account-btn'}
                        onClick={() => setActive('billinginfor')}
                    >
                        Billing information
                    </div>
                </div>
                <div>
                    {active === 'userinfor' && <UserInfor props={props} />}
                    {active === 'billinginfor' && <BillingInfor props={props} />}
                </div>
            </div>
        </div>
    );
};

export default AccountLeft;
