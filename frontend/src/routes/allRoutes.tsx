import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing";
import { Register } from "../components/Register";
import AdminDashboard from '../pages/AdminPannel'
import ManageMembers from "../pages/ManageMembers/index";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path ="/Register" element={<Register/>}/>
        <Route path ="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path = "/admin/manageMember" element={<ManageMembers/>}/>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
