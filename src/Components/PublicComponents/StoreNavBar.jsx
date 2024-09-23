import React from 'react';
import '../../Styles/Store/StoreNavBar.css'; // Archivo CSS externo para estilos
import { Link } from 'react-router-dom';




const StoreNavBar = () => {


  return (


    <nav className="store-navbar">
      <ul className="navbar-menu">
        <li><Link to="/products/suplementos">Suplementos</Link></li>
        <li><Link to="/products/insumos">Insumos de Cultivo</Link></li>
        <li><Link to="/products/laboratorio">Laboratorio</Link></li>
        <li><Link to="/products/geneticas">Genéticas</Link></li>
        <li><Link to="/products/kits">Kits de Cultivo</Link></li>
      </ul>
    </nav>

  );
    
};

export default StoreNavBar;
