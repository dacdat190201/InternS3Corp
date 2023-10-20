import React, { useCallback, useContext, useEffect, useState } from 'react';
import './ListRandom.css';
import '../../home/FlashSale/Sale.css';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../../pages/home/FlashSale/ProdSale.css';
import AuthContext from '../../../services/auth/context/AuthContext';
const ListRandom = ({ props }) => {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetch = async () => {
            const res = await instance.get(`/products/category/${props.category}?limit=5`);
            setLoading(false);
            setData(res.data);
        };
        fetch();
    }, [props.category]);
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
    if (loading === true) {
        return <CircularProgress />;
    }

    return (
        <div className="listRandom">
            <div className="sale__top">
                <div className="sale__top-item"></div>
                <div className="sale__top-title">Related Item</div>
            </div>
            <div className="listRamdom__container">
                {data &&
                    data.products.map((item, key) => {
                        return (
                            <div className="sale_product" key={key}>
                                <div>
                                    <div className="sale_product-discount">
                                        <p>-{item.discountPercentage}%</p>
                                        <svg
                                            onClick={() => handleFavorite(item)}
                                            className="sale__product-like"
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
                                    <Link to={`/products/${item.id}`}>
                                        <div className="sale_product-img">
                                            <img src={item.images[0]} alt={item.title} />
                                        </div>
                                    </Link>
                                    <button className="sale_product-btn" onClick={() => handleAddToCart(item)}>
                                        <h4>Add To Cart</h4>{' '}
                                    </button>
                                    <div className="sale_product-body">
                                        <h4>{item.title}</h4>
                                        <span>{item.price}$ </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ListRandom;
