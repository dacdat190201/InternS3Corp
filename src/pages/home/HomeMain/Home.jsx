import React, { Suspense } from 'react';
import './Home.css';
import ThisMonth from '../thismonth/ThisMonth';
// import FooHead from '../../../component/UI/header/fooHead/FooHead';
import Arrival from '../arrival/Arrival';
import Thumbnail from '../thumbnail/Thumbnail';
import OurProduct from '../ourproduct/OurProduct';
import Categories from '../categories/Categories';
import Sale from '../FlashSale/Sale';
import LoadingComponent from '../../../component/common/LoadingComponent';
const FooHead = React.lazy(() => import('../../../component/UI/header/fooHead/FooHead'));
// const Categories = React.lazy(() => import('../categories/Categories'));
// const Sale = React.lazy(() => import('../FlashSale/Sale'));
function Home() {
    return (
        <div className="home__container">
            <Suspense fallback={<LoadingComponent loading={true} />}>
                <FooHead />
            </Suspense>
            <div className="home__main">
                <Thumbnail />

                <Sale />

                <Categories />

                <ThisMonth />
                <OurProduct />
                <Arrival />
            </div>
        </div>
    );
}

export default Home;
