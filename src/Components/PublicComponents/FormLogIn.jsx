import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from '../../Services/Users/getUsers';
import "../../Styles/LogIn.css";

const FormLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const cargaUsuario = (event) => setEmail(event.target.value);
  const cargaContra = (event) => setPassword(event.target.value);

  const cargar = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('El correo electrónico y la contraseña no pueden estar vacíos');
      return;
    }

    try {
      const users = await getUsers();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        // Solo almacenar el rol del usuario en localStorage
        localStorage.setItem('userRole', user.role);

        // También llama a onLoginSuccess para pasar el usuario completo
        onLoginSuccess(user); 

        // Redirigir según el rol del usuario
        if (user.role === 'admin') {
          navigate('/adminlanding'); // Redirigir a la página del admin
        } else if (user.role === 'user') {
          navigate('/'); // Redirigir a la página de inicio público
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setError('Hubo un problema al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={cargar}>
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={cargaUsuario}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={cargaContra}
            required
          />
        </div>
        <button type="submit" className="login-button">Ingresar</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default FormLogin;
