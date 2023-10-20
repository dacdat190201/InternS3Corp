import React, { Suspense, useEffect, useState } from 'react';
import './ListProduct.css';
import { Pagination, Stack } from '@mui/material';
import { CircularProgress } from '@mui/material';
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
                <div className="filter__title-product">
                    Showing {props?.limit} Result from total {props?.total} || {page}
                </div>
                {/* <div>
                    <select
                        className="filter-btnClear"
                        id="filter-btnClear"
                        //onClick={(e) => handle(e)}
                    >
                        <option value="null">Popularity</option>

                        <option value="desc">Desc</option>

                        <option value="asc">Asc</option>
                    </select>
                </div> */}
            </div>
            {/* ********************** */}
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
                        onChange={handleChange}
                    />
                </Stack>
            </div>
        </div>
    );
};

export default ListProduct;
