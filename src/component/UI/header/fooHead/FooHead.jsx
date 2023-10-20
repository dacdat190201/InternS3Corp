import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './FooHead.css';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
const FooHead = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = useMemo(() => {
        return ['Up to 10% off Voucher', 'Flash Sale 26/11', 'Happy Halloween'];
    }, []);
    const period = useMemo(() => {
        return 2000;
    }, []);
    const tick = useCallback(() => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta((prevDelta) => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex((prevIndex) => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex((prevIndex) => prevIndex + 1);
        }
    }, [isDeleting, loopNum, text.length, toRotate, period]);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);
        return () => {
            clearInterval(ticker);
        };
    }, [text, delta]);

    return (
        <div className="container_grid">
            <Sidebar />

            <div className="item-3 item">
                <div className="slideFood_main">
                    <div className="slide_content">
                        <div className="slide_content-logo">
                            <img src={require('../../../../assets/logo/logoIphone.png')} alt="logo_thumbnail" />
                            <p>Iphone 14 Series</p>
                        </div>
                        <div className="slide_content-discount">{text}</div>
                        <Link to={'/smartphones'} className="slide_content-buy">
                            Shop Now
                        </Link>
                    </div>
                    <div></div>
                    <div className="slide_bg">
                        <img
                            src={require('../../../../assets/slide/iphone.png')}
                            alt="thumbnail_iphonetop"
                            className="cover_object"
                        />
                    </div>
                </div>
                {/* <div className="fooHead_slide">
          <img src={image} alt="" />
        </div> */}
            </div>
        </div>
    );
};

export default FooHead;
