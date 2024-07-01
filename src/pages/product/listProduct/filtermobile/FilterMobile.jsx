import React, { useEffect, useState } from 'react';
import './FilterMobile.css';
import instance from '../../../../services/axios/axiosDomain/axiosDomain';
import { Link, useNavigate, useParams } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const FilterMobile = () => {
    const [list, setList] = useState();
    let navigate = useNavigate();
    const param = useParams();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await instance.get(`/products/categories`);
                setList(res.data);
            } catch (error) {}
        };
        fetch();
    }, []);
    const [age, setAge] = React.useState('');

    const handleChange1 = (event) => {
        setAge(event.target.value);
    };
    function handleChange(value) {
        navigate(`/${value.target.value}`);
        setAge(value.target.value);
    }

    return (
        <div className="filterMobile__container">
            {/* <div className="FMC__item">
                <select name="selectedFruit" onChange={(event) => handleChange(event.target.value)}>
                    <option>{param.category}</option>
                    <option value="products">
                        <Link style={{ color: 'black', textDecoration: 'none' }} to={`/products`}>
                            All Products
                        </Link>
                    </option>
                    {list &&
                        list.map((item, key) => {
                            return (
                                <option value={item} key={key}>
                                    <Link style={{ color: 'black', textDecoration: 'none' }} to={`/${item}`}>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </Link>
                                </option>
                            );
                        })}
                </select>    
            </div> */}
            <div className="Cate-select btn-group">
                <button
                    className="btn btn-secondary btn-lg "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <p className="titleItem500">{param.category.charAt(0).toUpperCase() + param.category.slice(1)}</p>
                    <KeyboardArrowDownIcon fontSize="medium" />
                </button>
                <ul className="Cate-select dropdown-menu p-2">
                    <li className="dropdown-item">
                        <Link
                            className="titleItem500"
                            style={{ color: 'black', textDecoration: 'none' }}
                            to={`/products`}
                        >
                            All Products
                        </Link>
                    </li>
                    {list &&
                        list.map((item, key) => {
                            return (
                                <li className="dropdown-item" key={key}>
                                    <Link
                                        className="titleItem500"
                                        style={{ color: 'black', textDecoration: 'none' }}
                                        to={`/${item}`}
                                    >
                                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </div>
            {/* 
            <select className="select-wrapper shadow-none form-select form-select-lg" onChange={handleChange}>
                <option value="products">All Products</option>
                {list &&
                    list.map((item, key) => {
                        return (
                            <option value={item} key={key}>
                                <Link style={{ color: 'black', textDecoration: 'none' }} to={`/${item}`}>
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </Link>
                            </option>
                        );
                    })}
            </select> */}
        </div>
    );
};

export default FilterMobile;
