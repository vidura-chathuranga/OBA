import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing";
import { Register } from "../components/Register";
import NavbarSimple from '../pages/AdminPannel';

import AddDetails from "../pages/AddMyDetails";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path ="/Register" element={<Register/>}/>
        <Route path ="/AddDetails" element={<AddDetails/>}/>
        <Route path ="/admin/dashboard" element={<NavbarSimple/>}/>
        
      </Routes>
    </Router>
  );
};

export default AllRoutes;
