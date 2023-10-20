import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../services/auth/context/AuthContext';
import Navbar from '../../../../component/UI/myaccount/nav/Navbar';

const Processing = () => {
    const { inforUser, confirmInfor } = useContext(AuthContext);
    const navigate = useNavigate();
    const subtotal = (item) => {
        return item.quantity * item.price;
    };
    // useEffect(() => {
    //   if (inforUser.message !== "confirm") {
    //     navigate("/");
    //   }
    // }, [inforUser.message, navigate]);
    return (
        <>
            <div className="my__top">
                <div className="my__top-title">
                    <p>My Account</p>&nbsp;/ &nbsp;
                    <p>View Cart /&nbsp;Checkout /&nbsp;</p>
                    <p style={{ fontWeight: 'bold' }}>Confirm</p>
                </div>
                <Navbar />
            </div>
            {/* <div className="checkout__ship" style={{ marginTop: "40px" }}>
      <div className="checkout__ship-item">1</div>
      <div
        className="checkout__ship-hr"
        style={{ backgroundColor: "#DB4444" }}
      ></div>
      <div className="checkout__ship-item">2</div>
      <div className="checkout__ship-hr"></div>
      <div className="checkout__ship-item">3</div>
    </div> */}
            <div className="confirm__container">
                <div className="confirm-listItems">
                    {inforUser.item.cart.map((item, key) => {
                        return (
                            <div className="confirm-Items" key={key}>
                                <div className="confirm__Right">
                                    <img src={item.image} alt={item.name} />
                                    <div>
                                        {item.name}
                                        <br></br>x{item.quantity}
                                    </div>
                                </div>
                                <div style={{ color: 'red' }}>${subtotal(item)}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <h2>Buyer Infor</h2>

            <div className="confirm__bottom">
                <div className="confirm__bottom-left">
                    <h3>Delivery address</h3>
                    <div className="confirm__left-inputContai">
                        <div className="left_inputcontai-input">
                            <label>First Name</label>
                            <input type="text" value={inforUser.item.first_name} />
                        </div>
                        <div className="left_inputcontai-input">
                            <label>Last Name</label>
                            <input type="text" value={inforUser.item.company_name} />
                        </div>
                    </div>
                    <div className="confirm__left-inputContai">
                        <div className="left_inputcontai-input">
                            <label>Email</label>
                            <input type="text" value={inforUser.item.my_email} />
                        </div>
                        <div className="left_inputcontai-input">
                            <label>Phone Number</label>
                            <input type="text" value={inforUser.item.phone_number} />
                        </div>
                    </div>
                    <div className="confirm__left-input">
                        <label>Address</label>
                        <input type="text" value={inforUser.item.address} />
                    </div>
                    <div className="confirm__left-input">
                        <label>Order Date</label>
                        <input type="text" value={inforUser.item.date} />
                    </div>
                </div>
                <div className="confirm__bottom-right">
                    <button className="c__b__r-bt0" onClick={() => confirmInfor()}>
                        Confirm order
                    </button>
                    <div>
                        <button className="c__b__r-bt2">Contact the seller</button>
                        <button className="c__b__r-bt1">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Processing;
