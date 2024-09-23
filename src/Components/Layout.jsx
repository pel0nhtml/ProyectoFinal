import React from 'react';
import Sidebar from '../Components/Sidebar';
import AdminSidebar from '../Components/AdminComponents/SidebarAdmin';

const Layout = ({ children, isLoggedIn, userRole, username, onLogout }) => {
  return (
    <>
      {/* Renderizar el sidebar adecuado según el rol del usuario */}
      {isLoggedIn && userRole === 'admin' ? (
        <AdminSidebar username={username} onLogout={onLogout} />
      ) : (
        <Sidebar
          isLoggedIn={isLoggedIn}
          userRole={userRole}
          username={username}
          onLogout={onLogout}
        />
      )}

      {/* Contenido de la página */}
      <div>{children}</div>
    </>
  );
};

export default Layout;