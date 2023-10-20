import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../../services/auth/context/AuthContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import './ShippingSave.css';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
const ShippingSave = () => {
    const { token, history, changeHistory } = useContext(AuthContext);
    const index = history.find((item) => item.primary === true);
    const ref = useRef();
    const navigate = useNavigate();
    const [item, setItem] = useState('');

    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [token.token, navigate]);
    const [open, setOpen] = useState(false);
    const handleConfirm = () => {
        changeHistory(item);
    };
    function handleChange(e) {
        let isChecked = e.target.checked;
        if (isChecked === true) {
            setOpen(true);
        }
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="checkoutMobile" ref={ref}>
            <div className="ViewCart__Top">
                <Link style={{ color: 'black' }} to={'/viewcart'}>
                    <ArrowBackIosIcon />
                </Link>
                <h4>Shipping Address</h4>
                <div></div>
            </div>
            {index ? (
                <div
                    className="shippingSave__List"
                    style={{
                        boxShadow: ' #DB3022 0px 1px 2px 0px, #DB3022 0px 1px 8px 0px',
                    }}
                >
                    <div className="shippingSave__Items">
                        <div className="shippingSave-Ileft">
                            <p>
                                {index?.first_name}&nbsp;
                                {index?.company_name}
                            </p>
                            <span>{index?.address}</span>
                            <br></br>
                            <span>{index?.town_city}</span>
                            <br></br>
                            <span>{index?.my_email}</span>
                        </div>
                        <div to={'/myaccount/ShippingSave'} className="shippingSave-Iright">
                            <p>
                                <GppGoodOutlinedIcon />
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="shippingSave__List"
                        style={{
                            boxShadow: ' #DB3022 0px 1px 2px 0px, #DB3022 0px 1px 8px 0px',
                        }}
                    >
                        <div className="shippingSave__Items">Nothing exists</div>
                    </div>
                </>
            )}

            <div style={{ fontSize: 13, marginTop: 10 }}>List Address</div>
            {history.map((item, key) => {
                return (
                    <div className="shippingSave__List" key={key}>
                        <div className="shippingSave__Items">
                            <div className="shippingSave-Ileft">
                                <p>
                                    {item?.first_name}&nbsp;
                                    {item?.company_name}
                                </p>
                                <span>{item?.address}</span>
                                <br></br>
                                <span>HCM</span>
                            </div>
                            <div to={'/myaccount/ShippingSave'} className="shippingSave-Iright">
                                <p>Edit</p>
                            </div>
                        </div>
                        <input
                            type="radio"
                            name="topping"
                            onChange={(e) => {
                                setItem(item);
                                handleChange(e);
                            }}
                        />
                        <span>Use as the shipping address</span>
                    </div>
                );
            })}
            <div className="ShippingSave__Icon">
                <Link to={'/address'} className="ShippingSave__IconButton">
                    <AddIcon />
                </Link>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to change the address?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            handleConfirm();
                        }}
                        autoFocus
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ShippingSave;
