import React, { useEffect, useState } from 'react';
import FilterBrand from '../listProduct/Filter/FilterBrand';
import FilterPriceCate from './FilterPriceCate';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import '../listProduct/Filter/Filter.css';
const FilterCate = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await instance.get('/products/categories');
                setLoading(false);
                setData(res.data);
            } catch (error) {}
        };
        fetch();
    }, []);

    if (loading === true) {
        return <CircularProgress />;
    }

    return (
        <div className="filter__container">
            <div className="filter__top">
                <div className="filter__logo">Filter</div>
            </div>
            <div className="filter__center">
                <div className="filter__item">
                    <div className="filter-title">Category</div>
                    {data &&
                        data.map((item, key) => {
                            return (
                                <div className="filter__item-rdo" key={key}>
                                    <Link to={`/${item}`} className="product__container-link">
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </Link>
                                    <div className="filter-number">(100)</div>
                                </div>
                            );
                        })}
                </div>
                <div className="filter__item">
                    <div className="filter-title">Rating</div>
                    <div className=" filter__item-rdo">
                        <div className="filter-rdo">
                            <input type="radio" name="topping" value="Regular" id="regular" />
                            <div htmlFor="regular">
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                4.5 & up
                            </div>
                        </div>
                        <div className="filter-number">(100)</div>
                    </div>
                    <div className=" filter__item-rdo">
                        <div className="filter-rdo">
                            <input type="radio" name="topping" value="Medium" id="medium" />
                            <div htmlFor="medium">
                                {' '}
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                4.0
                            </div>
                        </div>
                        <div className="filter-number">(100)</div>
                    </div>
                    <div className=" filter__item-rdo">
                        <div className="filter-rdo">
                            <input type="radio" name="topping" value="Large" id="large" />
                            <div htmlFor="large">
                                {' '}
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                3.0
                            </div>
                        </div>
                        <div className="filter-number">(100)</div>
                    </div>
                    <div className=" filter__item-rdo">
                        <div className="filter-rdo">
                            <input type="radio" name="topping" value="Large" id="small" />
                            <div htmlFor="small">
                                {' '}
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                2.0
                            </div>
                        </div>
                        <div className="filter-number">(100)</div>
                    </div>
                </div>
                <FilterBrand />
                <FilterPriceCate />
            </div>
        </div>
    );
};

export default FilterCate;
