import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from "../pages/landing";
import { Register } from "../components/Register";
// import NavbarSimple from '../pages/AdminPannel';

import PromationCode from "../components/promationCode";

import Adminlogout from "../components/adminLogout";


import AddDetails from "../pages/AddMyDetails";

import ManageMembersPage from "../pages/ManageMembers";
import AdminLogin from "../pages/AdminLogin";
const AllRoutes = () => {
  const client = new QueryClient();//config query client

  return (

    <QueryClientProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Register" element={<Register />} />
          <Route path ="/AddDetails" element={<AddDetails/>}/>
          <Route path="/admin/login" element={<AdminLogin/>}/>
          <Route path="/admin/manageMember" element={<ManageMembersPage />} />

          <Route path ="admin/PromationCode" element={<PromationCode/>}/>

          <Route path="/admin/logout" element={<Adminlogout />} />


        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AllRoutes;
