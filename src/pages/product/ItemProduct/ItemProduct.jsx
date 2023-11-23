import React from 'react';
import './ItemProduct.css';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
const ItemProduct = ({ item, handleFavorite, handleAddToCart }) => {
    return (
        <div className="ItemProd-rd">
            <div className="ItemProd-top-rd">
                <div className="titleDiscount ItemProd-discount-rd">-{item.discountPercentage}%</div>
                <div className="ItemProd-svg-rd">
                    <div className="Itembackground__svg">
                        <svg
                            onClick={() => handleFavorite(item)}
                            className="svg__eyes"
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

                    <div className="Itembackground__svg">
                        <svg
                            className="svg__like-rd"
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
            <Link to={`/products/${item.id}`} className="ItemProd-img-rd">
                <img src={item.images[0]} alt="product1" loading="lazy" />
            </Link>
            <div className="ItemProd-btn-rd">
                <div className="ItemProd-button-rd" onClick={() => handleAddToCart(item)}>
                    Add To Cart
                </div>
            </div>
            <div className="ItemProd-title-rd">
                <div className="titleItem500">{item.title}</div>
                <div className="ItemProd-desc">
                    <div className="titleDescrip">{item.description}</div>
                </div>

                <div className="PriceName" style={{ color: '#DB4444' }}>
                    ${item.price}
                </div>
                <div className="ItemProd-rating-rd">
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
};

export default ItemProduct;
