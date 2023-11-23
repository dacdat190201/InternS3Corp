import React from 'react';
import './Search.css';
import { Link } from 'react-router-dom';

const SearchItem = ({ data }) => {
    return (
        <Link to={`/products/${data.id}`} className="searchItem">
            <img src={data?.images[0]} alt={data.title} />
            <div>
                <h4 className="search-name">{data?.title}</h4>
                <h5 className="search-price">${data?.price}</h5>
            </div>
        </Link>
    );
};

export default SearchItem;
