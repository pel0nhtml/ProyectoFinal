// AdminProfile.jsx
import React from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../Styles/UserProfile.css';

const AdminProfile = ({ username, onLogout }) => {
  return (
    <div className="user-section">
      <div className="user-profile">
        <FaUserCircle size={30} />
        <span>{username}</span>
      </div>
      <ul>
        <li><Link to="/profile">Mi Perfil</Link></li>
        <li><Link to = "/AdminLanding ">Dashboard </Link></li>
        <li onClick={onLogout}><FaSignOutAlt /> Cerrar Sesión</li>
      </ul>
    </div>
  );
};

export default AdminProfile;
