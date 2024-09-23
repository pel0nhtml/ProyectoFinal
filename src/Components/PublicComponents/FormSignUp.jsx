import React, { useEffect, useState } from 'react';
import '../../Styles/SignUp.css';
import { Link } from 'react-router-dom';
import { getUsers } from '../../Services/Users/getUsers';  // Asegúrate de que esto esté correctamente exportado
import { postUsers } from '../../Services/Users/postUsers';  // Asegúrate de que esté correctamente exportado



const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  // Añadido para manejar la contraseña
  const [role, setRole]= useState ('user');// Añadido para definir el rol del usuario

  const [users, setUsers] = useState([]);

  // Función para cargar los usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  const cargaUsuario = (event) => {
    setUsername (event.target.value);
  };

  const cargaEmail = (event) => {
    setEmail(event.target.value);
  };

  const cargaContra = (event) => {
    setPassword(event.target.value);
  };

  const cargar = async (event) => {
    event.preventDefault();

    // Define caracteres permitidos
    const allowedChars = /^[a-zA-Z0-9!@#$%^&*()_+]*$/;

    // Validaciones
    if (!username.trim() || !password.trim() || !email.trim()) {
      alert('Nombre de usuario, correo y contraseña no pueden estar vacíos');
      return;
    }

    if (!allowedChars.test(username) || !allowedChars.test(password)) {
      alert('El nombre de usuario o la contraseña contienen caracteres no permitidos');
      return;
    }

    // Verificar si el usuario ya existe
    const userExists = users.some((user) => user.username === username || user.email === email);
    if (userExists) {
      alert('El usuario o correo ya están registrados');
      return;
    }

    // Intentar registrar el nuevo usuario
    try {
      const newUser = await postUsers(username, email, password, role );  // Correcto uso de postUsers
      if (newUser) {
        alert('Usuario creado exitosamente');
       // window.location.href = '/LogIn';  // Redirección a la página de inicio de sesión
      } else {
        alert('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Error al crear el usuario');
    }
  };

  return (
    <div className="signup-container">
      <h1>Regístrate</h1>
      <form onSubmit={cargar}> {/* Envolver los inputs en un formulario */}
        <input
          type="text"
          placeholder="Nombre de usuario"
          onChange={cargaUsuario}
          value={username}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          onChange={cargaEmail}
          value={email}
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={cargaContra}
          value={password}
        />
        <button type="submit" className="submit-btn">Crear cuenta</button>
      </form>

      <p className="register-text">
        ¿Ya tienes cuenta? <Link to="/LogIn">Iniciar Sesión</Link>
      </p>
    </div>
  );
};

export default SignUpForm;
