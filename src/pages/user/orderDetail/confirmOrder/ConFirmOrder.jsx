import React from 'react';
import CancelConfirm from '../../checkout/cancel/CancelConfirm';
import ItemOder from '../ItemOrder/ItemOder';
import ButtonView from '../../../../component/common/ButtonView';
import { Dialog, DialogContent } from '@mui/material';
const ConFirmOrder = ({ props, confirmInfor, convertDate }) => {
    const total = (payload) => {
        return payload.quantity * payload.item.price;
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <React.Fragment>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <CancelConfirm conDetail={props} />
                    </DialogContent>
                </Dialog>
            </React.Fragment>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '20px 0px',
                    height: '205px',
                    borderTop: '1px solid rgb(233, 233, 233)',
                    borderBottom: '3px dashed rgb(153, 153, 153)',
                    margin: '0px 0px 20px',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <h3 className="BreadName" style={{ marginBottom: 10 }}>
                        Address:
                    </h3>
                    <div className="inOrder__title">
                        <div className="inOrder__left">
                            <p style={{ fontSize: 16, color: 'black' }}>
                                {props?.item?.first_name} {props?.item?.company_name}
                            </p>
                            <p>{props?.item?.phone_number}</p>
                            <p>{props?.item?.address}</p>
                            <p>City: {props?.item?.town_city}</p>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div onClick={() => confirmInfor(props)}>
                        <ButtonView props="Confirm Order" size="sm" />
                    </div>

                    <ButtonView props="Contact the seller" size="sm-white" />
                    <div onClick={handleClickOpen}>
                        <ButtonView props=" Cancel Order" size="sm-white" />
                    </div>
                </div>
            </div>
            <div className="confirm__bottom-ListItem">
                <ItemOder props={props} convertDate={convertDate} total={total} />
            </div>
        </div>
    );
};

export default ConFirmOrder;
