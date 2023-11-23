import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const FilterPrice = () => {
    function valuetext(value) {
        return `${value}°C`;
    }
    const [val, setVal] = useState([40, 60]);
    const updateRange = (e, data) => {
        setVal(data);
    };

    return (
        <div className="filter__item">
            <div className="filter-title BreadName">Price</div>

            <Box width={300}>
                <Slider
                    value={val}
                    onChange={updateRange}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    min={1}
                    max={1000}
                    step={10}
                />
            </Box>

            <div className="filter__item-price">
                <div className="item-price-1">${val[0]}</div>
                <div className="item-price-1">${val[1]}</div>
            </div>
        </div>
    );
};

export default FilterPrice;
