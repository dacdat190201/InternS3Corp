import React, { useEffect, useState } from 'react';
import './FilterMobile.css';
import instance from '../../../../services/axios/axiosDomain/axiosDomain';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Categories</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value="products">
                        <em>All</em>
                    </MenuItem>
                    {list &&
                        list.map((item, key) => {
                            return (
                                <MenuItem value={item} key={key}>
                                    <Link style={{ color: 'black', textDecoration: 'none' }} to={`/${item}`}>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </Link>
                                </MenuItem>
                            );
                        })}
                </Select>
            </FormControl>
            <div className="FMC__item">Popularity</div>
            <div className="FMC__item">Low - High</div>
            <div className="FMC__item">High - Low</div>
        </div>
    );
};

export default FilterMobile;
