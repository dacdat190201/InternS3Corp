import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import AuthContext from '../../../../services/auth/context/AuthContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BarBack from '../../../common/BarBack';
import '../viewcart/ViewCartMobile.css';
import ButtonView from '../../../../component/common/ButtonView';
const MyFavoriteMobile = () => {
    const { removeFavorites, favorites, token } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token.token) {
            navigate('/');
        }
    }, [token.token, navigate]);

    if (favorites.length === 0) {
        return (
            <div className="ProfileM__container">
                <div className="ViewCart__Top">
                    <Link style={{ color: 'black' }} to={'/profile'}>
                        <ArrowBackIosIcon />
                    </Link>
                    <SearchIcon />
                </div>
                <h2>My Favorite</h2>
                <div className="viewCart__ListItem">
                    <div style={{ marginBottom: 80 }}>
                        <div className="error__404">
                            <div className="error__container">
                                <img src={require('../../../../assets/slide/bags.png')} alt="shopping none" />
                            </div>
                            <div className="error-btn">
                                <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                                    <button>Go to Shopping</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="ProfileM__container">
            <div className="ViewCart__Top">
                <BarBack title="Favorite" link="home" />
            </div>

            <div className="viewCart__ListItem">
                {favorites.map((item, key) => {
                    return (
                        <div className="viewCart-Items" key={key}>
                            <Link to={`/products/${item.item.id}`} className="viewCart__Items-img">
                                <img src={item.item.thumbnail} alt={item.item.title} />
                            </Link>
                            <div className="viewCart__Items-content">
                                <div className="viewCart__Items-title">
                                    <div className="titleItem500 titlenameCheckM">{item.item.title}</div>
                                    <DeleteForeverIcon
                                        onClick={() => removeFavorites(item)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <div className="titleDescrip">Discount : {item.item.discountPercentage}%</div>
                                <div className="titleDescrip">quantity: {item.quantity}</div>
                                <div className="viewCart__Items-total PriceName">{item.item.price}$</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Link to="/products" className="VC__discount-btnCheckout">
                <ButtonView props="Return To Shop" size="mobile" />
            </Link>
        </div>
    );
};

export default MyFavoriteMobile;
