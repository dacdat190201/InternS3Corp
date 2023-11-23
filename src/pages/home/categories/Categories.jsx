import React, { useEffect, useState } from 'react';
import './Categories.css';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import '../../../component/common/TitleCata';
import { Link } from 'react-router-dom';
import BannerTitle from '../../../component/common/BannerTitle';
import TitleCata from '../../../component/common/TitleCata';
function Categories() {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetch = async () => {
            let i = 0;
            try {
                const res = await instance.get('/products/categories', {
                    timeout: 1500, // 1.5 seconds
                });
                return setData(
                    res.data.map((item) => {
                        if (item === 'smartphones') {
                            return { name: item, img: 'Sphone.svg' };
                        }
                        if (item === 'laptops') {
                            return { name: item, img: 'Slaptop.svg' };
                        }
                        if (item === 'fragrances') {
                            return { name: item, img: 'Sfragrabces.svg' };
                        }
                        if (item === 'skincare') {
                            return { name: item, img: 'Sskincare.svg' };
                        }
                        if (item === 'groceries') {
                            return { name: item, img: 'Sgroceries.svg' };
                        }
                        if (item === 'home-decoration') {
                            return { name: item, img: 'Shome-decoration.svg' };
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
    return (
        <div className="cate__page">
            <TitleCata props="Categories" />
            <div className="cate__midle">
                <BannerTitle props="Browse By Category" />
            </div>
            <div className="cate_main">
                {data &&
                    data.slice(0, 6)?.map((item, key) => {
                        return (
                            <Link
                                className="cate__list"
                                to={`/${item.name}`}
                                style={{ color: 'black', textDecoration: 'none' }}
                                key={key}
                            >
                                <div className="cate__item">
                                    <img src={require(`../../../assets/icon/${item?.img}`)} alt={item?.name} />
                                    {/* <svg
                                        width="56"
                                        height="56"
                                        viewBox="0 0 56 56"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_1295_3077)">
                                            <path
                                                d="M46.6665 14H9.33317C6.75584 14 4.6665 16.0893 4.6665 18.6667V37.3333C4.6665 39.9107 6.75584 42 9.33317 42H46.6665C49.2438 42 51.3332 39.9107 51.3332 37.3333V18.6667C51.3332 16.0893 49.2438 14 46.6665 14Z"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14 28H23.3333M18.6667 23.3334V32.6667"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M35 25.6666V25.6908"
                                                stroke="black"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M42 30.3333V30.3574"
                                                stroke="black"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1295_3077">
                                                <rect width="56" height="56" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg> */}
                                    <h3>{item?.name}</h3>
                                </div>
                            </Link>
                        );
                    })}
            </div>
            <hr style={{ opacity: '0.3' }}></hr>
        </div>
    );
}

export default Categories;
