import React, { Suspense, useContext, useEffect, useState } from 'react';
import './OrderDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../services/auth/context/AuthContext';
import LoadingComponent from '../../../component/common/LoadingComponent';
import ConFirmOrder from './confirmOrder/ConFirmOrder';
const InfoOrder = React.lazy(() => import('./inforOrder/InfoOrder'));
const OrderDetail = () => {
    const param = useParams();
    const { inforUser, token, confirmInfor, convertDate } = useContext(AuthContext);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        setFilter(inforUser.find((item) => item.id.toString() === param.id));
        setLoading(false);
        if (!token.token) {
            navigate('/');
        }
    }, [filter, param.id, inforUser, navigate, token.token]);
    const checkActive = (step) => {
        switch (filter?.status?.name) {
            case 'confirm':
                return step === 'confirm';

            case 'awaiting':
                return step === 'confirm' || step === 'awaiting';

            case 'shipping':
                return step === 'confirm' || step === 'awaiting' || step === 'shipping';
            case 'canceled':
                return step === 'confirm' || step === 'awaiting' || step === 'canceled';
            default:
                return true;
        }
    };

    if (!loading) {
        return (
            <div className="orderDetail_main">
                <div className="my__top">
                    <div className="my__top-title">
                        <p>My Account /</p> &nbsp;
                        <p style={{ fontWeight: 'bold' }}>Order Detail</p>
                    </div>
                </div>
                <div className="order__detail">
                    <div className="order__detail-top">
                        <div className="order__tab-icon">
                            <div className={'order__detail-icon ' + (checkActive('confirm') ? 'active-icon' : '')}>
                                <i className="fa-solid fa-box fa-2xl"></i>
                            </div>
                            <div className={'order__detail-hr ' + (checkActive('confirm') ? 'active-hr' : '')}></div>
                            {filter?.status.name === 'canceled' ? (
                                <>
                                    <div
                                        className={'order__detail-icon '}
                                        style={{ color: '#DB4444', borderColor: '#DB4444' }}
                                    >
                                        <i className="fa-solid fa-xmark fa-2xl"></i>
                                    </div>
                                    <div className={'order__detail-hr '}></div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className={
                                            'order__detail-icon ' + (checkActive('awaiting') ? 'active-icon' : '')
                                        }
                                    >
                                        <i className="fa-regular fa-credit-card fa-2xl"></i>
                                    </div>
                                    <div
                                        className={'order__detail-hr ' + (checkActive('awaiting') ? 'active-hr' : '')}
                                    ></div>
                                </>
                            )}

                            <div className={'order__detail-icon ' + (checkActive('shipping') ? 'active-icon' : '')}>
                                <i className="fa-solid fa-truck-fast fa-2xl"></i>
                            </div>
                            <div className={'order__detail-hr ' + (checkActive('shipping') ? 'active-hr' : '')}></div>
                            <div className={'order__detail-icon ' + (checkActive('receive') ? 'active-icon' : '')}>
                                <i className="fa-regular fa-handshake fa-2xl"></i>
                            </div>
                            <div className={'order__detail-hr ' + (checkActive('receive') ? 'active-hr' : '')}></div>
                            <div className={'order__detail-icon ' + checkActive('star')}>
                                <i className="fa-regular fa-star fa-2xl"></i>
                            </div>
                        </div>
                        {/* <div className="order__tab-title">
                            {filter &&
                                filter.status.message.map((item, key) => {
                                    return (
                                        <div className="order__detail-title" key={key}>
                                            <span>{item.title}</span>
                                            <p>{convertDate(item.date)}</p>
                                        </div>
                                    );
                                })}
                        </div> */}
                    </div>
                    <div className="order__detail-bottom">
                        {filter?.status?.name === 'confirm' && (
                            <Suspense fallback={<LoadingComponent loading={true} />}>
                                <ConFirmOrder confirmInfor={confirmInfor} props={filter} convertDate={convertDate} />
                                {/* <OdConfirm confirmInfor={confirmInfor} props={filter} convertDate={convertDate} /> */}
                            </Suspense>
                        )}
                        {filter?.status?.name !== 'confirm' && (
                            <Suspense fallback={<LoadingComponent loading={true} />}>
                                <InfoOrder props={filter} convertDate={convertDate} />
                            </Suspense>
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return '.../loading';
    }
};

export default OrderDetail;
