import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../../../services/auth/context/AuthContext';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import './DetailMobile.css';
import { Dialog } from '@mui/material';
import CanceledMobile from '../../canceled/CanceledMobile';
import '../../viewcart/ViewCartMobile.css';
import BarBack from '../../../../common/BarBack';
const DetailMobile = () => {
    const { token, inforUser, confirmMobile, convertDate } = useContext(AuthContext);
    const [filter, setFilter] = useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const param = useParams();
    useEffect(() => {
        setFilter(inforUser.find((item) => item.id.toString() === param.id));

        if (!token.token) {
            navigate('/');
        }
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
        <div className="ProfileM__container">
            <BarBack title=" Order detail" link="myorder" />

            <div className="BreadName orDetail__title">
                <div>Order: {param.id}</div>
                <div> {convertDate(filter?.status?.message[0]?.date)}</div>
            </div>
            <div className="orDetail__title">
                <div className="titleDescrip">
                    Tracking Number: <span style={{ color: 'black', fontWeight: 500 }}>IW1305203651</span>
                </div>
                <div className="titleItem500" style={{ color: '#2AA952' }}>
                    {filter?.status?.name.charAt(0).toUpperCase() + filter?.status?.name.slice(1)}
                </div>
            </div>
            <div className="titleItem500 orDetail__title">
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
                                <div className="titleItem500 titlenameCheckM">{prop?.item?.title}</div>
                                {/* <div className="titleDescrip" style={{ WebkitLineClamp: 1 }}>
                                    {prop?.item?.description}
                                </div> */}
                                <div className="titleDescrip">Cate: {prop?.item?.category}</div>
                                <p>quantity: {prop?.quantity}</p>
                                <div className="PriceName" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {total(prop)}$
                                </div>
                                {/* <div
                                    className="titleDescrip"
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                    <p>quantity: {prop?.quantity}</p>
                                    <div className="PriceName">{total(prop)}$</div>
                                </div> */}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className=" orDetail__title">
                <span className="BreadName" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <LocalShippingOutlinedIcon />
                    Shipping information
                </span>
                <Link
                    className="BreadName"
                    to={`/myorder/detail/${param.id}/shipping`}
                    style={{
                        color: '#2AA952',

                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                    }}
                >
                    Detail
                </Link>
            </div>
            <div style={{ borderLeft: '1px solid grey', padding: 8, marginBottom: 15 }}>
                <div className="titleItem500" style={{ color: 'rgb(42, 169, 82)', marginBottom: 12 }}>
                    {filter?.status?.message[0]?.title}
                </div>
                <div className="titleItem500" style={{ fontSize: 12 }}>
                    {convertDate(filter?.status?.message[0]?.date)}
                </div>
            </div>

            <div className="BreadName orDetail__title">
                <span style={{ fontWeight: 500 }}>Order information</span>
            </div>
            <div className="orDetail__information">
                <div className="titleItem500 orDetail__info-left">Name</div>
                <div style={{ textAlign: 'end' }} className="titleItem500 orDetail__info-right">
                    {filter?.item?.first_name} &nbsp;{filter?.item?.from_name}
                </div>
            </div>
            <hr></hr>
            <div className="orDetail__information">
                <div className="titleItem500 orDetail__info-left">Shipping Address</div>
                <div style={{ textAlign: 'end' }} className="titleItem500 orDetail__info-right">
                    {filter?.item?.address}
                </div>
            </div>
            <hr></hr>
            <div className="titleItem500 orDetail__information">
                <div className="orDetail__info-left">Payment Method</div>
                <div style={{ textAlign: 'end' }} className="orDetail__info-right">
                    {filter?.item?.payment}
                </div>
            </div>
            <hr></hr>
            <div className="titleItem500 orDetail__information">
                <div className="orDetail__info-left">Delivery Method</div>
                <div style={{ textAlign: 'end' }} className="orDetail__info-right">
                    Free
                </div>
            </div>
            <hr></hr>
            <div className="titleItem500 orDetail__information">
                <div className="orDetail__info-left">Discount</div>
                <div style={{ textAlign: 'end' }} className="orDetail__info-right">
                    {filter?.item?.my_discount}
                </div>
            </div>
            <hr></hr>
            <div className="titleItem500 orDetail__information">
                <div className="orDetail__info-left">Total Amount</div>
                <div style={{ textAlign: 'end' }} className=" PriceTotal orDetail__info-right">
                    {filter?.item?.total}$
                </div>
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
