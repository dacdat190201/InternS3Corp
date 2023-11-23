import React, { useContext, useEffect, useRef } from 'react';
import './Favorites.css';
import '../cart/Cart.css';
import '../../pages/about/aboutMain/About.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AuthContext from '../../services/auth/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../about/aboutMain/About.css';
import Error from '../404error/Error';
import BreadcurmbNavigation from '../../component/common/BreadcurmbNavigation';
import ButtonView from '../../component/common/ButtonView';
import MyFavoriteMobile from '../../component/Mobile/account/favorite/MyFavoriteMobile';
import { ShowError } from '../../utils/ToastAlert';
const Favorites = () => {
    const { token, favorites, cartItems, getCartTotal, removeFavorites, clearFavorites } = useContext(AuthContext);
    const navigate = useNavigate();
    const ref = useRef(false);
    useEffect(() => {
        if (ref.current) {
            if (!token.token) {
                navigate('/signin');
                ShowError('You need to log in to perform this function');
            }
        }
        return () => {
            ref.current = true;
        };
    }, [token.token, navigate]);

    if (favorites.length === 0) {
        return (
            <div>
                <Error props="My Favorites is empty" button="Go to Shopping" title="My Favorite" />
            </div>
        );
    }

    return (
        <>
            <div className="favorite__main-container">
                <BreadcurmbNavigation props="My Favorite" />
                <div className="favorite__main">
                    <div className="f__main-left">
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bolder' }}>
                                            <div className="titleTable">Product</div>
                                        </TableCell>

                                        <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                            <div className="titleTable">Detail</div>
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                            <div className="titleTable">Handle</div>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {favorites &&
                                        favorites.map((item, key) => (
                                            <TableRow
                                                key={key}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Link
                                                        to={`/products/${item.item.id}`}
                                                        style={{ color: 'black', textDecoration: 'none' }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '10px',
                                                            }}
                                                            className="cart_ImageTitle"
                                                        >
                                                            <div className="cart__img">
                                                                <img src={item.item.images[0]} alt="" />
                                                            </div>
                                                            <div className="titleItem500">{item.item.title}</div>
                                                        </div>
                                                    </Link>
                                                </TableCell>

                                                <TableCell style={{ textAlign: 'center' }} align="right">
                                                    <Link to={`/products/${item.item.id}`}>Detail</Link>
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'center' }} align="right">
                                                    <button
                                                        onClick={() => removeFavorites(item)}
                                                        style={{ backgroundColor: '#fff', border: 'none' }}
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className="cart__btn">
                            <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>
                                <ButtonView props="Return to shop" size="white" />
                            </Link>

                            <div onClick={() => clearFavorites()}>
                                <ButtonView props="Clear My Favorite" size="white" />
                            </div>
                        </div>
                    </div>
                    <div className="f__main-right">
                        <h2>My Cart</h2>
                        {cartItems.length !== 0 ? (
                            <>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bolder' }}>Product</TableCell>

                                                <TableCell style={{ fontWeight: 'bolder' }} align="right">
                                                    Quantity
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cartItems &&
                                                cartItems.map((item, key) => (
                                                    <TableRow
                                                        key={key}
                                                        sx={{
                                                            '&:last-child td, &:last-child th': { border: 0 },
                                                        }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '16px',
                                                                }}
                                                            >
                                                                <div className="cart__img">
                                                                    <img src={item.item.images[0]} alt="" />
                                                                </div>
                                                                <div className="title__favorite">{item.item.title}</div>
                                                            </div>
                                                        </TableCell>

                                                        <TableCell align="right">{item.quantity}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <div className="total__cost">
                                    <div className="text-center" style={{ padding: 16 }}>
                                        <h3>Total Cost</h3>
                                    </div>
                                    <div className="total__costNumber">$ {getCartTotal()}</div>
                                </div>
                            </>
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src="https://as2.ftcdn.net/v2/jpg/00/64/75/01/1000_F_64750133_MN8gDpyrnB48iuzFbS8VFWEPT3vQUzlg.jpg"
                                    width={250}
                                    height={250}
                                    alt="fa_cart"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <MyFavoriteMobile />
        </>
    );
};

export default Favorites;
