import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
const FilterLimit = ({ setLimit }) => {
    function valuetext(value) {
        return `${value}°C`;
    }
    const [val, setVal] = useState(12);
    const updateRange = (e, data) => {
        setVal(data);
        setLimit(val + 1);
    };

    return (
        <div className="filter__item">
            <div className="filter-title">Limit</div>

            <Box sx={{ width: 300 }}>
                <Slider
                    defaultValue={12}
                    getAriaValueText={valuetext}
                    onChange={updateRange}
                    step={1}
                    //valueLabelDisplay="auto"
                />
            </Box>
            <div className="filter__item-price">
                <div className="item-price-1">{val}</div>
            </div>
        </div>
    );
};

export default FilterLimit;
