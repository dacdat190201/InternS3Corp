import React, { useCallback, useContext, useEffect, useState } from 'react';
import './ListRandom.css';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import LoadingComponent from '../../../component/common/LoadingComponent';
import ItemProduct from '../../product/ItemProduct/ItemProduct';
import '../../../pages/home/FlashSale/ProdSale.css';
import AuthContext from '../../../services/auth/context/AuthContext';
import TitleCata from '../../../component/common/TitleCata';
const ListRandom = ({ props }) => {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetch = async () => {
            const res = await instance.get(`/products/category/${props?.category}?limit=4`);
            setLoading(false);
            setData(res.data);
        };
        fetch();
    }, [props?.category]);
    const { addToCart, addFavorite } = useContext(AuthContext);
    const handleAddToCart = useCallback(
        (item) => {
            addToCart({
                item,
                quantity: 1,
            });
        },
        [addToCart],
    );
    const handleFavorite = useCallback(
        (item) => {
            addFavorite({ item });
        },
        [addFavorite],
    );
    if (loading === true) {
        return <LoadingComponent loading={true} />;
    }
    return (
        <div className="listRandom">
            <TitleCata props="Related Item" />
            <div className="listRamdom__container">
                {data &&
                    data?.products.map((item, key) => {
                        return (
                            <ItemProduct
                                item={item}
                                key={key}
                                handleAddToCart={handleAddToCart}
                                handleFavorite={handleFavorite}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default ListRandom;
