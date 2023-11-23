import React from 'react';
import Header from '../../component/UI/header/Header';
import Footer from '../../component/UI/footer/Footer';
import { Outlet } from 'react-router-dom';
import './UserLayout.css';
import { ToastContainer } from 'react-toastify';
function UserLayout() {
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <Header />
            <div className="container-md" style={{ maxWidth: '1170px', minHeight: '85vh' }}>
                <div className="row">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserLayout;
