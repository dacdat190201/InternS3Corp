import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../../../services/axios/axiosDomain/axiosDomain';
import LoadingComponent from '../../../common/LoadingComponent';

function Sidebar() {
    const [category, setCatagory] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await instance.get('/products/categories');
                if (res.status === 200) {
                    setCatagory(res.data);
                    setLoading(false);
                }
            } catch (error) {}
        };
        fetch();
    }, []);

    if (loading === true) {
        return (
            <>
                <LoadingComponent loading={loading} />
            </>
        );
    }
    return (
        <div>
            <div className="item-2 item">
                <ul className="menu_midle_list">
                    <li className="menu_midle_item">
                        <div className="menu_midle_item-i" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                            <Link className="nav_midle_link-i" to={`/${category[15]}`}>
                                <h3>Woman's Fashion</h3>
                            </Link>

                            <svg
                                width="8"
                                height="13"
                                viewBox="0 0 8 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ marginRight: 10 }}
                            >
                                <path
                                    d="M4.95 6.63597L0 1.68597L1.414 0.271973L7.778 6.63597L1.414 13L0 11.586L4.95 6.63597Z"
                                    fill="black"
                                />
                            </svg>
                        </div>

                        {/* **********************men2*************** */}
                        <ul className="menu2_list">
                            <li className="menu2_li">
                                <Link className="nav_midle_link" to={`/${category[14]}`}>
                                    <h3>{category[14].charAt(0).toUpperCase() + category[14].slice(1)}</h3>
                                </Link>
                            </li>
                            <li className="menu2_li">
                                <Link className="nav_midle_link" to={`/${category[13]}`}>
                                    <h3>{category[13].charAt(0).toUpperCase() + category[13].slice(1)}</h3>
                                </Link>
                            </li>
                            <li className="menu2_li">
                                <Link className="nav_midle_link" to={`/${category[9]}`}>
                                    <h3>{category[9].charAt(0).toUpperCase() + category[9].slice(1)}</h3>
                                </Link>
                            </li>
                            <li className="menu2_li">
                                <Link className="nav_midle_link" to={`/${category[8]}`}>
                                    <h3>{category[8].charAt(0).toUpperCase() + category[8].slice(1)}</h3>
                                </Link>
                            </li>
                        </ul>
                        {/* ************************************************ */}
                    </li>
                    <li className="menu_midle_item">
                        <Link to={`/${category[10]}`} className="nav_midle_link">
                            <h3>Men's Fashion</h3>
                        </Link>

                        {/* <ul className="menu2_list">
              <li className="menu2_li">
                <a href="#/" className="menu2_link">
                  abs
                </a>
              </li>
              <li className="menu2_li">
                <a href="#/" className="menu2_link">
                  abs
                </a>
              </li>
            </ul> */}
                    </li>

                    {category.slice(0, 5).map((item, key) => {
                        return (
                            <li className="menu_midle_item" key={key}>
                                <Link to={`/${item}`} className="nav_midle_link">
                                    <h3>{item.charAt(0).toUpperCase() + item.slice(1)}</h3>
                                </Link>
                            </li>
                        );
                    })}
                    <li className="menu_midle_item">
                        <Link style={{ textDecoration: 'underline' }} to={`/products`} className="nav_midle_link">
                            <h3>Show more</h3>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
