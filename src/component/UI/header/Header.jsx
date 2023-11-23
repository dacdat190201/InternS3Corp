import React from 'react';
import TopHeader from './Tophead/TopHeader';
import MidHead from './MidHead/MidHead';
import NavbarMobile from '../../Mobile/NavbarMobile/NavbarMobile';

function Header() {
    return (
        <div>
            <TopHeader />
            <MidHead />
            <>
                <NavbarMobile />
            </>
            <hr style={{ opacity: 0.3, margin: 0 }}></hr>
        </div>
    );
}

export default Header;
