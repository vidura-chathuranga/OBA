import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing";
import { Register } from "../components/Register";
import NavbarSimple from '../pages/AdminPannel'

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path ="/Register" element={<Register/>}/>
        <Route path ="/admin/dashboard" element={<NavbarSimple/>}/>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
