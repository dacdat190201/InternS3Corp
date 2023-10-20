import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import json from '../../../datafake/productData.json';
import './Test.css';

const Test = () => {
    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <React.Fragment>
                <button onClick={onClick} className="slickRight">
                    Next
                </button>
            </React.Fragment>
        );
    }
    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <React.Fragment>
                <button onClick={onClick} className="slickLeft">
                    Prev
                </button>
            </React.Fragment>
        );
    }
    const [data, setData] = useState('');
    useEffect(() => {
        setData(json.data);
    }, [data]);

    const ArrowLeft = (props) => (
        <svg
            {...props}
            className="sale_midle-icon"
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="23" cy="23" r="23" fill="#F5F5F5" />
            <path
                d="M22 16L15 23L22 30M15 23H31"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
    const ArrowLeft1 = (props) => (
        <svg
            {...props}
            className="sale_midle-icon2"
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="23" cy="23" r="23" fill="#F5F5F5" />
            <path
                d="M22 16L15 23L22 30M15 23H31"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
    console.log(data);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 1500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div>
            <h2> Single Item</h2>
            <button>Prev</button>
            <button>Next</button>

            <div className="sale__midle-right">
                <svg
                    className="sale_midle-icon"
                    width="46"
                    height="46"
                    viewBox="0 0 46 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => ArrowLeft(e)}
                >
                    <circle cx="23" cy="23" r="23" fill="#F5F5F5" />
                    <path
                        d="M22 16L15 23L22 30M15 23H31"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <Slider {...settings}>
                {data &&
                    data.map((item, key) => {
                        return (
                            <div key={key} className="Test__main">
                                <div>
                                    <p>-{item.discount}%</p>
                                    <svg
                                        width="34"
                                        height="34"
                                        viewBox="0 0 34 34"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle cx="17" cy="17" r="17" fill="white" />
                                        <path
                                            d="M13 10C10.7912 10 9 11.7396 9 13.8859C9 15.6185 9.7 19.7305 16.5904 23.8873C16.7138 23.961 16.8555 24 17 24C17.1445 24 17.2862 23.961 17.4096 23.8873C24.3 19.7305 25 15.6185 25 13.8859C25 11.7396 23.2088 10 21 10C18.7912 10 17 12.3551 17 12.3551C17 12.3551 15.2088 10 13 10Z"
                                            stroke="black"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <img
                                        src={require(`../../../assets/images/product/${item.image}`)}
                                        width={190}
                                        height={180}
                                        alt="product1"
                                    />
                                </div>
                                <button>
                                    <h4>Add To Cart</h4>{' '}
                                </button>
                                <div>
                                    <h4>{item.name}</h4>
                                    <span>$</span>
                                    <p>*******(88)</p>
                                </div>
                            </div>
                        );
                    })}
            </Slider>
        </div>
    );
};

export default Test;
