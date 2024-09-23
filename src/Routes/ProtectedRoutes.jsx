
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  // Obtener el rol del usuario desde localStorage o desde tu estado global
  const userRole = localStorage.getItem('userRole');
  const isLoggedIn = !!userRole;

  if (!isLoggedIn) {
    // Si el usuario no está autenticado, redirigir al login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Si el usuario no tiene el rol requerido, redirigir a una página de acceso denegado
    return <Navigate to="/" replace />;
  }

  // Si pasa las validaciones, renderizar el componente protegido
  return children;
};

export default ProtectedRoute;
