import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Transactions from "../Pages/Transaction";
import Category from "../Pages/Category";
import AuthForm from "../AuthForm/AuthForm";
import ProtectedRoute from "./ProtectedRoutes";



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
  </Routes>
);
export default AppRoutes;
