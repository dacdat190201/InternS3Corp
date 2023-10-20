import React, { useContext, useEffect } from 'react';
import './Favorites.css';
import '../cart/Cart.css';
import '../../pages/about/aboutMain/About.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AuthContext from '../../services/auth/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import FovaritesEmpty from './FovaritesEmpty';
import '../about/aboutMain/About.css';
const Favorites = () => {
    const { token, favorites, cartItems, getCartTotal, removeFavorites, clearFavorites } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token.token) {
            alert('You need to log in to perform this function');
            navigate('/signin');
        }
    }, [token.token, navigate]);

    if (favorites.length === 0) {
        return (
            <>
                <FovaritesEmpty />
            </>
        );
    }

    return (
        <div>
            <hr></hr>
            <div className="about__top">
                Home /<p> &nbsp; My Favorites</p>
            </div>
            <div className="favorite__main">
                <div className="f__main-left">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bolder' }}>Product</TableCell>

                                    <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                        Add
                                    </TableCell>
                                    <TableCell style={{ fontWeight: 'bolder', textAlign: 'center' }} align="right">
                                        Handle
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {favorites &&
                                    favorites.map((item, key) => (
                                        <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                    }}
                                                >
                                                    <img src={item.item.images[0]} alt="" width={54} height={54} />
                                                    {item.item.title}
                                                </div>
                                            </TableCell>

                                            <TableCell style={{ textAlign: 'center' }} align="right">
                                                <Link to={`/products/${item.item.id}`}>Detail</Link>
                                            </TableCell>
                                            <TableCell style={{ textAlign: 'center' }} align="right">
                                                <button onClick={() => removeFavorites(item)}>
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
                            <button>
                                <h3>Return to shop</h3>
                            </button>
                        </Link>

                        <button onClick={() => clearFavorites()}>
                            <h3>Clear My Favorite</h3>
                        </button>
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
                                                                gap: '10px',
                                                            }}
                                                        >
                                                            <img
                                                                src={item.item.images[0]}
                                                                alt=""
                                                                width={54}
                                                                height={54}
                                                            />
                                                            {item.item.title}
                                                        </div>
                                                    </TableCell>

                                                    <TableCell align="right">{item.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className="total__cost">
                                <h3>Total Cost</h3>
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
    );
};

export default Favorites;
