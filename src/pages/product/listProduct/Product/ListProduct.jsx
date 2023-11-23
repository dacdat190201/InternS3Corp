import React, { Suspense, useEffect, useState } from 'react';
import './ListProduct.css';
import { CircularProgress, Pagination, Stack } from '@mui/material';
// import Product from './Product';
import LoadingComponent from '../../../../component/common/LoadingComponent';
const Product = React.lazy(() => import('./Product'));
const ListProduct = ({ pagination, props, setSkip }) => {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setSkip((page - 1) * 12);
    }, [page, setSkip]);

    return (
        <div className="filter__container">
            <div className="filter__top">
                <div className="filter__title-product BreadName">
                    Showing {props?.limit} Result from total {props?.total} | {page}
                </div>
            </div>

            <div className="list__product-main">
                <Suspense fallback={<CircularProgress />}>
                    <Product props={props} />
                </Suspense>
            </div>
            <div className="list__product-bottom">
                <Stack spacing={2}>
                    <Pagination
                        count={pagination.totalPage ? parseInt(pagination.totalPage) : 0}
                        size="large"
                        variant="outlined"
                        color="primary"
                        page={page}
                        defaultPage={6}
                        siblingCount={0}
                        onChange={handleChange}
                    />
                </Stack>
            </div>
        </div>
    );
};

export default ListProduct;
