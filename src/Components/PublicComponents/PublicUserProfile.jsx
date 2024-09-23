// PublicUserProfile.jsx
import React from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../Styles/UserProfile.css';

const PublicUserProfile = ({ username, onLogout }) => {
  return (
    <div className="user-section">
      <div className="user-profile">
        <FaUserCircle size={30} />
        <span>{username}</span>
      </div>
      <ul>
        <li><Link to="/profile">Mi Perfil</Link></li>
        <li><Link to="/cart">Carrito</Link></li>
        <li><Link to="/orders">Pedidos</Link></li>
        <li onClick={onLogout}><FaSignOutAlt /> Cerrar Sesión</li>
      </ul>
    </div>
  );
};

export default PublicUserProfile;
