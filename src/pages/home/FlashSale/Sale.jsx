import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Sale.css';
import './ProdSale.css';
import Slider from 'react-slick';
import { useRef } from 'react';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import { Link } from 'react-router-dom';
import AuthContext from '../../../services/auth/context/AuthContext';
function Sale() {
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
                const res = await instance.get('/products?limit=20&skip=10');
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
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    arrows: false,
                },
            },
        ],
    };
    return (
        <div>
            <div className="sale__top">
                <div className="sale__top-item"></div>
                <div className="sale__top-title">Today's</div>
            </div>
            <div className="sale__midle">
                <div className="sale__midle-left">
                    <div className="sale__midle-title">
                        <h1>Flash Sale</h1>
                    </div>
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
                                <div className="sale_product" key={key}>
                                    <div>
                                        <div className="sale_product-discount">
                                            <p>- {item.discountPercentage} %</p>
                                            <svg
                                                className="sale__product-like"
                                                width="34"
                                                height="34"
                                                viewBox="0 0 34 34"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={() => handleFavorite(item)}
                                                style={{ cursor: 'pointer' }}
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
                                        <div className="sale_product-img">
                                            <Link to={`/products/${item.id}`}>
                                                <img src={item.images[0]} alt={item.title} loading="lazy" />
                                            </Link>
                                        </div>
                                        <button className="sale_product-btn" onClick={() => handleAddToCart(item)}>
                                            <h4>Add To Cart</h4>
                                        </button>
                                        <div className="sale_product-body">
                                            <h4>{item.title}</h4>
                                            <span>Price: {item.price}$ </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </Slider>
            </div>
            <div className="sale_product-btnAll">
                <Link to="/products">
                    <button className="sale-btnAll">
                        <h2>View All Product</h2>
                    </button>
                </Link>
            </div>
            <div>
                <hr></hr>
            </div>
        </div>
    );
}

export default Sale;
