export const updateUserRole = async (userId, newRole) => {
  try {
    // Obtén los datos del usuario actual
    const userResponse = await fetch(`http://localhost:5000/Users/${userId}`);
    
    if (!userResponse.ok) {
      throw new Error('Error al obtener los datos del usuario');
    }
    
    const userData = await userResponse.json();

    // Actualiza solo el campo de rol, manteniendo el resto de los datos
    const response = await fetch(`http://localhost:5000/Users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userData,  // Mantiene todos los datos actuales del usuario
        role: newRole // Sobrescribe el campo "role"
      }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el rol');
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar el rol del usuario:', error);
  }
};
