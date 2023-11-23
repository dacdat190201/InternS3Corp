import React, { useContext, useState } from 'react';
import './CancelConfirm.css';
import AuthContext from '../../../../services/auth/context/AuthContext';
import ButtonView from '../../../../component/common/ButtonView';
const CancelConfirm = ({ conDetail, props, setClick, btnCancel }) => {
    const [value, setValue] = useState();
    const { canceledInfor } = useContext(AuthContext);
    return (
        <div className="cancelConfirm">
            <div className="cancelConfirm-container">
                <h2 style={{ fontSize: 18 }}>Reason for canceling this order</h2>
                <div>
                    <div className="cancelConfirm_rdo">
                        <input
                            type="radio"
                            name="topping"
                            value="Wrong shipping address"
                            id="large2"
                            onChange={(e) => setValue(e.target.value)}
                        />

                        <div htmlFor="large2">Wrong shipping address</div>
                    </div>
                    <div className="cancelConfirm_rdo">
                        <input
                            type="radio"
                            name="topping"
                            value="Cancel to re-order"
                            id="large2"
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <div htmlFor="large2">Cancel to re-order</div>
                    </div>
                    <div className="cancelConfirm_rdo">
                        <input
                            type="radio"
                            name="topping"
                            value="Found another better product"
                            id="large2"
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <div htmlFor="large2">Found another better product</div>
                    </div>
                    <div className="cancelConfirm_rdo">
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
                <div
                    onClick={() => {
                        canceledInfor(conDetail ? conDetail : props, value);
                    }}
                >
                    <ButtonView size={'sm'} props="Send" />
                </div>
            </div>
        </div>
    );
};

export default CancelConfirm;
