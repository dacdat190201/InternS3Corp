import React from "react";
import TopBar from "../../component/Admin/topbarAdmin/TopBar";
import { Outlet } from "react-router-dom";
import SideBar from "../../component/Admin/sideBarAdmin/SideBar";
import "./AdminLayout.css";
const AdminLayout = () => {
  return (
    <div className="bg">
      {/* <Admin/> */}
      <TopBar />
      <div className="container-admin">
        <SideBar />
        <div className="orthers">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
