import React, { useEffect } from "react";
import Menu from "../Menu/index";
import useUserStore from "../../store/store";
import Card from "../Card/index";
import "./listTasks.css";

const ListTasks = () => {
  const { tareas, obtenerTareas } = useUserStore();
  useEffect(() => {
    const getList = async () => {
      await obtenerTareas();
    };

    getList();
  }, []);

  let parsedTasks = [];
  try {
    parsedTasks = tareas && tareas.body ? JSON.parse(tareas.body) : [];
    console.log(parsedTasks, "vsdfsdz");
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  return (
    <div>
      <Menu />
      <h2>List tasks</h2>
      {parsedTasks.length > 0 && (
        <div className="card-list">
        {parsedTasks.map((item, key) => (
          <Card
            key={key}
            id={item.id}
            titulo={item.titulo}
            estado={item.estado}
            fechaCreacion={item.fecha_creacion}
            fechaCompletado={item.fecha_completado}
          />
        ))}
      </div>
      )}
    </div>
  );
};

export default ListTasks;
