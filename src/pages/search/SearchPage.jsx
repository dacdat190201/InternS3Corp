import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import './SearchPage.css';
import { Box, CircularProgress, Pagination, TextField } from '@mui/material';
import instance from '../../services/axios/axiosDomain/axiosDomain';
import '../../pages/product/listProduct/Product/Product.css';
import ItemProduct from '../product/ItemProduct/ItemProduct';
import AuthContext from '../../services/auth/context/AuthContext';
import BreadcurmbNavigation from '../../component/common/BreadcurmbNavigation';
import LoadingComponent from '../../component/common/LoadingComponent';
const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState('');
    const [page, setPage] = useState(1);
    const [skip, setSkip] = useState(1);
    const [loading, setLoading] = useState(false);
    const refForcus = useRef();
    //useCallback func
    const handle = useCallback((e) => {
        setSearch(e.target.value.toLowerCase());
    }, []);
    const handleClear = (e) => {
        setSearch(''); //To reset the textfield value
        e.preventDefault();
    };
    const handleChange = useCallback((event, value) => {
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
    const searchResults = data?.products?.filter((item) => {
        return item && item?.title?.toLowerCase().includes(search);
    });
    useEffect(() => {
        const newSkip = (page - 1) * 30;
        setSkip(newSkip);
        setLoading(true);
        const fetch = async () => {
            try {
                const res = await instance.get(`/products?limit=28&skip=${newSkip}`);
                setData(res.data);
                setLoading(false);
            } catch (error) {
                window.alert(error);
            }
        };
        fetch();
    }, [page]);

    if (loading) {
        return <LoadingComponent loading={loading} />;
    }

    return (
        <div className="search__container-main">
            <BreadcurmbNavigation props="Search" />
            <div className="searchpage__container">
                <Box
                    style={{ position: 'relative' }}
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        value={search}
                        id="standard-basic"
                        label="Search"
                        variant="standard"
                        onChange={(e) => handle(e)}
                        ref={refForcus}
                    />
                    {!!search && (
                        <i
                            className="fa-solid fa-xmark"
                            style={{
                                width: 10,
                                position: 'absolute',
                                top: 20,
                                right: 0,
                                border: 'none',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                            }}
                            onClick={(e) => handleClear(e)}
                        ></i>
                    )}
                </Box>
                {searchResults?.length === 0 ? (
                    <div
                        style={{
                            height: '60vh',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '92px',
                        }}
                    >
                        Not Found
                    </div>
                ) : (
                    <div className="search__product-main">
                        {loading && (
                            <>
                                <CircularProgress />
                            </>
                        )}
                        {searchResults?.map((item, key) => {
                            return (
                                <ItemProduct
                                    item={item}
                                    key={key}
                                    handleFavorite={handleFavorite}
                                    handleAddToCart={handleAddToCart}
                                />
                            );
                        })}
                        {/* {searchResults?.length === 0 ? (
                        <div
                            style={{
                                height: '60vh',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <h1>Not Found</h1>
                        </div>
                    ) : (
                        searchResults?.map((item, key) => {
                            return (
                                <ItemProduct
                                    item={item}
                                    key={key}
                                    handleFavorite={handleFavorite}
                                    handleAddToCart={handleAddToCart}
                                />
                            );
                        })
                    )} */}
                        {/* {data &&
                        data.products

                            .filter((item) => {
                                return item && item.title.toLowerCase().includes(search);
                            })
                            .map((item, key) => {
                                return item.length === 0 ? (
                                    <div>
                                        <h1>Not Found</h1>
                                    </div>
                                ) : (
                                    <ItemProduct
                                        item={item}
                                        key={key}
                                        handleFavorite={handleFavorite}
                                        handleAddToCart={handleAddToCart}
                                    />
                                );
                            })} */}
                    </div>
                )}

                <div className="search__bottom">
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
