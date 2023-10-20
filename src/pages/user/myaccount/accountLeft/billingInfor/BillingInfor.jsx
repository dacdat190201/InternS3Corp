import React from 'react';
import './BillingInfor.css';
const BillingInfor = ({ props }) => {
    return (
        <div className="billingInfor__container">
            <div className="mProfile__card">
                <div className="mProfile__top-part">
                    <div className="mProfile__chip-image">
                        <img src="https://i.imgur.com/PEKNCj9.png" alt="card__chip" />
                    </div>
                </div>
                <div className="mProfile__card-details">
                    <div className="mProfile__card-number">
                        <span>{props.bank.cardNumber}</span>
                    </div>
                    <div className="mProfile__date">
                        <span>{props.bank.cardExpire}</span>
                    </div>
                    <div className="mProfile__date">
                        <h3>{props.bank.currency}</h3>
                    </div>
                </div>
                <div className="mProfile__picture">
                    <img src="https://imgur.com/KpIC2Cs.png" alt="card__picture" />
                </div>
            </div>
            <div className="billing__taxDetails">
                <h2>Tax Details</h2>
                <div className="tax__top">
                    <div className="tax__top-input">
                        <label htmlFor="card_number">Card Number</label>
                        <input id="card_number" type="number" placeholder={props.bank.cardNumber} />
                    </div>
                    <div className="tax__top-input">
                        <label htmlFor="cartExpire">Card Expire</label>
                        <input type="text" id="cartExpire" placeholder={props.bank.cardExpire} />
                    </div>
                </div>
                <div className="tax__center-input">
                    <label htmlFor="Currency">Currency</label>
                    <input type="text" id="Currency" placeholder={props.bank.currency} />
                </div>
                <div className="tax__center-input">
                    <label htmlFor="numberIban">Iban</label>
                    <input type="number" id="numberIban" placeholder={props.bank.iban} />
                </div>
                <div className="userInfor__bottom">
                    <button className="userInfor__button-update">Update Info</button>
                </div>
            </div>
        </div>
    );
};

export default BillingInfor;
