import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import TitleCata from '../../../component/common/TitleCata';
import BannerTitle from '../../../component/common/BannerTitle';
import '../FlashSale/Sale.css';
import './OurProduct.css';
import AuthContext from '../../../services/auth/context/AuthContext';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import ButtonView from '../../../component/common/ButtonView';
import { Rating } from '@mui/material';
const OurProduct = () => {
    const slider = useRef();
    const next = useCallback(() => {
        slider.current.slickNext();
    }, []);
    const previous = useCallback(() => {
        slider.current.slickPrev();
    }, []);
    const [data, setData] = useState('');
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await instance.get('/products?limit=30&skip=60');
                setData(res.data);
            } catch (error) {}
        };
        fetch();
    }, []);
    const { addToCart, addFavorite } = useContext(AuthContext);
    const handleAddToCart = useCallback(
        (item) => {
            addToCart({
                item,
                quantity: 1,
            });
        },
        [addToCart],
    );
    const handleFavorite = useCallback(
        (item) => {
            addFavorite({ item });
        },
        [addFavorite],
    );
    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        // variableWidth: true,
        autoplaySpeed: 3500,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    arrows: false,
                },
            },
        ],
    };
    return (
        <div className="our__container">
            <TitleCata props="Our Product" />
            <div className="sale__midle">
                <div className="sale__midle-left">
                    <BannerTitle props="Explore Our Products" />
                    {/* <div className="sale__midle-title">
                    <h1>23h : 19m : 56s</h1>
                </div> */}
                </div>
                <div className="sale__midle-right">
                    <svg
                        className="sale_midle-icon1"
                        width="46"
                        height="46"
                        viewBox="0 0 46 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={previous}
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
                    <svg
                        className="sale_midle-icon2"
                        width="46"
                        height="46"
                        viewBox="0 0 46 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={next}
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
            </div>

            <div className="sale__product">
                <Slider ref={(c) => (slider.current = c)} {...settings}>
                    {data &&
                        data.products.map((item, key) => {
                            return (
                                <div className="sale__subItem" key={key}>
                                    <div className="sale__subItem-top">
                                        <div className="titleDiscount sale__subItem-discount">
                                            -{item.discountPercentage}%
                                        </div>
                                        <div className="sale__subItem-svg">
                                            <div className="background__svg">
                                                <svg
                                                    onClick={() => handleFavorite(item)}
                                                    className="svg__like"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="#fff"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z"
                                                        stroke="black"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="background__svg">
                                                <svg
                                                    className="svg__eyes"
                                                    width="22"
                                                    height="16"
                                                    viewBox="0 0 22 16"
                                                    fill="#fff"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                                                        stroke="black"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                                                        stroke="black"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={`/products/${item.id}`} className="sale__subItem-img">
                                        <img src={item.images[0]} alt="product1" />
                                    </Link>
                                    <div className="sale__subItem-btn">
                                        <div className="sale__subItem-button" onClick={() => handleAddToCart(item)}>
                                            Add To Cart
                                        </div>
                                    </div>

                                    <div className="sale__subItem-title">
                                        <div className="titleItem500">{item.title}</div>
                                        <div className="titleItem500" style={{ color: '#DB4444' }}>
                                            ${item.price}
                                        </div>
                                        <div className="sale__subItem-rating">
                                            <Rating
                                                size="small"
                                                name={`simple-controlled-${item.id}`}
                                                value={item.rating}
                                                id={`simple-controller-${item.id}`}
                                                autoComplete="billing postal-code"
                                            />
                                            &nbsp;<p className="titleSubItem600">({item.stock})</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </Slider>
            </div>
            <div className="sale_product-btnAll">
                <Link to="/products" style={{ textDecoration: 'none' }}>
                    <ButtonView props="View All Products" />
                </Link>
            </div>
            <div style={{ opacity: '0.3' }}>
                <hr></hr>
            </div>
        </div>
    );
};

export default OurProduct;
