// SidebarAdmin.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import AdminUserProfile from './AdminProfile';
import '../../Styles/SidebarStyle.css';

const AdminSidebar = ({ username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="sidebar-icon" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/adminlanding" onClick={toggleSidebar}>Dashboard</Link></li>
          <li><Link to="/productmanagement" onClick={toggleSidebar}>Gestión de Productos</Link></li>
          <li><Link to="/assignrole" onClick={toggleSidebar}>Asignación de Roles</Link></li>
          <li><Link to="/" onClick={toggleSidebar}>Volver a la página principal</Link></li>
        </ul>

        {/* Perfil de usuario */}
        <AdminUserProfile username={username} onLogout={onLogout} />
      </div>
    </>
  );
};

export default AdminSidebar;
