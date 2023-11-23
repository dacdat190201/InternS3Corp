import React, { useEffect, useState } from 'react';
import instance from './services/axios/axiosDomain/axiosDomain';

const Test = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetch = async () => {
            let i = 0;
            try {
                const res = await instance.get('/products/categories', {
                    timeout: 1500, // 1.5 seconds
                });
                console.log(res.data.map((item) => item === 'smartphones'));
                return setData(
                    res.data.map((item) => {
                        if (item === 'smartphones') {
                            return { name: item, img: 'Sphone' };
                        }
                        if (item === 'laptops') {
                            return { name: item, img: 'Slaptop' };
                        }
                        if (item === 'fragrances') {
                            return { name: item, img: 'Sfragrabces' };
                        }
                        if (item === 'skincare') {
                            return { name: item, img: 'Sgroceries' };
                        }
                        if (item === 'groceries') {
                            return { name: item, img: 'Sgroceries' };
                        }
                        if (item === 'home-decoration') {
                            return { name: item, img: 'Shome-decoration' };
                        } else {
                            return { name: item, img: 'none' };
                        }
                    }),
                );
                // return setData(
                //     res.data.map((item) => ({
                //         id: i++,
                //         name: item,
                //         img: 'phone.png',
                //     })),
                // );
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
    console.log(data);
    return <div className="app">{/* <ul>{myComponentList}</ul> */}</div>;
};

export default Test;
