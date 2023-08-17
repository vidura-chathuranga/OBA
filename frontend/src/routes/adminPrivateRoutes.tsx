import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoutes = () =>{

    const admin = JSON.parse(localStorage.getItem("admin") || '{}');

    return admin.email ? <Outlet/> : <Navigate to={'/admin/login'}/>;
}

export default AdminPrivateRoutes;