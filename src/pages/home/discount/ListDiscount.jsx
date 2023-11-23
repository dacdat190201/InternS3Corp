import React, { useEffect, useState } from 'react';
import './Discount.css';
import json from '../../../datafake/chudeData.json';
import { Link } from 'react-router-dom';
import BreadcurmbNavigation from '../../../component/common/BreadcurmbNavigation';
import { ToastContainer, toast } from 'react-toastify';
const ListDiscount = () => {
    const [data, setData] = useState();
    //const [bttnText, setBttnText] = useState("COPY CODE");
    const bttnText = 'COPY CODE';
    const copyCode = (item) => {
        navigator.clipboard
            .writeText(item)
            .then(() => {
                // toast("COPIED " + item);
                // alert("COPIED " + item);
                // setBttnText("COPIED");
                // setTimeout(function () {
                //   setBttnText("COPY CODE");
                // }, 3000);
                toast.success('COPIED ' + item, {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    useEffect(() => {
        setData(json.data);
    }, []);

    return (
        <div className="discount__all">
            <ToastContainer />
            <BreadcurmbNavigation props="Discount" />

            <div className="discount__container">
                {data &&
                    data.map((item, key) => {
                        return (
                            <div className="contai" key={key}>
                                <div className="coupon-card">
                                    <h3>{item.name}</h3>
                                    <div className="titleDescrip">Describe: {item.describe}.</div>
                                    <div className="coupon-row">
                                        <div style={{ width: '70%' }} className="titleDescrip" id="cpnCode">
                                            {item.id}
                                        </div>
                                        <div className="titleDescrip" id="cpnBtn" onClick={() => copyCode(item.id)}>
                                            {bttnText}
                                        </div>
                                    </div>
                                    <div className="titleDescrip">Date: {item.date}</div>

                                    <div className="circle1"></div>
                                    <div className="circle2"></div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ListDiscount;
