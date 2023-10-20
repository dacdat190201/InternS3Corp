import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Category from './Category';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import './Category.css';
import FilterCate from '../category/FilterCate';

const ListCategory = () => {
    const param = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await instance.get(`/products/category/${param.category}`);
                setData(res.data);
            } catch (error) {}
        };
        fetch();
    }, [param]);

    return (
        <div>
            <hr></hr>
            <div className="product__container">
                <div className="product__title">
                    Category /<p>&nbsp;{param.category}</p>
                </div>
                <div className="product__container-right">
                    <Link to="/products" className="product__container-link">
                        <b>View All</b>
                    </Link>
                </div>
            </div>

            <div className="product__main-container">
                <div className="product__main-left">
                    <FilterCate setData={setData} />
                </div>
                <div className="product__main-right">
                    <Category props={data} />
                </div>
            </div>
        </div>
    );
};

export default ListCategory;
