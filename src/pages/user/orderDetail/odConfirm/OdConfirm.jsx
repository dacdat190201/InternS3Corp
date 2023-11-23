// import React, { useState } from 'react';
// import CancelConfirm from '../../checkout/cancel/CancelConfirm';
// import './OdConfirm.css';
// import ItemOder from '../ItemOrder/ItemOder';
// import ButtonView from '../../../../component/common/ButtonView';
// import { ToastContainer } from 'react-toastify';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import { Button } from 'bootstrap';

// const OdConfirm = ({ props, confirmInfor, convertDate }) => {
//     const [click, setClick] = useState();
//     const total = (payload) => {
//         return payload.quantity * payload.item.price;
//     };
//     const [open, setOpen] = useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div>
//             {/* <div className="confirm__bottom">
//                 {!click ? (
//                     <>
//                         <div className="confirm__bottom-left">
//                             <div className="BreadName" style={{ marginBottom: 40 }}>
//                                 Delivery address
//                             </div>
//                             <div className="checkout-form">
//                                 <div className="form-floating shadow-none ">
//                                     <input
//                                         type="text"
//                                         defaultValue={props?.item?.first_name}
//                                         name="first_name"
//                                         autoComplete="given-name"
//                                         className="form-control shadow-none"
//                                     />
//                                     <label className="text-secondary" htmlFor="Name">
//                                         First Name <span className="text-danger">*</span>
//                                     </label>
//                                 </div>
//                                 <div className="form-floating shadow-none ">
//                                     <input
//                                         type="text"
//                                         defaultValue={props?.item?.company_name}
//                                         name="company_name"
//                                         className="form-control shadow-none"
//                                     />
//                                     <label className="text-secondary" htmlFor="Name">
//                                         Last Name <span className="text-danger">*</span>
//                                     </label>
//                                 </div>
//                                 <div className="form-floating shadow-none ">
//                                     <input
//                                         type="text"
//                                         defaultValue={props?.item?.address}
//                                         name="address"
//                                         autoComplete="address"
//                                         className="form-control shadow-none"
//                                     />
//                                     <label className="text-secondary" htmlFor="Name">
//                                         Address <span className="text-danger">*</span>
//                                     </label>
//                                 </div>
//                                 <div className="form-floating shadow-none ">
//                                     <input
//                                         type="text"
//                                         defaultValue={props?.item?.address}
//                                         name="town_city"
//                                         className="form-control shadow-none"
//                                     />
//                                     <label className="text-secondary" htmlFor="Name">
//                                         Town City <span className="text-danger">*</span>
//                                     </label>
//                                 </div>

//                                 <div className="form-floating shadow-none ">
//                                     <input
//                                         type="text"
//                                         defaultValue={props?.item?.town_city}
//                                         name="etx-input"
//                                         className="form-control shadow-none"
//                                     />
//                                     <label className="text-secondary" htmlFor="Name">
//                                         Apartment floor, etc <span className="text-danger">*</span>
//                                     </label>
//                                 </div>
//                                 <div className="form-floating shadow-none ">
//                                     <input
//                                         type="text"
//                                         defaultValue={props?.item?.phone_number}
//                                         name="phone_number"
//                                         className="form-control shadow-none"
//                                     />
//                                     <label className="text-secondary" htmlFor="Name">
//                                         Phone Number <span className="text-danger">*</span>
//                                     </label>
//                                 </div>
//                                 <div className="form-floating shadow-none ">
//                                     <input
//                                         type="text"
//                                         defaultValue={props?.item?.my_email}
//                                         name="my_email"
//                                         className="form-control shadow-none"
//                                     />
//                                     <label className="text-secondary" htmlFor="Name">
//                                         Email Address <span className="text-danger">*</span>
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <CancelConfirm conDetail={props} setClick={setClick} />
//                 )}
//                 <div className="confirm__bottom-right">
//                     <div onClick={() => confirmInfor(props)}>
//                         <ButtonView props="Confirm Order" size="sm" />
//                     </div>

//                     <ButtonView props="Contact the seller" size="sm-white" />
//                     <div onClick={() => setClick(!click)}>
//                         <ButtonView props=" Cancel Order" size="sm-white" />
//                     </div>
//                 </div>
//             </div> */}
//             <div className="confirm__bottom">
//                 {!click ? (
//                     <>
//                         <div>
//                             <h3>Address:</h3>
//                             <div className="inOrder__title">
//                                 <div className="inOrder__left">
//                                     <p style={{ fontSize: 16, color: 'black', marginBottom: 10 }}>
//                                         {props?.item?.first_name} {props?.item?.company_name}
//                                     </p>
//                                     <p>{props?.item?.phone_number}</p>
//                                     <p>{props?.item?.address}</p>
//                                     <p>City: {props?.item?.town_city}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <CancelConfirm conDetail={props} setClick={setClick} />
//                 )}
//                 <div className="confirm__bottom-right">
//                     <div onClick={() => confirmInfor(props)}>
//                         <ButtonView props="Confirm Order" size="sm" />
//                     </div>

//                     <ButtonView props="Contact the seller" size="sm-white" />
//                     <div onClick={() => setClick(!click)}>
//                         <ButtonView props=" Cancel Order" size="sm-white" />
//                     </div>
//                 </div>
//             </div>
//             <div className="confirm__bottom-ListItem">
//                 <ItemOder props={props} convertDate={convertDate} total={total} />
//             </div>
//         </div>
//     );
// };

// export default OdConfirm;
