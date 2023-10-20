import React, { useEffect, useState } from 'react';
import './Discount.css';
import json from '../../../datafake/chudeData.json';
import { Link } from 'react-router-dom';
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
            <hr></hr>
            <div className="product__container">
                <div className="product__title">
                    <Link to={`/products`} style={{ textDecoration: 'none', color: 'black' }}>
                        Home
                    </Link>
                    <p>/ Discounts</p>
                </div>
            </div>
            <div className="discount__container">
                {data &&
                    data.map((item, key) => {
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

export default ListDiscount;
