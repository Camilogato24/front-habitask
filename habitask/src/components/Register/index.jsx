// Ejemplo de Login.js
import React from "react";
import useUserStore from "../../store/store";
import Menulogout from "../MenuLogout/";
import "./register.css";


const Register = () => {
  const {
    nombre,
    email,
    contrasena,
    mensaje,
    setNombre,
    setEmail,
    setContrasena,
    registerUser,
  } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser();
  };

  return (
    <div>
      <Menulogout />
      <h2>Register</h2>
      <form className="form-register" onSubmit={handleSubmit}>
        <div className="flex-1">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Nombre
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="John Doe"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="flex-1 mt-6">
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

        <div className="flex-1 mt-6">
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

        <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          Registrar
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Register;
