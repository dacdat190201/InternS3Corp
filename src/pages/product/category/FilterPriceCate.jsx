import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const FilterPriceCate = () => {
    function valuetext(value) {
        return `${value}°C`;
    }
    const [val, setVal] = useState([1, 40]);
    const updateRange = (e, data) => {
        setVal(data);
    };

    return (
        <div className="filter__item">
            <div className="filter-title">Price</div>

            <Box width={300}>
                <Slider value={val} onChange={updateRange} getAriaValueText={valuetext} valueLabelDisplay="auto" />
            </Box>

            <div className="filter__item-price">
                <div className="item-price-1">${val[0]}</div>
                <div className="item-price-1">${val[1]}</div>
            </div>
        </div>
    );
};

export default FilterPriceCate;
