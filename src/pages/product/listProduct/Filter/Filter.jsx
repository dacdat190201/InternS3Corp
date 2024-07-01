import React, { memo, useCallback, useEffect, useState } from 'react';
import './Filter.css';
import FilterBrand from './FilterBrand';
import FilterPrice from './FilterPrice';
import instance from '../../../../services/axios/axiosDomain/axiosDomain';
import FilterLimit from './FilterLimit';
import { Link } from 'react-router-dom';

const Filter = ({ setLimit, param }) => {
    const [list, setList] = useState('');
    const [next, setNext] = useState(5);
    const [selectedList, setSelectedList] = useState({ id: param.category });
    const loadMore = useCallback(() => {
        const sum = next + next;
        return setNext(sum);
    }, [next]);
    const loadLess = useCallback(() => {
        const less = next - 15;
        return setNext(less);
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
                <div className="BreadName">Filter</div>
                <div>
                    <Link to={'/products'} style={{ textDecoration: 'none' }}>
                        <button
                            className="filter-btnClear"
                            onClick={() => {
                                setSelectedList({});
                            }}
                        >
                            Clear All
                        </button>
                    </Link>
                </div>
            </div>
            <div className="filter__center">
                <div className="filter__item">
                    <div className="filter-title BreadName">Category</div>
                    {list &&
                        list.slice(0, next).map((item, key) => {
                            return (
                                <div className="filter__item-rdo" key={key}>
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={`/${item}`}
                                        className={
                                            'filter-rdo ' +
                                            (item === selectedList.id ? 'filter-rdo_link' : 'filter-rdo')
                                        }
                                        onClick={() => setSelectedList({ id: item })}
                                    >
                                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                    </Link>
                                    <div
                                        className={
                                            'filter-number ' +
                                            (item === selectedList.id ? 'filter-rdo_link' : 'filter-number')
                                        }
                                    >
                                        (100)
                                    </div>
                                </div>
                            );
                        })}
                    {next === Number(list.length) ? (
                        <div
                            style={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                            className="filter__item-rdo"
                            onClick={() => loadLess()}
                        >
                            show Less
                        </div>
                    ) : (
                        <div
                            style={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                            className="filter__item-rdo"
                            onClick={() => loadMore()}
                        >
                            show more
                        </div>
                    )}
                </div>

                <div className="filter__item">
                    <div className="filter-title BreadName">Rating</div>
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
