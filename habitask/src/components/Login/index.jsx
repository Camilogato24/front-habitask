// Ejemplo de Login.js
import React from "react";
import useUserStore from "../../store/store";
import Menulogout from "../MenuLogout/";
import "./login.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from 'sonner'
 
const Login = () => {
  const {
    resetForm,
    email,
    contrasena,
    mensaje,
    setEmail,
    setContrasena,
    loginUser,
  } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();
    toast(mensaje)
    console.log(mensaje);
    resetForm();
  };

  // Lógica de inicio de sesión
  return (
    <div className="container">
      <Menulogout />
      <div className="login">
        <div className="form-content">
          <div className="left-content">
            <h2>Login</h2>
            <p>Por favor ingresa, para crear tus tareas en Habitask.</p>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="item-form">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="johndoe@ejemplo.com"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="item-form">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Contraseña
              </label>
              <input
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                type="password"
                placeholder="Contraseña"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <button className="submit-btn">Login</button>
          </form>
        </div>
        <Toaster />
        {mensaje && <p>{mensaje}</p>}
      </div>
    </div>
  );
};

export default Login;
