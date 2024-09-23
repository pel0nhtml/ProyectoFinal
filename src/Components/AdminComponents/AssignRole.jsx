import React, { useEffect, useState } from "react";
import { getUsers } from "../../Services/Users/getUsers";
import { updateUserRole } from "../../Services/Users/updateUserRole";
import { deleteUser } from "../../Services/Users/deleteUsers"; // Importar el servicio de eliminación
import { FaTrash } from "react-icons/fa"; // Importar el icono de basurero
import "../../Styles/AssignRole.css";
import AdminSidebar from "./SidebarAdmin";

const AssignRole = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('user'); // Rol predeterminado es 'user'

  // Obtener usuarios cuando el componente se monta
  const fetchUsers = async () => {
    const usersList = await getUsers();
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Manejar el cambio en el selector de usuario
  const handleUserChange = (event) => {
    setSelectedUser(event.target.value); // Establecer el correo del usuario seleccionado
  };

  // Manejar el cambio en el selector de rol
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Establecer el rol seleccionado
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userToUpdate = users.find(user => user.email === selectedUser);
    
    if (!userToUpdate) {
      alert('Usuario no encontrado');
      return;
    }

    try {
      await updateUserRole(userToUpdate.id, selectedRole);
      alert('Rol actualizado exitosamente');

      // Actualizar la lista de usuarios después de la actualización
      await fetchUsers(); // Recargar la lista de usuarios
    } catch (error) {
      alert('Hubo un error al actualizar el rol');
    }
  };

  // Manejar la eliminación del usuario
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
    if (confirmDelete) {
      try {
        await deleteUser(id);
        alert('Usuario eliminado exitosamente');
        await fetchUsers(); // Recargar la lista de usuarios después de la eliminación
      } catch (error) {
        alert('Hubo un error al eliminar el usuario');
      }
    }
  };

  return (
    <div className="container">
      <AdminSidebar /> 
      <h2>Asignación de Roles</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userEmail">Seleccionar Usuario</label>
          <select id="userEmail" onChange={handleUserChange} required>
            <option value="">Seleccionar Usuario</option>
            {users.map(user => (
              <option key={user.id} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="role">Asignar Rol</label>
          <select id="role" onChange={handleRoleChange} required>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button type="submit" className="btn-assign">Actualizar Rol</button>
      </form>

      <div className="user-list">
        <h3>Lista de Usuarios</h3>
        <ul>
          {users.map(user => (
            <li key={user.id} className="user-item">
              <span><strong>Nombre:</strong> {user.username}</span>
              <span><strong>Email:</strong> {user.email}</span>
              <span><strong>Rol:</strong> {user.role}</span>
              <FaTrash 
                className="delete-icon" 
                onClick={() => handleDeleteUser(user.id)} 
                style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} 
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssignRole;
