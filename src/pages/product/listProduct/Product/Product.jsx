import { Rating } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../services/auth/context/AuthContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const Product = ({ props }) => {
    const [state, setState] = useState(props);
    const { addToCart, addFavorite } = useContext(AuthContext);
    const handleFavorite = (item) => {
        addFavorite({ item });
    };
    const handleAddToCart = (item) => {
        addToCart({
            item,
            quantity: 1,
        });
    };
    useEffect(() => {
        setState(props);
    }, [props]);

    return (
        state &&
        state.products.map((item, key) => {
            return (
                <div className="main__product" key={key}>
                    <div className="main_product-icon">
                        <div>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => handleFavorite(item)}
                                className="product_icon-svg"
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
                        <div className="main_product-discount">-{item.discountPercentage}%</div>
                    </div>
                    <Link to={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
                        <div className="main_product-img">
                            <LazyLoadImage src={item.images[0]} alt="Image Alt" />
                            {/* <img src={item.images[0]} alt="product1" /> */}
                        </div>
                        <div className="main_product-body">
                            <h4>{item.title}</h4>
                            <span>{item.brand}</span>
                        </div>
                    </Link>
                    <div>
                        <div className="main_product-bottom">
                            <div className="product__bottom-rate">
                                <Rating
                                    name={`simple-controlled-${item.id}`}
                                    value={item.rating}
                                    id={`simple-controller-${item.id}`}
                                    autoComplete="billing postal-code"
                                />
                                &nbsp;<p>({item.stock})</p>
                            </div>

                            <span className="main_product-price">${item.price}</span>
                        </div>
                    </div>
                    <div className="main__product__btn">
                        <div className="main__product-btn1">
                            <button onClick={() => handleAddToCart(item)}>Add To Cart</button>
                        </div>
                        <div className="main__product-btn2">
                            <button>Add Shortlist</button>
                        </div>
                    </div>
                </div>
            );
        })
    );
};

export default Product;
