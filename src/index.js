import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './layout/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLayout from './layout/userlayout/UserLayout';
import Test2 from './Test2';
import { CircularProgress } from '@mui/material';
const AuthProvider = React.lazy(() => import('./services/auth/provider/AuthProvider'));
const ProductMain = React.lazy(() => import('./pages/product/listProduct/ProductMain/ProductMain'));
const CartEmpty = React.lazy(() => import('./pages/cart/cartEmpty/CartEmpty'));
const SearchPage = React.lazy(() => import('./pages/search/SearchPage'));
const CartLogin = React.lazy(() => import('./pages/cart/cartEmpty/CartLogin'));
const ListDiscount = React.lazy(() => import('./pages/home/discount/ListDiscount'));
const MyAccount = React.lazy(() => import('./pages/user/myaccount/MyAccount'));
const CheckoutMain = React.lazy(() => import('./pages/user/checkout/CheckoutMain'));
const Favorites = React.lazy(() => import('./pages/favorites/Favorites'));
const MainProfile = React.lazy(() => import('./pages/user/MainProfile/MainProfile'));
const Confirm = React.lazy(() => import('./pages/user/checkout/confirm/Confirm'));
const OrderHistory = React.lazy(() => import('./pages/user/history/OrderHistory'));
const OrderDetail = React.lazy(() => import('./pages/user/orderDetail/OrderDetail'));
const AdminLayout = React.lazy(() => import('./layout/adminlayout/AdminLayout'));
const HomeAdmin = React.lazy(() => import('./pagesadmin/home/home/HomeAdmin'));
const OrdersMain = React.lazy(() => import('./pagesadmin/orders/main/OrdersMain'));
const DetailOrders = React.lazy(() => import('./pagesadmin/detailOrders/DetailOrders'));
const RoleAccess = React.lazy(() => import('./services/route/RoleAccess'));
const ProfileMobile = React.lazy(() => import('./component/Mobile/account/profileMobile/ProfileMobile'));
const ViewCartMobile = React.lazy(() => import('./component/Mobile/account/viewcart/ViewCartMobile'));
const CheckOutMobile = React.lazy(() => import('./component/Mobile/account/checkout/CheckOutMobile'));
const AddingAddress = React.lazy(() => import('./component/Mobile/account/PageHandleSave/AddingAddress/AddingAddress'));
const ShippingSave = React.lazy(() => import('./component/Mobile/account/PageHandleSave/ShippingSave/ShippingSave'));
const MyOrder = React.lazy(() => import('./component/Mobile/account/myorders/MyOrder'));
const DetailMobile = React.lazy(() => import('./component/Mobile/account/myorders/OrderDetailMobile/DetailMobile'));
const PaymentMethod = React.lazy(() => import('./component/Mobile/account/PageHandleSave/PaymentMethod/PaymentMethod'));
const HistoryShipping = React.lazy(() =>
    import('./component/Mobile/account/myorders/OrderDetailMobile/HistoryShipping/HistoryShipping'),
);
const Home = React.lazy(() => import('./pages/home/HomeMain/Home'));
const ProductDetail = lazy(() => import('./pages/product/productDetail/ProductDetail'));
const SignUp = React.lazy(() => import('./pages/signup/signUp/SignUp'));
const SignIn = React.lazy(() => import('./pages/signup/signIn/SignIn'));
const About = React.lazy(() => import('./pages/about/aboutMain/About'));
const Contact = React.lazy(() => import('./pages/contact/ContactMain/Contact'));
const Error = React.lazy(() => import('./pages/404error/Error'));
const Cart = React.lazy(() => import('./pages/cart/Cart'));
const Test = React.lazy(() => import('./Test'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Suspense fallback={<CircularProgress />}>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route index element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/404" element={<Error />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/cart404" element={<CartEmpty />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/discounts" element={<ListDiscount />} />
                            <Route path="/isLogin" element={<CartLogin />} />
                            <Route path="/:category" element={<ProductMain />} />
                            <Route
                                path="/products/:id"
                                element={
                                    <Suspense fallback={<CircularProgress />}>
                                        <ProductDetail />
                                    </Suspense>
                                }
                            />
                            <Route path="/test" element={<Test />} />
                            <Route path="/test2" element={<Test2 />} />
                            {/* ************************MOBILE USER******************************** */}
                            <Route path="/profile" element={<ProfileMobile />} />
                            <Route path="/viewcart" element={<ViewCartMobile />} />
                            <Route path="/viewcart/checkout" element={<CheckOutMobile />} />
                            <Route path="/myorder" element={<MyOrder />} />
                            <Route path="/Address" element={<AddingAddress />} />
                            <Route path="/payment+method" element={<PaymentMethod />} />
                            <Route path="/shippingsave" element={<ShippingSave />} />
                            <Route path="/myorder/detail/:id" element={<DetailMobile />} />
                            <Route path="/myorder/detail/:id/shipping" element={<HistoryShipping />} />
                            {/* ************************MOBILE USER******************************** */}
                        </Route>
                        <Route path="/">
                            <Route path="/myaccount" element={<UserLayout />}>
                                <Route index element={<MainProfile />} />
                                <Route path="/myaccount/:username/checkout" element={<CheckoutMain />} />
                                <Route path="/myaccount/:username/checkout/confirm" element={<Confirm />} />
                                <Route path="/myaccount/:username/checkout/confirm" element={<Confirm />} />
                                <Route path="/myaccount/profile/:username" element={<MyAccount />} />
                                <Route path="/myaccount/:username/history" element={<OrderHistory />} />
                                <Route path="/myaccount/user/order/:id" element={<OrderDetail />} />
                            </Route>
                        </Route>
                        {/* ************************************ */}
                        <Route path="/" element={<RoleAccess roles={['admin']} />}>
                            <Route path="/admin" element={<AdminLayout />}>
                                {/* <Route element={<RoleAccess roles={['user', 'admin']} />}>
                                    <Route path="/test" element={<Test />} />
                                </Route> */}

                                <Route path="/admin" index element={<HomeAdmin />} />
                                <Route path="/admin/orders" element={<OrdersMain />} />
                                <Route path="/admin/orders/:id" element={<DetailOrders />} />
                            </Route>
                        </Route>
                    </Routes>
                </Suspense>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
