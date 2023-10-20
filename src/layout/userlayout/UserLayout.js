import React from "react";
import Header from "../../component/UI/header/Header";
import Footer from "../../component/UI/footer/Footer";
import { Outlet } from "react-router-dom";
import "./UserLayout.css";
import Sidebar from "../../component/UI/myaccount/sidebar/Sidebar";
function UserLayout() {
  return (
    <div>
      <Header />
      <hr></hr>
      <div className="my__container">
        <div className="home">
          <Sidebar />
          <div className="homeContainer">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
