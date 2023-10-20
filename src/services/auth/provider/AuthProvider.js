import React, { useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import moment from 'moment';
// import jwt_decode from "jwt-decode";

const AuthProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(
        localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    );
    const [favorites, setFavorites] = useState(
        localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [],
    );
    const [inforUser, setinforUser] = useState(
        localStorage.getItem('infor') ? JSON.parse(localStorage.getItem('infor')) : [],
    );
    const [history, setHistory] = useState(
        localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : [],
    );
    const [token, setToken] = useState(
        localStorage.getItem('token')
            ? JSON.parse(localStorage.getItem('token'))
            : {
                  token: '',
                  username: '',
                  lastName: '',
                  image: '',
                  id: '',
                  gender: '',
                  firstName: '',
                  email: '',
              },
    );

    const addToCart = (payload) => {
        //#1 check id có tồn tài
        //#2 Nếu có thì quantity + 1, không thì add mới

        let index = cartItems.findIndex((item) => {
            return item.item.id === payload.item.id;
        });
        if (index !== -1) {
            cartItems[index].quantity += payload.quantity;
            setCartItems(cartItems.map((item) => ({ ...item })));
        } else {
            setCartItems([...cartItems, { ...payload }]);
        }
        alert('Successfully Added!');
    };
    const removeCart = (payload) => {
        const rm = cartItems.filter((item) => item.item.id !== payload);
        setCartItems(rm);
    };
    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.item.price * item.quantity, 0);
    };

    const getCartQuantify = () => {
        return cartItems.length;
    };
    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('favorites', JSON.stringify(favorites));
        localStorage.setItem('infor', JSON.stringify(inforUser));
        localStorage.setItem('history', JSON.stringify(history));
    }, [cartItems, favorites, inforUser, token, history]);

    //******************ADD MY FAVORITES******************** */
    const addFavorite = (payload) => {
        let index = favorites.findIndex((item) => {
            return item.item.id === payload.item.id;
        });
        if (index !== -1) {
            setFavorites(
                favorites.map((item) => {
                    return { ...item };
                }),
            );
        } else {
            setFavorites([...favorites, { ...payload }]);
        }

        alert('Successfully Added!');
    };
    const getLengthFavorites = () => {
        return favorites.length;
    };
    const removeFavorites = (payload) => {
        const rm = favorites.filter((item) => item.item.id !== payload.item.id);
        setFavorites(rm);
    };
    const clearFavorites = () => {
        setFavorites([]);
    };
    //*********************INFOR-USER***************** */
    const addInfor = (payload) => {
        // setinforUser({ ...inforUser, ...payload });
        let nextID = inforUser.length;
        setinforUser([{ ...payload, id: nextID + 1 }].concat(inforUser));
    };
    const clearInfor = () => {
        setinforUser([]);
    };
    const confirmInfor = (payload) => {
        const update = inforUser.find((item) => item.id === payload.id);
        setinforUser(
            inforUser.map((user) => {
                if (user.id === update.id) {
                    return {
                        ...user,
                        status: {
                            ...user.status,
                            name: 'awaiting',
                            message: [
                                ...user.status.message,
                                { title: 'Order pending approval', date: new Date() },
                            ].reverse(),
                            // message: ["Order pending approval"],
                        },
                    };
                } else {
                    return user;
                }
            }),
        );
    };
    const confirmMobile = (payload) => {
        setinforUser(
            inforUser.map((user) => {
                if (user.id === payload.id) {
                    return {
                        ...user,
                        status: {
                            ...user.status,
                            name: 'awaiting',
                            message: [
                                ...user.status.message,
                                { title: 'Order pending approval', date: new Date() },
                            ].reverse(),
                            // message: ["Order pending approval"],
                        },
                    };
                } else {
                    return user;
                }
            }),
        );
    };
    const canceledInfor = (payload, rdoText) => {
        const update = inforUser.find((item) => item.id === payload.id);
        setinforUser(
            inforUser.map((item) => {
                if (item.id === update.id)
                    return {
                        ...item,
                        status: {
                            ...item.status,
                            name: 'canceled',
                            message: [
                                ...item.status.message,
                                {
                                    title: rdoText,
                                    date: new Date(),
                                },
                            ].reverse(),
                        },
                    };
                return item;
            }),
        );
    };
    const confirmShipping = (payload) => {
        const update = inforUser.find((item) => item.id === payload.id);
        setinforUser(
            inforUser.map((user) => {
                if (user.id === update.id) {
                    return {
                        ...user,
                        status: {
                            name: 'shipping',
                            message: [{ title: 'Order is being delivered', date: new Date() }].concat(
                                user.status.message,
                            ),
                            // message: ["Order pending approval"],
                        },
                    };
                } else {
                    return user;
                }
            }),
        );
    };
    const completed = (payload) => {
        const update = inforUser.find((item) => item.id === payload.id);
        setinforUser(
            inforUser.map((user) => {
                if (user.id === update.id) {
                    return {
                        ...user,
                        status: {
                            name: 'completed',
                            message: [{ title: 'order has been completed', date: new Date() }].concat(
                                user.status.message,
                            ),
                            // message: ["Order pending approval"],
                        },
                    };
                } else {
                    return user;
                }
            }),
        );
    };
    const updateInfo = (payload, id) => {
        let index = inforUser.findIndex((item) => item.id === Number(id));
        const update = inforUser.find((item) => item.id === Number(id));
        inforUser[index].item.first_name = payload.first_name;
        inforUser[index].item.company_name = payload.company_name;
        inforUser[index].item.phone_number = payload.phone_number;
        inforUser[index].item.address = payload.address;
        inforUser[index].item.town_city = payload.town_city;
        setinforUser(inforUser.map((item) => ({ ...item })));
        setinforUser(
            inforUser.map((item) => {
                if (item.id === update.id) {
                    return {
                        ...item,
                        status: {
                            ...item.status,
                            ...item.status.name,
                            message: [
                                {
                                    title: payload.title,
                                    date: new Date(),
                                },
                            ].concat(item.status.message),
                        },
                    };
                } else {
                    return item;
                }
            }),
        );
    };
    const updateStatusInfo = (status, id) => {
        let index = inforUser.findIndex((item) => item.id === Number(id));
        const update = inforUser.find((item) => item.id === Number(id));
        inforUser[index].status.name = status;
        setinforUser(inforUser.map((item) => ({ ...item })));
        setinforUser(
            inforUser.map((item) => {
                if (item.id === update.id) {
                    return {
                        ...item,
                        status: {
                            ...item.status,
                            ...item.status.name,
                            message: [
                                {
                                    title: 'update new status',
                                    date: new Date(),
                                },
                            ].concat(item.status.message),
                        },
                    };
                } else {
                    return item;
                }
            }),
        );
    };
    const addressShipping = (payload, id) => {
        const update = inforUser.find((item) => item.id === Number(id));
        setinforUser(
            inforUser.map((user) => {
                if (user.id === update.id) {
                    return {
                        ...user,
                        status: {
                            ...user.status,
                            name: 'shipping',
                            message: [{ title: payload, date: new Date() }].concat(user.status.message),
                            // message: ["Order pending approval"],
                        },
                    };
                } else {
                    return user;
                }
            }),
        );
    };
    // **********************CONVERT DATE***************************
    const convertDate = (payload) => {
        return moment(payload).format('DD MMM, YYYY, h:mm A');
    };
    // *********************HISTORY****************************

    const addHistory = (payload) => {
        let nextID = history.length + 1;
        setHistory([...history, { ...payload, primary: false, nextID }].reverse());
    };
    const changeHistory = (payload) => {
        let newHistory = history.map((item) => {
            return {
                ...item,
                primary: item.nextID === payload.nextID,
            };
        });
        setHistory(newHistory);
    };
    //****************************************************** */

    const login = (payload) => {
        setToken({ ...token, ...payload });
        localStorage.setItem('token', JSON.stringify(payload));
    };

    const logout = (token) => {
        localStorage.removeItem('token', JSON.stringify(token));
        localStorage.removeItem('cartItems', JSON.stringify(cartItems));
        localStorage.removeItem('infor', JSON.stringify(inforUser));
        localStorage.removeItem('history', JSON.stringify(history));
        localStorage.removeItem('favorites', JSON.stringify(favorites));
        window.location.reload();
    };
    const role = () => {
        setToken({ ...token, role: 'admin' });
        alert('role admin ready');
    };
    const value = {
        login,
        logout,
        token,
        cartItems,
        addToCart,
        removeCart,
        getCartQuantify,
        clearCart,
        getCartTotal,
        favorites,
        addFavorite,
        removeFavorites,
        getLengthFavorites,
        clearFavorites,
        inforUser,
        addInfor,
        confirmInfor,
        canceledInfor,
        confirmShipping,
        clearInfor,
        updateInfo,
        addressShipping,
        completed,
        updateStatusInfo,
        role,
        history,
        addHistory,
        confirmMobile,
        changeHistory,
        convertDate,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
