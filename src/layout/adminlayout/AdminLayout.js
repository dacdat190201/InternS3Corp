import React from 'react';
import TopBar from '../../component/Admin/topbarAdmin/TopBar';
import { Outlet } from 'react-router-dom';
import SideBar from '../../component/Admin/sideBarAdmin/SideBar';
import Footer from '../../component/UI/footer/Footer';
import './AdminLayout.css';
import { ToastContainer } from 'react-toastify';
const AdminLayout = () => {
    return (
        <>
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
            <div className="container-md" style={{ maxWidth: 1170 }}>
                <TopBar />
                <div className="container-admin-grid">
                    <div className="sidebar__admin">
                        <SideBar />
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminLayout;
