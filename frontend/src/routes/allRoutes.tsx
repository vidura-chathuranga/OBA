import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing";
import { Register } from "../components/Register";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path ="/Register" element={<Register/>}/>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
