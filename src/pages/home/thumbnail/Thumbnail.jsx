import React from 'react';
import './Thumbnail.css';
import VideoProduct from '../../../component/Mobile/video/videoProduct/VideoProduct';
const Thumbnail = () => {
    return (
        <div className="thumbnail__container">
            <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:800:150/q:80/plain/https://dashboard.cellphones.com.vn/storage/banner-special-mobile-b2s-new.png"
                alt="thumnail"
            />
            <VideoProduct />
            <div className="thumbnail__listItem">
                <div className="thumbnail__listItem-Item">
                    <img
                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/ideapad%20gaming.jpg"
                        alt="iphone151"
                    />
                </div>
                <div className="thumbnail__listItem-Item">
                    <img
                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:80/plain/https://dashboard.cellphones.com.vn/storage/vpbnak-bank-iphone5-sli.png"
                        alt="iphone152"
                    />
                </div>
                <div className="thumbnail__listItem-Item">
                    <img
                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:80/plain/https://dashboard.cellphones.com.vn/storage/hsbcbank-iphone5-sli.png"
                        alt="iphone153"
                    />
                </div>
                <div className="thumbnail__listItem-Item">
                    <img
                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:80/plain/https://dashboard.cellphones.com.vn/storage/vibiphone5-sli.png"
                        alt="iphone154"
                    />
                </div>
            </div>
        </div>
    );
};

export default Thumbnail;
