import React, { useContext, useEffect, useState } from 'react';
import './Confirm.css';
import Navbar from '../../../../component/UI/myaccount/nav/Navbar';
import AuthContext from '../../../../services/auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CancelConfirm from '../cancel/CancelConfirm';
const Confirm = () => {
    const { inforUser, confirmInfor, convertDate } = useContext(AuthContext);
    const [click, setClick] = useState(false);
    const navigate = useNavigate();
    const subtotal = (item) => {
        return item.quantity * item.item.price;
    };

    useEffect(() => {
        if (Object.keys(inforUser).length === 0) {
            alert('404');
            navigate('/');
        }
    }, [inforUser, navigate]);

    return (
        <>
            <div className="my__top">
                <div className="my__top-title">
                    <p>My Account</p>&nbsp;/ &nbsp;
                    <p>View Cart /&nbsp;Checkout /&nbsp;</p>
                    <p style={{ fontWeight: 'bold' }}>Confirm</p>
                </div>
            </div>
            <div className="checkout__ship" style={{ marginTop: '40px' }}>
                <div className="checkout__ship-item">
                    <i className="fa-regular fa-clipboard"></i>
                </div>
                <div className="checkout__ship-hr" style={{ backgroundColor: '#DB4444' }}></div>
                <div className="checkout__ship-item">
                    <i className="fa-solid fa-check"></i>
                </div>
                <div className="checkout__ship-hr"></div>
                <div className="checkout__ship-item">3</div>
            </div>
            <div className="confirm__container">
                <div className="confirm-listItems">
                    {inforUser[0]?.item?.cart.map((item, key) => {
                        return (
                            <div className="confirm-Items" key={key}>
                                <div className="confirm__Right">
                                    <div className="confirm__Right-img">
                                        <img src={item?.item?.thumbnail} alt={item?.name} />
                                    </div>

                                    <div>
                                        {item?.item?.title}
                                        <br></br>x{item?.quantity}
                                    </div>
                                </div>
                                <div style={{ color: 'red' }}>${subtotal(item)}</div>
                            </div>
                        );
                    })}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            color: 'red',
                            fontWeight: 'bold',
                        }}
                    >
                        Total: {inforUser[0].item.total}
                    </div>
                </div>
            </div>

            <h2>Buyer Infor</h2>

            <div className="confirm__bottom">
                {!click ? (
                    <>
                        <div className="confirm__bottom-left">
                            <h3>Delivery address</h3>
                            <div className="confirm__left-inputContai">
                                <div className="left_inputcontai-input">
                                    <label>First Name</label>
                                    <input type="text" defaultValue={inforUser[0]?.item?.first_name} />
                                </div>
                                <div className="left_inputcontai-input">
                                    <label>Last Name</label>
                                    <input type="text" defaultValue={inforUser[0]?.item?.company_name} />
                                </div>
                            </div>
                            <div className="confirm__left-inputContai">
                                <div className="left_inputcontai-input">
                                    <label>Email</label>
                                    <input type="text" defaultValue={inforUser[0]?.item?.my_email} />
                                </div>
                                <div className="left_inputcontai-input">
                                    <label>Phone Number</label>
                                    <input type="text" defaultValue={inforUser[0]?.item?.phone_number} />
                                </div>
                            </div>
                            <div className="confirm__left-input">
                                <label>Address</label>
                                <input type="text" defaultValue={inforUser[0]?.item?.address} />
                            </div>
                            <div className="confirm__left-input">
                                <label>Order Date</label>
                                <input type="text" defaultValue={convertDate(inforUser[0]?.item?.date)} />
                            </div>
                        </div>
                    </>
                ) : (
                    <CancelConfirm props={inforUser[0]} setClick={setClick} />
                )}
                <div className="confirm__bottom-right">
                    <button className="c__b__r-bt0" onClick={() => confirmInfor(inforUser[0])}>
                        Confirm order
                    </button>
                    <div>
                        <button className="c__b__r-bt2">Contact the seller</button>
                        <button className="c__b__r-bt1" onClick={() => setClick(!click)}>
                            Cancel Order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Confirm;
