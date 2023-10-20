import React from 'react';
import './VideoProduct.css';
const VideoProduct = () => {
    return (
        <div className="videoDiv">
            <video src={require('../../../../assets/video/introIphone15.mp4')} autoPlay loop muted></video>
        </div>
    );
};

export default VideoProduct;
