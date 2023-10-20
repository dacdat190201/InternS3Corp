import React, { useEffect, useState } from 'react';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import './Search.css';
import { Link } from 'react-router-dom';

const Search = () => {
    const [data, setData] = useState();
    const [value, setValue] = useState('');

    useEffect(() => {
        const fetch = async () => {
            const res = await instance.get('/products');
            setData(res.data.products);
        };
        fetch();
    }, []);

    const handleSearch = (e) => {
        setValue(e.target.value);
    };

    return (
        <div>
            <form className="searchbox_input">
                <input
                    type="text"
                    placeholder="What are you looking for"
                    id="search_bar-input"
                    onChange={(e) => handleSearch(e)}
                />
                <Link to="/search" className="searbox_input-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </form>

            <div className="searching__background">
                {data &&
                    data.length &&
                    data
                        .filter((item) => {
                            //   Cách 1
                            const name = item.title.toLowerCase();
                            const searchTerm = value.toLowerCase();
                            return searchTerm && name.startsWith(searchTerm);
                            //   Cách 2
                            //   return (
                            //     item && item.title.toLowerCase().includes(value.toLowerCase())
                            //   );
                        })
                        .slice(0, 4)
                        .map((item, key) => {
                            return (
                                <div key={key}>
                                    <Link
                                        to={`/products/${item.id}`}
                                        style={{ color: 'black' }}
                                        onClick={(e) => handleSearch('')}
                                        className="searching__container"
                                    >
                                        <div>
                                            <img src={item.images[0]} alt="" width={80} height={100} />
                                        </div>
                                        <div className="searching-title">
                                            <div> {item.title}</div>
                                            <div className="searching-link">Click!</div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
            </div>
        </div>
    );
};

export default Search;
