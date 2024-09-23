import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Contact from '../Pages/Public/Contact';
import Products from '../Pages/Public/Products';
import Services from '../Pages/Public/Services';
import LandingPage from '../Pages/Public/LandingPage';
import FarmsAndMore from '../Pages/Public/FarmsAndMore';
import Testimonials from '../Pages/Public/Testimonials';
import AboutUs from '../Pages/Public/AboutUs';
import Community from '../Pages/Public/Community';
import Blog from '../Pages/Public/Blog';
import Login from '../Pages/Public/LogIn';
import SignUp from '../Pages/Public/SignUp';

import ProtectedRoute from '../Routes/ProtectedRoutes';
import AssignRolePage from '../Pages/Admin/AssignRolePage';
import ProductManagement from '../Components/AdminComponents/ProductManagement';
import AdminLanding from '../Pages/Admin/AdminLanding';

import Suplementos from '../Pages/Store/Suplementos';
import Insumos from '../Pages/Store/Insumos';
import Laboratorio from '../Pages/Store/Laboratorio';
import Geneticas from '../Pages/Store/Geneticas';
import Kits from '../Pages/Store/Kits';
import Layout from '../Components/Layout'; // Componente Layout que incluye el Sidebar

const Routing = () => {
  // Estado de autenticación y rol
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);

  // Cargar estado desde localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedUsername = localStorage.getItem('username');
    if (storedRole && storedUsername) {
      setUserRole(storedRole);
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  // Manejar inicio de sesión exitoso
  const handleLoginSuccess = (user) => {
    setUserRole(user.role);
    setUsername(user.username);
    setIsLoggedIn(true);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('username', user.username);
  };

  // Manejar cierre de sesión
  const handleLogout = () => {
    setUserRole(null);
    setUsername(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  };

  return (
    <Router>
      <Layout
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        username={username}
        onLogout={handleLogout}
      >
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />}>
            <Route path="suplementos" element={<Suplementos />} />
            <Route path="insumos" element={<Insumos />} />
            <Route path="laboratorio" element={<Laboratorio />} />
            <Route path="geneticas" element={<Geneticas />} />
            <Route path="kits" element={<Kits />} />
          </Route>
          <Route path="/services" element={<Services />} />
          <Route path="/farmsandmore" element={<FarmsAndMore />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog" element={<Blog />} />

          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Rutas protegidas para administrador */}
          <Route path="/productmanagement" element={<ProtectedRoute requiredRole="admin"><ProductManagement /></ProtectedRoute>} />
          <Route path="/assignrole" element={<ProtectedRoute requiredRole="admin"><AssignRolePage /></ProtectedRoute>} />
          <Route path="/adminlanding" element={<ProtectedRoute requiredRole="admin"><AdminLanding /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Routing;
