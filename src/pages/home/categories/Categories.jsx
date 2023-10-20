import React, { useEffect, useState } from 'react';
import './Categories.css';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import { Link } from 'react-router-dom';
function Categories() {
    const [data, setData] = useState('');
    // useEffect(() => {
    //     const fetch = async () => {
    //         const res = await instance.get('/products/categories');
    //         let i = 0;
    //         setData(
    //             res.data.map((item) => ({
    //                 id: i++,
    //                 name: item,
    //                 img: 'phone.png',
    //             })),
    //         );
    //     };
    //     fetch();
    // }, []);
    useEffect(() => {
        const fetch = async () => {
            let i = 0;
            try {
                const res = await instance.get('/products/categories', {
                    timeout: 1500, // 1.5 seconds
                });
                return setData(
                    res.data.map((item) => ({
                        id: i++,
                        name: item,
                        img: 'phone.png',
                    })),
                );
            } catch (error) {
                if (error.code === 'ECONNABORTED') {
                    // Retry the request after 5 seconds
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    return fetch();
                } else {
                    throw error;
                }
            }
        };
        fetch();
    }, []);
    return (
        <div className="cate__page">
            <div className="sale__top">
                <div className="sale__top-item"></div>
                <div className="sale__top-title">Categories</div>
            </div>
            <div className="sale__midle">
                <div className="sale__midle-left">
                    <div className="sale__midle-title">
                        <h1>Browse By Category</h1>
                    </div>
                </div>
            </div>
            <div className="cate_main">
                {data &&
                    data.slice(0, 8)?.map((item, key) => {
                        return (
                            <Link
                                className="cate__list"
                                to={`/${item.name}`}
                                style={{ color: 'black', textDecoration: 'none' }}
                                key={key}
                            >
                                <div className="cate__item">
                                    <img src={require(`../../../assets/images/chude/${item?.img}`)} alt="" />
                                    <h5>{item?.name}</h5>
                                </div>
                            </Link>
                        );
                    })}
            </div>
            <hr></hr>
        </div>
    );
}

export default Categories;
