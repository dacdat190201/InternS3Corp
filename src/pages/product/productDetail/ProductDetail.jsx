import React, { useContext, useEffect, useRef, useState } from 'react';
import './ProductDetail.css';
import { Link, useParams } from 'react-router-dom';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import './ProductDetail.css';
import { CircularProgress, Rating } from '@mui/material';
import ListRandom from './ListRandom';
import AuthContext from '../../../services/auth/context/AuthContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductDetail = () => {
    const param = useParams('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [image, setImages] = useState();
    const { addToCart, addFavorite } = useContext(AuthContext);
    const [value, setValue] = useState(1);
    const bottomRef = useRef(null);
    // const param = useMemo(() => {
    //     return getparam;
    // }, [getparam]);
    function handleChange(event) {
        setValue(Number(event.target.value));
    }

    const handlePlus = (e) => {
        setValue(value + 1);
    };
    const handleLess = () => {
        if (value !== 1) {
            setValue(value - 1);
        }
    };
    const handle = (item) => {
        return setImages(item);
    };
    const handleAddFavorite = (item) => {
        addFavorite({
            item,
        });
    };
    const handleAddToCart = (item) => {
        addToCart({
            item,
            quantity: value,
        });
    };
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await instance.get(`/products/${param.id}`);
                setLoading(false);
                setData(res.data);
                setImages(res.data.images[0]);
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                console.error(error.message);
            }
        };
        fetch();
    }, [param.id]);

    // useMemo(() => {
    //     handle();
    // }, []);
    if (loading === true) {
        return <CircularProgress />;
    }

    return (
        <div ref={bottomRef}>
            <hr></hr>
            <div className="product__container">
                <div className="product__title">
                    <Link to={`/products`} style={{ textDecoration: 'none', color: 'black' }}>
                        Product
                    </Link>
                    /
                    <p>
                        <Link to={`/${data.category}`} style={{ textDecoration: 'none', color: 'black' }}>
                            &nbsp;{data.category}
                        </Link>
                        / {data.title}
                    </p>
                </div>
            </div>
            <div className="product__detail">
                <div className="product__detail-listImg">
                    {data.images?.slice(0, 5).map((item, key) => {
                        return (
                            <div onClick={() => handle(item)} key={key}>
                                {/* <LazyLoadImage src={item} alt={image.title} className="product__detail-IMGItem" /> */}
                                <img src={item} alt="" className="product__detail-IMGItem" loading="lazy" />
                            </div>
                        );
                    })}
                </div>
                <div className="product_detail-img">
                    {image ? (
                        // <img src={`${image}`} alt={data.title} />
                        <LazyLoadImage src={`${image}`} alt={data.title} />
                    ) : (
                        <LazyLoadImage src={`${image.images[0]}`} alt={data.title} />
                        // <img src={`${image.images[0]}`} alt={image.title} />
                    )}
                </div>
                <div className="product__detail-content">
                    <div className="product__detail-title">
                        <h2>{data.title}</h2>
                        <div className="product__detail-rating">
                            <Rating name="simple-controlled" value={data.rating} />
                            <p>({data.stock} Reviewer)</p> |
                            <span className="detail-titleColor">In Stock {data.brand}</span>
                        </div>

                        <div>
                            <p className="detail__price">$ {data.price}</p>
                            <p style={{ margin: 0 }}> (-{data.discountPercentage}%)</p>
                        </div>
                    </div>
                    <div className="detail__description">
                        <div className="detail__description-des">{data.description}</div>
                        <hr color="grey" style={{ marginTop: 24, marginBottom: 24 }}></hr>
                    </div>
                    <div className="detail__btn">
                        <div className="detail__btn-quantity">
                            <button onClick={handleLess}>-</button>

                            <input type="number" min={1} value={value} onChange={handleChange} inputMode="numeric" />

                            <button onClick={handlePlus}>+</button>
                        </div>
                        <div className="detail__btn-buy">
                            <button onClick={() => handleAddToCart(data)}>Buy Now</button>
                        </div>
                        <div className="detail__btn-like">
                            <button onClick={() => handleAddFavorite(data)}>
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="detail__bottom">
                        <div className="detail__shipcar">
                            <div>
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_261_4843)">
                                        <path
                                            d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M5 11.8182H11.6667"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M1.81836 15.4545H8.48503"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M5 19.0909H11.6667"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_261_4843">
                                            <rect width="40" height="40" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div>
                                <p>Free Delivery</p>
                                <p>Enter your postal code for Delivery Availability</p>
                            </div>
                        </div>
                        <hr color="grey"></hr>
                        <div className="detail__shipcar">
                            <div>
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_261_4865)">
                                        <path
                                            d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_261_4865">
                                            <rect width="40" height="40" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div>
                                <p>Return Delivery</p>
                                <p>Free 30 Days Delivery Returns, Details</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ListRandom props={data} />
        </div>
    );
};

export default ProductDetail;
