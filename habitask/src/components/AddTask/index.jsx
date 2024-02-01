import React, { useEffect } from "react";
import Menu from "../Menu/index";
import useUserStore from "../../store/store";

const AddTask = () => {
  const {
    nombreTarea,
    mensaje,
    setNombreTarea,
    crearTarea,
    obtenerUsuarios,
    usuarios,
    setNombreAsignado,
    nombreAsignado,
  } = useUserStore();

  useEffect(() => {
    const getList = async () => {
        await obtenerUsuarios();
    };

    getList();
  }, []);

  const handleSelectChange = (event) => {
    setNombreAsignado(event.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearTarea();
  };
  return (
    <div>
      <Menu />
      <h2>Agregar tareas</h2>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="flex-1">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Titulo de la tarea
          </label>
          <input
            value={nombreTarea}
            onChange={(e) => setNombreTarea(e.target.value)}
            type="text"
            placeholder="John Doe"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="flex-1 mt-6">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Usuario asignado
          </label>
          <select
            id="seleccion"
            name="seleccion"
            value={nombreAsignado}
            onChange={handleSelectChange}
          >
            <option value="">Selecciona una opción</option>
            {usuarios.map((item, index) => (
              <option key={index} value={item.id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </div>
        <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          Agregar Tarea
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default AddTask;
