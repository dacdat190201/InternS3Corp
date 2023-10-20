import React, { Suspense, memo, useCallback, useEffect, useMemo, useState } from 'react';
import './ProductMain.css';
import { CircularProgress } from '@mui/material';
import instance from '../../../../services/axios/axiosDomain/axiosDomain';
import { useParams } from 'react-router-dom';
const ListProduct = React.lazy(() => import('../Product/ListProduct'));
const Filter = React.lazy(() => import('../Filter/Filter'));
const FilterMobile = React.lazy(() => import('../filtermobile/FilterMobile'));
const ProductMain = () => {
    const param = useParams();
    const [data, setData] = useState();
    const [skip, setSkip] = useState('10');
    const [limit, setLimit] = useState('12');
    useEffect(() => {
        const fetch = async () => {
            try {
                if (param.category === 'products') {
                    const res = await instance.get(`/${param.category}?limit=12&skip=${skip}`);
                    setData(res.data);
                    setLimit(res.data.limit);
                    window.scrollTo(0, 0);
                } else {
                    const res = await instance.get(`/products/category/${param.category}`);
                    setData(res.data);
                    setLimit(res.data.limit);
                    window.scrollTo(0, 0);
                }
            } catch (error) {}
        };
        fetch();
    }, [param, skip, limit]);
    const countPage = useCallback(() => {
        // calculate the number of pages
        const pages = Math.ceil(data?.total / 12);

        // return the pages
        return pages;
    }, [data?.total]);

    const totalPage = countPage();
    const pagination = useMemo(() => {
        return {
            totalPage,
            limit,
        };
    }, [totalPage, limit]);

    return (
        <div>
            <hr></hr>

            <div className="product__container">
                <div className="product__title">
                    Product /<p>&nbsp;{param.category}</p>
                </div>
            </div>
            <div className="product__main-container">
                <div className="product__main-left">
                    <Suspense fallback={<CircularProgress />}>
                        <Filter setLimit={setLimit} />
                    </Suspense>
                </div>
                <div className="product__main-leftMobile">
                    <Suspense fallback={<CircularProgress />}>
                        <FilterMobile setData={data} setLimit={setLimit} />
                    </Suspense>
                </div>
                <div className="product__main-right">
                    <Suspense fallback={<CircularProgress />}>
                        <ListProduct pagination={pagination} props={data} setSkip={setSkip} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default memo(ProductMain);
