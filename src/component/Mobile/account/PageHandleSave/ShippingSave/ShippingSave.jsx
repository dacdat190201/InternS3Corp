import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../../services/auth/context/AuthContext';
import BarBack from '../../../../common/BarBack';
import AddIcon from '@mui/icons-material/Add';
import './ShippingSave.css';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
const ShippingSave = () => {
    const { token, history, changeHistory } = useContext(AuthContext);
    const index = history.find((item) => item.primary === true);
    const navigate = useNavigate();
    const [item, setItem] = useState('');

    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
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
        <div className="checkoutMobile">
            <div>
                <BarBack title="Shipping Addresses" link={'viewcart/checkout'} />
            </div>
            {index ? (
                <div
                    className="shippingSave__List"
                    style={{
                        boxShadow: ' grey 0px 1px 2px 0px, grey 0px 1px 8px 0px',
                    }}
                >
                    <div className="shippingSave__Items">
                        <div className="shippingSave-Ileft">
                            <div className="titleItem500">
                                {index?.first_name}&nbsp;
                                {index?.company_name}
                            </div>
                            <div className="titleSubItem600">{index?.address}</div>

                            <div className="titleSubItem600">{index?.town_city}</div>

                            <div className="titleSubItem600">{index?.my_email}</div>
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
                            boxShadow: ' grey 0px 1px 2px 0px, grey 0px 1px 8px 0px',
                        }}
                    >
                        <div className="titleItem500 shippingSave__Items">Nothing exists</div>
                    </div>
                </>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="NamePanel">List Address</div>
                <div className="ShippingSave__Icon">
                    <Link to={'/address'} className="ShippingSave__IconButton">
                        <AddIcon />
                    </Link>
                </div>
            </div>
            {history.map((item, key) => {
                return (
                    <div className="shippingSave__List" key={key}>
                        <div className="shippingSave__Items">
                            <div className="shippingSave-Ileft">
                                <div className="titleItem500">
                                    {item?.first_name}&nbsp;
                                    {item?.company_name}
                                </div>
                                <div className="titleSubItem600">{item?.address}</div>

                                <div className="titleSubItem600">{item?.town_city}</div>
                            </div>
                            <div
                                to={'/myaccount/ShippingSave'}
                                style={{ color: '#DB4444', fontSize: 14, fontWeight: 500 }}
                            >
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
                            checked={item?.primary}
                        />

                        <span>Use as the shipping address</span>
                    </div>
                );
            })}

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
