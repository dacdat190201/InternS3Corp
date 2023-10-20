import React from 'react';

const FilterBrand = () => {
    return (
        <div className="filter__item">
            <div className="filter-title">Brand</div>
            <div className=" filter__item-rdo">
                <div className="filter-rdo">
                    <input type="checkbox" id="chk__adisdas" />
                    <div name="adidas">Adidas</div>
                </div>
                <div className="filter-number">(100)</div>
            </div>
            <div className=" filter__item-rdo">
                <div className="filter-rdo">
                    <input type="checkbox" id="chk__adisdas1" />
                    <div name="Nick">Nick</div>
                </div>
                <div className="filter-number">(100)</div>
            </div>
            <div className=" filter__item-rdo">
                <div className="filter-rdo">
                    <input type="checkbox" id="chk__adisda2s" />
                    <div name="Jack">Jacek & Co</div>
                </div>
                <div className="filter-number">(100)</div>
            </div>
            <div className=" filter__item-rdo">
                <div className="filter-rdo">
                    <input type="checkbox" id="chk__adisdas3" />
                    <div name="Shooed">My Shooed</div>
                </div>
                <div className="filter-number">(100)</div>
            </div>
            <div className=" filter__item-rdo">
                <div className="filter-rdo">
                    <input type="checkbox" id="chk__adisda5s" />
                    <div name="Flo">Florida Fox</div>
                </div>
                <div className="filter-number">(100)</div>
            </div>
        </div>
    );
};

export default FilterBrand;
