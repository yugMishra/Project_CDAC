import React from "react";
import {Route, Routes, BrowserRouter as Router}  from 'react-router-dom'

import ForgetPassword from "./pages/ForgetPassword";
import LoginRegister from "./pages/LoginRegister"
import Home from "./pages/Home";
import Footer from "./components/Footer";
import SneakerPage from "./pages/SneakerPage";
import MyCart from "./pages/MyCart";
import MyOrders from "./pages/MyOrders";
import AdminPanel from "./pages/AdminPanel";
import VendorPanel from "./pages/VendorPanel";
import ProfilePage from "./pages/ProfilePage";
import {AboutUs} from "./components/AboutUs";
import {PrivacyPolicy} from "./components/PrivacyPolicy";
import {TermsAndConditions} from "./components/TermsAndConditions";
import {TermsOfService} from "./components/TermsOfService";
import {ContactUs} from "./components/ContactUs";

const App = ()=> {
  return (
    <React.Fragment>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login-register" element={<LoginRegister/>}/>
        <Route path="/reset-password" element={<ForgetPassword/>}/>
        <Route path="/sneaker/:id" element={<SneakerPage/>}/>
        <Route path="/my-cart" element={<MyCart/>}/>
        <Route path="/my-orders" element={<MyOrders/>}/>
        <Route path="/admin-panel" element={<AdminPanel/>}/>
        <Route path="/vendor-panel" element={<VendorPanel/>}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
        <Route path="/termsandcondition" element={<TermsAndConditions/>}/>
        <Route path="/termsofservice" element={<TermsOfService/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>


      </Routes>
    </Router>
    <Footer/>
    </React.Fragment>
  );
}

export default App;
