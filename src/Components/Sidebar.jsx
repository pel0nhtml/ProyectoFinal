import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import AdminProfile from './AdminComponents/AdminProfile';
import PublicUserProfile from './PublicComponents/PublicUserProfile';
import '../Styles/SidebarStyle.css';

const Sidebar = ({ isLoggedIn, userRole, username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sidebar-icon" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-search">
          <input type="text" placeholder="Buscar..." className="search-input" />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>

        <ul>
          <li><Link to="/home" onClick={toggleSidebar}>Inicio</Link></li>
          <li><Link to="/aboutus" onClick={toggleSidebar}>Sobre Nosotros</Link></li>
          <li><Link to="/contact" onClick={toggleSidebar}>Contáctenos</Link></li>
          <li><Link to="/products" onClick={toggleSidebar}>Tienda</Link></li>
          <li><Link to="/services" onClick={toggleSidebar}>Servicios</Link></li>
          <li><Link to="/community" onClick={toggleSidebar}>Comunidad</Link></li>
          <li><Link to="/farmsandmore" onClick={toggleSidebar}>Fincas y más</Link></li>
          <li><Link to="/testimonials" onClick={toggleSidebar}>Testimonios</Link></li>
          <li><Link to="/blog" onClick={toggleSidebar}>Blog y Noticias</Link></li>
        </ul>

        {/* Mostrar el perfil del usuario según el rol */}
        {isLoggedIn ? (
          userRole === 'admin' ? (
            <AdminProfile username={username} onLogout={onLogout} />
          ) : (
            <PublicUserProfile username={username} onLogout={onLogout} />
          )
        ) : (
          <ul>
            <li className="sidebar-button">
              <Link to="/login" onClick={toggleSidebar}>Iniciar Sesión</Link>
            </li>
            <li className="sidebar-button">
              <Link to="/signup" onClick={toggleSidebar}>Registrarse</Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
