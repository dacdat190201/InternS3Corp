import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import './SearchPage.css';
import '../home/FlashSale/ProdSale.css';
import '../../pages/about/aboutMain/About.css';
import { Box, Pagination, TextField } from '@mui/material';
import instance from '../../services/axios/axiosDomain/axiosDomain';
import { Link } from 'react-router-dom';
import AuthContext from '../../services/auth/context/AuthContext';
const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState('');
    const [page, setPage] = useState(1);
    const [skip, setSkip] = useState(1);
    //useCallback func
    const handle = useCallback((e) => {
        setSearch(e.target.value.toLowerCase());
    }, []);

    const handleChange = useCallback((event, value) => {
        console.log('render');
        setPage(value);
    }, []);

    const totalPage = useMemo(() => {
        return Math.ceil(data?.total / 30);
    }, [data?.total]);

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
    useEffect(() => {
        const newSkip = (page - 1) * 30;
        setSkip(newSkip);
        const fetch = async () => {
            try {
                const res = await instance.get(`/products?limit=30&skip=${newSkip}`);
                setData(res.data);
            } catch (error) {
                window.alert(error);
            }
        };
        fetch();
    }, [page]);
    return (
        <div>
            <hr></hr>
            <div className="about__top">
                Home /&nbsp;<p> Search</p>
            </div>
            <div className="searchpage__container">
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="standard-basic" label="Standard" variant="standard" onChange={(e) => handle(e)} />
                </Box>
                <div className="list__container">
                    {data &&
                        data.products
                            .filter((item) => {
                                return item && item.title.toLowerCase().includes(search);
                            })
                            .map((item, key) => {
                                return (
                                    <div className="sale_product-search" key={key}>
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
                                                    <img src={item.images[0]} alt="product1" />
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
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Pagination
                        count={totalPage ? Number(totalPage) : 0}
                        page={page}
                        onChange={handleChange}
                        variant="outlined"
                        color="primary"
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(SearchPage);
