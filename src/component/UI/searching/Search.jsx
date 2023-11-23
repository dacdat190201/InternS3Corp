import React, { useEffect, useRef, useState } from 'react';
import instance from '../../../services/axios/axiosDomain/axiosDomain';
import './Search.css';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import Tippynone from '@tippyjs/react';
import useDebounce from '../../../services/hook/useDebounce';
import SearchItem from './SearchItem';
const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const focusInput = useRef();
    //1:''
    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        const fetch = async () => {
            try {
                await instance.get(`/products/search?q=${encodeURIComponent(debounced)}`).then((res) => {
                    setSearchResult(res.data);
                    setLoading(false);
                });
            } catch (err) {
                setLoading(false);
            }
        };
        fetch();
    }, [debounced]);
    const handleClear = () => {
        setSearchValue('');
        focusInput.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
        setSearchValue('');
    };

    return (
        <div>
            <form className="searchbox_input">
                <Tippy
                    interactive
                    visible={showResult && setSearchResult.length > 0}
                    placement="bottom"
                    render={(attrs) => (
                        <div className="wrapper_search">
                            <div className="search-results" tabIndex="-1" {...attrs}>
                                <h4 className="search-title">Products</h4>
                                {searchResult?.products?.length === 0 && (
                                    <>
                                        <h4 style={{ marginTop: 8 }} className="search-price">
                                            Not found
                                        </h4>
                                    </>
                                )}
                                {searchValue === '' && (
                                    <>
                                        <h4 style={{ marginTop: 8 }} className="search-price">
                                            Please Enter
                                        </h4>
                                    </>
                                )}
                                {searchResult &&
                                    searchResult?.products
                                        ?.slice(0, 15)
                                        .map((result) => <SearchItem key={result.id} data={result} />)}
                            </div>
                        </div>
                    )}
                    onClickOutside={handleHideResult}
                >
                    <div className="search__tippy">
                        <input
                            ref={focusInput}
                            onFocus={() => setShowResult(true)}
                            value={searchValue}
                            spellCheck={false}
                            type="text"
                            placeholder="What are you looking for"
                            id="search_bar-input"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        {!!searchValue && !loading && (
                            <button>
                                <i className="fa-solid fa-xmark" onClick={handleClear}></i>
                            </button>
                        )}

                        {loading && <i className="fa-solid fa-spinner search__tippy-loading"></i>}

                        <Tippynone content="Search" placement="bottom">
                            <Link to="/search">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </Tippynone>
                    </div>
                </Tippy>
            </form>
            <Link to="/search" className="searchBar__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
            </Link>
        </div>
    );
};

export default Search;
