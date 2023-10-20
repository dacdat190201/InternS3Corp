import React, { memo, useCallback, useEffect, useState } from 'react';
import './Filter.css';
import FilterBrand from './FilterBrand';
import FilterPrice from './FilterPrice';
import instance from '../../../../services/axios/axiosDomain/axiosDomain';
import FilterLimit from './FilterLimit';
import { Link } from 'react-router-dom';

const Filter = ({ setLimit }) => {
    const [list, setList] = useState();
    const [next, setNext] = useState(5);
    const loadMore = useCallback(() => {
        const sum = next + next;
        return setNext(sum);
    }, [next]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await instance.get(`/products/categories`);
                setList(res.data);
            } catch (error) {}
        };
        fetch();
    }, []);

    return (
        <div className="filter__container">
            <div className="filter__top">
                <div className="filter__logo">Filter</div>
                <div>
                    <Link to={'/products'} style={{ textDecoration: 'none' }}>
                        <button className="filter-btnClear">Clear</button>
                    </Link>
                </div>
            </div>
            <div className="filter__center">
                <div className="filter__item">
                    <div className="filter-title">Category</div>
                    {list &&
                        list.slice(0, next).map((item, key) => {
                            return (
                                <div className="filter__item-rdo" key={key}>
                                    <Link
                                        style={{ color: 'black', textDecoration: 'none' }}
                                        to={`/${item}`}
                                        className="filter-rdo"
                                    >
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </Link>
                                    <div className="filter-number">(100)</div>
                                </div>
                            );
                        })}
                    <div
                        style={{
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                        className="filter__item-rdo"
                        onClick={() => loadMore()}
                    >
                        show more
                    </div>
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
                                4.5
                            </div>
                        </div>
                        <div className="filter-number">(100)</div>
                    </div>
                    <div className=" filter__item-rdo">
                        <div className="filter-rdo">
                            <input type="radio" name="topping" value="Medium" id="medium1" />
                            <div htmlFor="medium1">
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
                            <input type="radio" name="topping" value="Large" id="large2" />
                            <div htmlFor="large2">
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
                            <input type="radio" name="topping" value="Large" id="large3" />
                            <div htmlFor="large3">
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                <i className="fa-solid fa-star" style={{ color: '#E59819' }}></i>
                                2.0
                            </div>
                        </div>
                        <div className="filter-number">(100)</div>
                    </div>
                </div>
                <FilterBrand />
                <FilterPrice />
                <FilterLimit setLimit={setLimit} />
            </div>
        </div>
    );
};

export default memo(Filter);
