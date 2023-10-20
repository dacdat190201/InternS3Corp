import React, { Suspense } from 'react';
import './Home.css';
import ThisMonth from '../thismonth/ThisMonth';
import FooHead from '../../../component/UI/header/fooHead/FooHead';
import Arrival from '../arrival/Arrival';
import { CircularProgress } from '@mui/material';
import Thumbnail from '../thumbnail/Thumbnail';
const Categories = React.lazy(() => import('../categories/Categories'));
const Sale = React.lazy(() => import('../FlashSale/Sale'));
function Home() {
    return (
        <div>
            <FooHead />
            <div className="home__main">
                <Thumbnail />
                <Suspense fallback={<CircularProgress />}>
                    <Sale />
                </Suspense>
                <Suspense fallback={<CircularProgress />}>
                    <Categories />
                </Suspense>
                <ThisMonth />
                <Arrival />
            </div>
        </div>
    );
}

export default Home;
