import { Navigate, Outlet } from "react-router-dom";

const RoleAccess = ({ roles = [] }) => {
  const user = JSON.parse(localStorage.getItem("token"));
  console.log(user);
  return !roles.length || roles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
export default RoleAccess;
