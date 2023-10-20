import React, { useContext, useState } from 'react';
import AuthContext from '../../../../services/auth/context/AuthContext';
import '../../../../pages/user/checkout/cancel/CancelConfirm.css';
import './CanceledMobile.css';
const CanceledMobile = ({ props, close }) => {
    const [value, setValue] = useState();
    const { canceledInfor } = useContext(AuthContext);
    const handle = () => {
        if (value) {
            canceledInfor(props, value);
            close();
        } else {
            alert('Please select an option');
        }
    };
    return (
        <div className="cancelMobile">
            <div className="cancelMobile-container">
                <h3>Reason for canceling this order</h3>
                <div>
                    <div className="cancelMobile_rdo">
                        <input
                            type="radio"
                            name="topping"
                            value="Wrong shipping address"
                            id="large2"
                            onChange={(e) => setValue(e.target.value)}
                        />

                        <div htmlFor="large2">Wrong shipping address</div>
                    </div>
                    <div className="cancelMobile_rdo">
                        <input
                            type="radio"
                            name="topping"
                            value="Cancel to re-order"
                            id="large2"
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <div htmlFor="large2">Cancel to re-order</div>
                    </div>
                    <div className="cancelMobile_rdo">
                        <input
                            type="radio"
                            name="topping"
                            value="Found another better product"
                            id="large2"
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <div htmlFor="large2">Found another better product</div>
                    </div>
                    <div className="cancelMobile_rdo">
                        <input
                            type="radio"
                            name="topping"
                            value="Other reasons"
                            id="large2"
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <div htmlFor="large2">Other reasons</div>
                    </div>
                </div>
                <div className="cancelMobile-btn">
                    <button
                        onClick={() => {
                            handle();
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CanceledMobile;
