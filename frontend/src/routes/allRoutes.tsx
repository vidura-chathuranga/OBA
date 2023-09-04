import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "../pages/landing";
import { Register } from "../components/Register";
import PromotionCodeManage from "../pages/PromotionCode";
import AddNewsAdmin from "../pages/AddNews";
import ContactUsPage from "../pages/ContactUsPage";
// import NavbarSimple from '../pages/AdminPannel';

import PromationCode from "../components/promationCode";

import Adminlogout from "../components/adminLogout";

import AddDetails from "../pages/AddMyDetails";

import ManageMembersPage from "../pages/ManageMembers";
import AdminLogin from "../pages/AdminLogin";
import AdminPrivateRoutes from "./adminPrivateRoutes";
import ManageAdvertisementPage from "../pages/manageAdvertisement";
import ManageRequestedMembersPage from "../pages/ManageRequstedMembers";
const AllRoutes = () => {
  const client = new QueryClient(); //config query client

  return (
    <QueryClientProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AddDetails" element={<AddDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/contactUs" element={<ContactUsPage />} />

          <Route path="/admin/" element={<AdminPrivateRoutes />}>
            <Route path="/admin/requstedMembers" element={<ManageRequestedMembersPage />} />
            <Route path="/admin/manageMember" element={<ManageMembersPage />} />
            <Route path="/admin/advertisement" element={<ManageAdvertisementPage />} />
            <Route path="/admin/PromotionCodeManage" element={<PromotionCodeManage />} />
            <Route path="/admin/AddNews" element={<AddNewsAdmin />} />





            <Route path="/admin/logout" element={<Adminlogout />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AllRoutes;
