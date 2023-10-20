import React, { useEffect, useState } from 'react';
import './Discount.css';
import json from '../../../datafake/chudeData.json';
import { ToastContainer, toast } from 'react-toastify';
import '../../../pages/product/listProduct/ProductMain/ProductMain.css';
import { Link } from 'react-router-dom';
const Discount = () => {
    const [data, setData] = useState();
    //const [bttnText, setBttnText] = useState("COPY CODE");
    const bttnText = 'COPY CODE';
    const copyCode = (item) => {
        navigator.clipboard
            .writeText(item)
            .then(() => {
                // alert("COPIED  " + item);
                // console.log(item);
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
        <div className="discount__homepage">
            <div className="sale__midle">
                <div className="sale__midle-left">
                    <div className="sale__midle-title">
                        <h1>Discount Month</h1>
                    </div>
                </div>
                <div className="sale__midle-right">
                    <Link to="/discounts" style={{ textDecoration: 'none', color: 'black' }}>
                        {' '}
                        <div className="thismonth__top-btn">
                            <h3>View All</h3>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="discount__container">
                <ToastContainer />
                {data &&
                    data.slice(0, 3).map((item, key) => {
                        return (
                            <div className="contai" key={key}>
                                <div className="coupon-card">
                                    <h3>{item.name}</h3>
                                    <h5>Describe: {item.describe}.</h5>
                                    <div className="coupon-row">
                                        <span id="cpnCode">{item.id}</span>
                                        <span id="cpnBtn" onClick={() => copyCode(item.id)}>
                                            {bttnText}
                                        </span>
                                    </div>
                                    <p>Date: {item.date}</p>

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

export default Discount;
