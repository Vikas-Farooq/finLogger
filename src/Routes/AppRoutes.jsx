import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Transactions from "../Pages/Transaction";
import Category from "../Pages/Category";
import AuthForm from "../AuthForm/AuthForm";
import ProtectedRoute from "./ProtectedRoutes";
import ChangePasswordForm from "../AuthServices/ChangePassword";
import ResetPasswordForm from "../AuthServices/ResetPasswordForm";
import ContactForm from "../AuthForm/ContactUsForm";




const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AuthForm />} />

    <Route path="/home" element={
      <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  } />
  
    <Route path="/transactions" element={
      <ProtectedRoute>
      <Transactions />
    </ProtectedRoute>
    } />
    <Route path="/category" element={
      <ProtectedRoute>
      <Category />
    </ProtectedRoute>
    } />

    <Route path="change-password" element={
      <ProtectedRoute>
      <ChangePasswordForm />
    </ProtectedRoute>
    } />

     <Route path="contact-us-form" element={
      <ProtectedRoute>
      <ContactForm />
    </ProtectedRoute>
    } />


    <Route path="reset-password" element={
      
      <ResetPasswordForm />
    
    } />

  </Routes>
  
);
export default AppRoutes;
