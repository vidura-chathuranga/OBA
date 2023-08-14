import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing";
import { Register } from "../components/Register";
import ManageMembersPage from "../pages/ManageMembers";
const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path ="/Register" element={<Register/>}/>
        <Route path = "/admin/manageMember" element={<ManageMembersPage/>}/>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
