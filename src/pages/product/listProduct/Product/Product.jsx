import React, { Suspense, useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../services/auth/context/AuthContext';
import './Product.css';
import { CircularProgress } from '@mui/material';
// import ItemProduct from '../../ItemProduct/ItemProduct';
const ItemProduct = React.lazy(() => import('../../ItemProduct/ItemProduct'));
const Product = ({ props }) => {
    const [state, setState] = useState(props);
    const { addToCart, addFavorite } = useContext(AuthContext);
    const handleFavorite = (item) => {
        addFavorite({ item });
    };
    const handleAddToCart = (item) => {
        addToCart({
            item,
            quantity: 1,
        });
    };
    useEffect(() => {
        setState(props);
    }, [props]);
    return (
        state &&
        state.products.map((item, key) => {
            return (
                <div key={key}>
                    <Suspense fallback={<CircularProgress />}>
                        <ItemProduct item={item} handleFavorite={handleFavorite} handleAddToCart={handleAddToCart} />
                    </Suspense>
                </div>
            );
        })
    );
};

export default Product;
