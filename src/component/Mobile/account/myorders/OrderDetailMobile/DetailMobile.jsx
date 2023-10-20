import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AuthContext from '../../../../../services/auth/context/AuthContext';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import './DetailMobile.css';
import { Dialog } from '@mui/material';
import CanceledMobile from '../../canceled/CanceledMobile';
import '../../viewcart/ViewCartMobile.css';
const DetailMobile = () => {
    const { token, inforUser, confirmMobile, convertDate } = useContext(AuthContext);
    const [filter, setFilter] = useState('');
    const [open, setOpen] = React.useState(false);
    const ref = useRef();
    const navigate = useNavigate();
    const param = useParams();
    useEffect(() => {
        setFilter(inforUser.find((item) => item.id.toString() === param.id));

        if (!token.token) {
            navigate('/');
        }
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [token.token, navigate, inforUser, param.id]);
    const total = (item) => {
        return item.quantity * item.item.price;
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="ProfileM__container" ref={ref}>
            <div className="ViewCart__Top">
                <Link style={{ color: 'black' }} to={'/myorder'}>
                    <ArrowBackIosIcon />
                </Link>
                <h4> Order detail</h4>
                <SearchIcon />
            </div>
            <div className="orDetail__title">
                <h4>Order: {param.id}</h4>
                <p> {convertDate(filter?.status?.message[0]?.date)}</p>
            </div>
            <div className="orDetail__title">
                <span style={{ color: 'grey' }}>
                    Tracking Number: <span style={{ color: 'black', fontWeight: 500 }}>IW1305203651</span>
                </span>
                <p style={{ color: '#2AA952', fontWeight: 500 }}>{filter?.status?.name}</p>
            </div>
            <div className="orDetail__title">
                <span style={{ fontWeight: 500 }}>{filter?.item?.cart.length} item</span>
            </div>
            <div className="orDetail__List">
                {filter?.item?.cart.map((prop, key) => {
                    return (
                        <div className="orDetail__Items" key={key}>
                            <div className="orDetail__Img">
                                <img src={prop?.item?.thumbnail} alt={prop?.item?.title} />
                            </div>
                            <div className="orDetail__content">
                                <h4>{prop?.item?.title}</h4>
                                <p>{prop?.item?.description}</p>
                                <p>Cate: {prop?.item?.category}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p>quantity: {prop?.quantity}</p>
                                    <h4>{total(prop)}$</h4>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="orDetail__title">
                <span style={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                    <LocalShippingOutlinedIcon />
                    Shipping information
                </span>
                <Link
                    to={`/myorder/detail/${param.id}/shipping`}
                    style={{
                        color: '#2AA952',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                    }}
                >
                    Detail
                </Link>
            </div>
            <div style={{ borderLeft: '1px solid grey', padding: 8, marginBottom: 24 }}>
                <div style={{ color: 'rgb(42, 169, 82)', marginBottom: 12 }}>{filter?.status?.message[0]?.title}</div>
                <div style={{ fontSize: 12 }}>{convertDate(filter?.status?.message[0]?.date)}</div>
            </div>
            <div className="orDetail__title">
                <span style={{ fontWeight: 500 }}>Order information</span>
            </div>
            <div className="orDetail__information">
                <div className="orDetail__info-left">Name</div>
                <div className="orDetail__info-right">
                    {filter?.item?.first_name} &nbsp;{filter?.item?.from_name}
                </div>
            </div>
            <div className="orDetail__information">
                <div className="orDetail__info-left">Shipping Address</div>
                <div className="orDetail__info-right">{filter?.item?.address}</div>
            </div>
            <div className="orDetail__information">
                <div className="orDetail__info-left">Payment Method</div>
                <div className="orDetail__info-right">{filter?.item?.payment}</div>
            </div>
            <div className="orDetail__information">
                <div className="orDetail__info-left">Delivery Method</div>
                <div className="orDetail__info-right">Free</div>
            </div>
            <div className="orDetail__information">
                <div className="orDetail__info-left">Discount</div>
                <div className="orDetail__info-right">{filter?.item?.my_discount}</div>
            </div>
            <div className="orDetail__information">
                <div className="orDetail__info-left">Total Amount</div>
                <div className="orDetail__info-right">{filter?.item?.total}$</div>
            </div>
            {filter?.status?.name === 'confirm' ? (
                <div className="orDetail__infor-btn">
                    <div className="orDetail__btn-left" onClick={() => confirmMobile(filter)}>
                        Confirm
                    </div>
                    <div className="orDetail__btn-right" onClick={handleClickOpen}>
                        Cancel
                    </div>
                </div>
            ) : (
                <div className="orDetail__infor-btn">
                    <Link to={'/products'} className="orDetail__btn-left">
                        Reorder
                    </Link>
                    {filter?.status?.name === 'canceled' ? null : (
                        <div className="orDetail__btn-right">Leave feedback</div>
                    )}
                </div>
            )}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <CanceledMobile props={filter} close={handleClose} />
            </Dialog>
        </div>
    );
};

export default DetailMobile;
